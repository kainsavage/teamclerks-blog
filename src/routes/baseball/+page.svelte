<script lang="ts">
	// Roster state with local storage persistence
	let roster = $state<string[]>([]);

	// Batting order state
	let battingOrder = $state<string[]>([]);

	// Defensive positions
	const positions = [
		'Pitcher',
		'Catcher',
		'1st Base',
		'2nd Base',
		'3rd Base',
		'Shortstop',
		'Left Field',
		'Center Field',
		'Right Field'
	];

	// Generated defensive lineups state
	let generatedLineups = $state<Record<string, string[]>>({});

	// Player position capabilities state
	let playerCapabilities = $state<Record<string, string[]>>({});

	// Active tab
	let activeTab = $state('roster');

	// New player input
	let newPlayerName = $state('');

	// Editing state
	let editingPlayer = $state<string | null>(null);
	let editingName = $state('');

	// Functions for roster management
	function addPlayer() {
		if (newPlayerName.trim() && !roster.includes(newPlayerName.trim())) {
			roster = [...roster, newPlayerName.trim()];
			newPlayerName = '';
			saveRosterToStorage();
		}
	}

	function removePlayer(player: string) {
		roster = roster.filter((p) => p !== player);
		// Also remove from batting order and capabilities if they exist
		battingOrder = battingOrder.filter((p) => p !== player);
		const newCapabilities = { ...playerCapabilities };
		delete newCapabilities[player];
		playerCapabilities = newCapabilities;
		saveRosterToStorage();
		saveCapabilitiesToStorage();
	}

	function startEditing(player: string) {
		editingPlayer = player;
		editingName = player;
	}

	function saveEdit() {
		if (editingPlayer && editingName.trim() && !roster.includes(editingName.trim())) {
			const oldName = editingPlayer;
			roster = roster.map((p) => (p === oldName ? editingName.trim() : p));

			// Update batting order
			battingOrder = battingOrder.map((p) => (p === oldName ? editingName.trim() : p));

			// Update capabilities
			const newCapabilities = { ...playerCapabilities };
			if (newCapabilities[oldName]) {
				newCapabilities[editingName.trim()] = newCapabilities[oldName];
				delete newCapabilities[oldName];
			}
			playerCapabilities = newCapabilities;

			editingPlayer = null;
			editingName = '';
			saveRosterToStorage();
			saveCapabilitiesToStorage();
		}
	}

	function cancelEdit() {
		editingPlayer = null;
		editingName = '';
	}

	function saveRosterToStorage() {
		if (typeof window !== 'undefined') {
			localStorage.setItem('baseball-roster', JSON.stringify(roster));
		}
	}

	function saveCapabilitiesToStorage() {
		if (typeof window !== 'undefined') {
			localStorage.setItem('baseball-capabilities', JSON.stringify(playerCapabilities));
		}
	}

	function loadRosterFromStorage() {
		if (typeof window !== 'undefined') {
			const stored = localStorage.getItem('baseball-roster');
			if (stored) {
				try {
					const parsedRoster = JSON.parse(stored);
					roster = parsedRoster;
				} catch (e) {
					console.error('Error loading roster from storage:', e);
				}
			} else {
				// Start with empty roster if no stored roster
				roster = [];
			}
		}
	}

	function loadCapabilitiesFromStorage() {
		if (typeof window !== 'undefined') {
			const stored = localStorage.getItem('baseball-capabilities');
			if (stored) {
				try {
					const parsedCapabilities = JSON.parse(stored);
					playerCapabilities = parsedCapabilities;
				} catch (e) {
					console.error('Error loading capabilities from storage:', e);
				}
			}
		}
	}

	// Functions for batting order
	function removeFromBattingOrder(player: string) {
		battingOrder = battingOrder.filter((p) => p !== player);
	}

	function randomizeBattingOrder() {
		// Create a shuffled copy of the roster
		const shuffled = [...roster].sort(() => Math.random() - 0.5);
		battingOrder = shuffled;
	}

	// Helper functions for league rules
	function getInfieldPositions(): string[] {
		return ['Pitcher', 'Catcher', '1st Base', '2nd Base', '3rd Base', 'Shortstop'];
	}

	function isInfieldPosition(position: string): boolean {
		return getInfieldPositions().includes(position);
	}

	function canPlayerPlayPositionInInning(
		player: string,
		position: string,
		playerStats: Record<
			string,
			{ positionCounts: Record<string, number>; infieldInnings: number; benchInnings: number }
		>
	): boolean {
		// Check if player can play this position
		if (!canPlayerPlayPosition(player, position)) {
			return false;
		}

		// Rule 1: Each player is limited to three (3) innings per position
		if (playerStats[player].positionCounts[position] >= 3) {
			return false;
		}

		// Rule 4: Any player who has played catcher for 4+ innings cannot pitch
		if (position === 'Pitcher' && playerStats[player].positionCounts['Catcher'] >= 4) {
			return false;
		}

		// Rule 5: Any pitcher who pitched 2+ innings may not then play catcher
		if (position === 'Catcher' && playerStats[player].positionCounts['Pitcher'] >= 2) {
			return false;
		}

		return true;
	}

	function calculatePlayerStats(
		lineups: Record<string, string[]>
	): Record<
		string,
		{ positionCounts: Record<string, number>; infieldInnings: number; benchInnings: number }
	> {
		const stats: Record<
			string,
			{ positionCounts: Record<string, number>; infieldInnings: number; benchInnings: number }
		> = {};

		// Initialize stats for all players
		roster.forEach((player) => {
			stats[player] = {
				positionCounts: {},
				infieldInnings: 0,
				benchInnings: 0
			};
			positions.forEach((position) => {
				stats[player].positionCounts[position] = 0;
			});
		});

		// Count innings for each player
		for (let inning = 0; inning < 6; inning++) {
			const playersOnField: string[] = [];

			// Count field positions
			positions.forEach((position) => {
				const player = lineups[position]?.[inning];
				if (player) {
					stats[player].positionCounts[position]++;
					playersOnField.push(player);
					if (isInfieldPosition(position)) {
						stats[player].infieldInnings++;
					}
				}
			});

			// Count bench innings
			roster.forEach((player) => {
				if (!playersOnField.includes(player)) {
					stats[player].benchInnings++;
				}
			});
		}

		return stats;
	}

	function validateLineup(lineups: Record<string, string[]>): {
		isValid: boolean;
		errors: string[];
	} {
		const errors: string[] = [];
		const stats = calculatePlayerStats(lineups);

		// Rule 2: Each player must play a minimum of two (2) innings in the infield
		roster.forEach((player) => {
			if (stats[player].infieldInnings < 2) {
				errors.push(
					`${player} only played ${stats[player].infieldInnings} infield innings (minimum 2 required)`
				);
			}
		});

		// Rule 3: Players must not exceed 1 inning more on the bench than their teammates
		const benchInnings = roster.map((player) => stats[player].benchInnings);
		const maxBench = Math.max(...benchInnings);
		const minBench = Math.min(...benchInnings);
		if (maxBench - minBench > 1) {
			errors.push(
				`Bench time difference too large: max ${maxBench}, min ${minBench} (max difference allowed: 1)`
			);
		}

		return { isValid: errors.length === 0, errors };
	}

	// Functions for generating defensive lineups
	function generateDefensiveLineups() {
		const maxAttempts = 1000;
		let attempts = 0;
		let bestLineups: Record<string, string[]> = {};
		let bestScore = -1;

		while (attempts < maxAttempts) {
			attempts++;

			// Step 1: Determine who sits each inning (fair bench time distribution)
			const sittingAssignment = generateFairSittingAssignment();
			if (!sittingAssignment) {
				continue; // Try again if we can't create fair sitting assignment
			}

			// Step 2: Generate lineups with predetermined sitting players
			const lineups = generateLineupsWithSittingAssignment(sittingAssignment);
			if (!lineups) {
				continue; // Try again if we can't create valid lineups
			}

			// Step 3: Validate the complete lineup
			const validation = validateLineup(lineups);
			if (validation.isValid) {
				// Perfect lineup found
				generatedLineups = lineups;
				saveLineupsToStorage();
				return;
			} else {
				// Calculate score for this lineup (fewer errors = better score)
				const score = -validation.errors.length;
				if (score > bestScore) {
					bestScore = score;
					bestLineups = JSON.parse(JSON.stringify(lineups));
				}
			}
		}

		// If no perfect lineup found, use the best one we found
		if (Object.keys(bestLineups).length > 0) {
			generatedLineups = bestLineups;
			saveLineupsToStorage();
		} else {
			// Fallback to original simple generation if all attempts failed
			generateSimpleLineups();
			saveLineupsToStorage();
		}
	}

	function generateFairSittingAssignment(): Record<number, string[]> | null {
		const sittingPerInning = roster.length - 9;
		const sittingAssignment: Record<number, string[]> = {};

		// Initialize sitting assignment for each inning
		for (let inning = 0; inning < 6; inning++) {
			sittingAssignment[inning] = [];
		}

		// Track how many times each player sits
		const sittingCounts: Record<string, number> = {};
		roster.forEach((player) => {
			sittingCounts[player] = 0;
		});

		// Calculate target sitting time
		const totalSittingSlots = sittingPerInning * 6;
		const targetSittingPerPlayer = Math.floor(totalSittingSlots / roster.length);
		const maxSittingPerPlayer = targetSittingPerPlayer + 1; // Allow 1 extra sitting

		// Distribute sitting time fairly
		for (let inning = 0; inning < 6; inning++) {
			// Prioritize players who need to sit more to reach target
			const playersByPriority = [...roster].sort((a, b) => {
				const aCount = sittingCounts[a];
				const bCount = sittingCounts[b];

				// First priority: players who haven't reached target yet
				if (aCount < targetSittingPerPlayer && bCount >= targetSittingPerPlayer) return -1;
				if (aCount >= targetSittingPerPlayer && bCount < targetSittingPerPlayer) return 1;

				// Second priority: among players at same level, prefer those with fewer sittings
				return aCount - bCount;
			});

			// Filter to only players who can still sit (haven't exceeded max)
			const eligibleToSit = playersByPriority.filter(
				(player) => sittingCounts[player] < maxSittingPerPlayer
			);

			// If we don't have enough eligible players, this assignment won't work
			if (eligibleToSit.length < sittingPerInning) {
				return null;
			}

			// Select who sits this inning, prioritizing fairness
			const sittingThisInning: string[] = [];

			// First, try to fill with players who need to reach target
			const needToReachTarget = eligibleToSit.filter(
				(player) => sittingCounts[player] < targetSittingPerPlayer
			);

			// Add as many as we can from those who need to reach target
			const fromTarget = Math.min(needToReachTarget.length, sittingPerInning);
			for (let i = 0; i < fromTarget; i++) {
				sittingThisInning.push(needToReachTarget[i]);
			}

			// Fill remaining slots with other eligible players
			const remaining = sittingPerInning - sittingThisInning.length;
			if (remaining > 0) {
				const otherEligible = eligibleToSit.filter((player) => !sittingThisInning.includes(player));
				for (let i = 0; i < remaining && i < otherEligible.length; i++) {
					sittingThisInning.push(otherEligible[i]);
				}
			}

			sittingAssignment[inning] = sittingThisInning;

			// Update sitting counts
			sittingThisInning.forEach((player) => {
				sittingCounts[player]++;
			});
		}

		// Validate that bench time is fair (max 1 inning difference)
		const sittingCountsArray = Object.values(sittingCounts);
		const maxSitting = Math.max(...sittingCountsArray);
		const minSitting = Math.min(...sittingCountsArray);

		if (maxSitting - minSitting > 1) {
			return null; // Not fair enough
		}

		return sittingAssignment;
	}

	function generateLineupsWithSittingAssignment(
		sittingAssignment: Record<number, string[]>
	): Record<string, string[]> | null {
		const lineups: Record<string, string[]> = {};
		const playerStats: Record<
			string,
			{ positionCounts: Record<string, number>; infieldInnings: number; benchInnings: number }
		> = {};

		// Initialize each position with empty array for 6 innings
		positions.forEach((position) => {
			lineups[position] = [];
		});

		// Initialize player stats
		roster.forEach((player) => {
			playerStats[player] = {
				positionCounts: {},
				infieldInnings: 0,
				benchInnings: 0
			};
			positions.forEach((position) => {
				playerStats[player].positionCounts[position] = 0;
			});
		});

		// Generate 6 lineups
		for (let inning = 0; inning < 6; inning++) {
			// Get players who are NOT sitting this inning
			const sittingThisInning = sittingAssignment[inning];
			const availablePlayers = roster.filter((player) => !sittingThisInning.includes(player));

			// Assign each position
			for (const position of positions) {
				// Find players who can play this position and respect league rules
				const eligiblePlayers = availablePlayers.filter((player) =>
					canPlayerPlayPositionInInning(player, position, playerStats)
				);

				if (eligiblePlayers.length > 0) {
					// Randomly select a player
					const randomIndex = Math.floor(Math.random() * eligiblePlayers.length);
					const selectedPlayer = eligiblePlayers[randomIndex];

					// Add to lineup
					lineups[position].push(selectedPlayer);

					// Update stats
					playerStats[selectedPlayer].positionCounts[position]++;
					if (isInfieldPosition(position)) {
						playerStats[selectedPlayer].infieldInnings++;
					}

					// Remove from available players for this inning
					const playerIndex = availablePlayers.indexOf(selectedPlayer);
					availablePlayers.splice(playerIndex, 1);
				} else {
					// No eligible players, this lineup generation failed
					return null;
				}
			}

			// Update bench innings for sitting players
			sittingThisInning.forEach((player) => {
				playerStats[player].benchInnings++;
			});
		}

		// Add sitting players to lineups
		for (let inning = 0; inning < 6; inning++) {
			const sittingThisInning = sittingAssignment[inning];
			sittingThisInning.forEach((sittingPlayer, index) => {
				const sittingKey = `Sitting ${index + 1}`;
				if (!lineups[sittingKey]) {
					lineups[sittingKey] = [];
				}
				lineups[sittingKey].push(sittingPlayer);
			});

			// Fill any remaining sitting slots with empty strings
			const sittingSlots = roster.length - 9;
			for (let i = sittingThisInning.length; i < sittingSlots; i++) {
				const sittingKey = `Sitting ${i + 1}`;
				if (!lineups[sittingKey]) {
					lineups[sittingKey] = [];
				}
				lineups[sittingKey].push('');
			}
		}

		return lineups;
	}

	function generateSimpleLineups() {
		const lineups: Record<string, string[]> = {};

		// Initialize each position with empty array for 6 innings
		positions.forEach((position) => {
			lineups[position] = [];
		});

		// Generate 6 lineups (original simple logic)
		for (let inning = 0; inning < 6; inning++) {
			const availablePlayers = [...roster];

			// Assign each position
			positions.forEach((position) => {
				const eligiblePlayers = availablePlayers.filter((player) =>
					canPlayerPlayPosition(player, position)
				);

				if (eligiblePlayers.length > 0) {
					const randomIndex = Math.floor(Math.random() * eligiblePlayers.length);
					const selectedPlayer = eligiblePlayers[randomIndex];
					lineups[position].push(selectedPlayer);
					const playerIndex = availablePlayers.indexOf(selectedPlayer);
					availablePlayers.splice(playerIndex, 1);
				} else {
					lineups[position].push('');
				}
			});

			// Add sitting players as individual rows
			availablePlayers.forEach((sittingPlayer, index) => {
				const sittingKey = `Sitting ${index + 1}`;
				if (!lineups[sittingKey]) {
					lineups[sittingKey] = [];
				}
				lineups[sittingKey].push(sittingPlayer);
			});

			// Fill any remaining sitting slots with empty strings
			const sittingSlots = roster.length - 9;
			for (let i = availablePlayers.length; i < sittingSlots; i++) {
				const sittingKey = `Sitting ${i + 1}`;
				if (!lineups[sittingKey]) {
					lineups[sittingKey] = [];
				}
				lineups[sittingKey].push('');
			}
		}

		generatedLineups = lineups;
	}

	function clearGeneratedLineups() {
		generatedLineups = {};
		saveLineupsToStorage();
	}

	function saveLineupsToStorage() {
		if (typeof window !== 'undefined') {
			localStorage.setItem('baseball-lineups', JSON.stringify(generatedLineups));
		}
	}

	// Functions for player capabilities
	function togglePlayerCapability(player: string, position: string) {
		const newCapabilities = { ...playerCapabilities };
		if (!newCapabilities[player]) {
			newCapabilities[player] = [];
		}

		const currentCapabilities = newCapabilities[player];
		if (currentCapabilities.includes(position)) {
			// Remove capability
			newCapabilities[player] = currentCapabilities.filter((p) => p !== position);
		} else {
			// Add capability
			newCapabilities[player] = [...currentCapabilities, position];
		}

		playerCapabilities = newCapabilities;
		saveCapabilitiesToStorage();
	}

	function canPlayerPlayPosition(player: string, position: string): boolean {
		return playerCapabilities[player]?.includes(position) || false;
	}

	function allPlayersHaveCapabilities(): boolean {
		return roster.every(
			(player) => playerCapabilities[player] && playerCapabilities[player].length > 0
		);
	}

	// Hash parameter handling
	function updateHashFromTab(tab: string) {
		if (typeof window !== 'undefined') {
			window.location.hash = tab;
		}
	}

	function getTabFromHash(): string {
		if (typeof window !== 'undefined') {
			const hash = window.location.hash.slice(1); // Remove the #
			const validTabs = ['roster', 'batting', 'defensive'];
			return validTabs.includes(hash) ? hash : 'roster';
		}
		return 'roster';
	}

	function handleHashChange() {
		activeTab = getTabFromHash();
	}

	// Initialize on load
	loadRosterFromStorage();
	loadCapabilitiesFromStorage();

	// Set initial tab from hash
	activeTab = getTabFromHash();

	// Listen for hash changes
	$effect(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('hashchange', handleHashChange);
			return () => {
				window.removeEventListener('hashchange', handleHashChange);
			};
		}
	});

	// Initialize batting order when roster is loaded
	$effect(() => {
		if (roster.length > 0) {
			randomizeBattingOrder();
		}
	});
</script>

<div class="container mx-auto max-w-6xl p-6">
	<h1 class="mb-8 text-center text-3xl font-bold text-[var(--color-text)] print:hidden">
		Baseball Coaching Tool
	</h1>

	<!-- Tab Navigation -->
	<div class="mb-6 flex border-b border-[var(--color-tan-300)] print:hidden">
		<button
			class="border-b-2 px-6 py-3 text-lg font-medium transition-colors {activeTab === 'roster'
				? 'border-[var(--color-primary)] text-[var(--color-primary)]'
				: 'border-transparent text-[var(--color-tan-500)] hover:text-[var(--color-tan-700)]'}"
			onclick={() => updateHashFromTab('roster')}
		>
			Roster
		</button>
		<button
			class="border-b-2 px-6 py-3 text-lg font-medium transition-colors {activeTab === 'batting'
				? 'border-[var(--color-primary)] text-[var(--color-primary)]'
				: 'border-transparent text-[var(--color-tan-500)] hover:text-[var(--color-tan-700)]'}"
			onclick={() => updateHashFromTab('batting')}
		>
			Batting Order
		</button>
		<button
			class="border-b-2 px-6 py-3 text-lg font-medium transition-colors {activeTab === 'defensive'
				? 'border-[var(--color-primary)] text-[var(--color-primary)]'
				: 'border-transparent text-[var(--color-tan-500)] hover:text-[var(--color-tan-700)]'}"
			onclick={() => updateHashFromTab('defensive')}
		>
			Defensive Positioning
		</button>
	</div>

	<!-- Print-Only Content (Always Available) -->
	<!-- Print-Friendly Batting Order Box Score -->
	<div class="batting-box-score hidden print:block">
		<h2>Batting Order & Box Score</h2>
		{#if battingOrder.length > 0}
			<table>
				<thead>
					<tr>
						<th class="player-name">Player</th>
						<th class="at-bat">1st</th>
						<th class="at-bat">2nd</th>
						<th class="at-bat">3rd</th>
						<th class="at-bat">4th</th>
						<th class="at-bat">5th</th>
						<th class="at-bat">6th</th>
					</tr>
				</thead>
				<tbody>
					{#each battingOrder as player, index (player)}
						<tr>
							<td class="player-name">{index + 1}. {player}</td>
							<td class="at-bat">
								<div class="baseball-diamond"></div>
								<div class="count-checkboxes">
									<div class="count-row">
										<input type="checkbox" class="count-checkbox" />
										<input type="checkbox" class="count-checkbox" />
									</div>
									<div class="count-row">
										<input type="checkbox" class="count-checkbox" />
										<input type="checkbox" class="count-checkbox" />
										<input type="checkbox" class="count-checkbox" />
									</div>
								</div>
							</td>
							<td class="at-bat">
								<div class="baseball-diamond"></div>
								<div class="count-checkboxes">
									<div class="count-row">
										<input type="checkbox" class="count-checkbox" />
										<input type="checkbox" class="count-checkbox" />
									</div>
									<div class="count-row">
										<input type="checkbox" class="count-checkbox" />
										<input type="checkbox" class="count-checkbox" />
										<input type="checkbox" class="count-checkbox" />
									</div>
								</div>
							</td>
							<td class="at-bat">
								<div class="baseball-diamond"></div>
								<div class="count-checkboxes">
									<div class="count-row">
										<input type="checkbox" class="count-checkbox" />
										<input type="checkbox" class="count-checkbox" />
									</div>
									<div class="count-row">
										<input type="checkbox" class="count-checkbox" />
										<input type="checkbox" class="count-checkbox" />
										<input type="checkbox" class="count-checkbox" />
									</div>
								</div>
							</td>
							<td class="at-bat">
								<div class="baseball-diamond"></div>
								<div class="count-checkboxes">
									<div class="count-row">
										<input type="checkbox" class="count-checkbox" />
										<input type="checkbox" class="count-checkbox" />
									</div>
									<div class="count-row">
										<input type="checkbox" class="count-checkbox" />
										<input type="checkbox" class="count-checkbox" />
										<input type="checkbox" class="count-checkbox" />
									</div>
								</div>
							</td>
							<td class="at-bat">
								<div class="baseball-diamond"></div>
								<div class="count-checkboxes">
									<div class="count-row">
										<input type="checkbox" class="count-checkbox" />
										<input type="checkbox" class="count-checkbox" />
									</div>
									<div class="count-row">
										<input type="checkbox" class="count-checkbox" />
										<input type="checkbox" class="count-checkbox" />
										<input type="checkbox" class="count-checkbox" />
									</div>
								</div>
							</td>
							<td class="at-bat">
								<div class="baseball-diamond"></div>
								<div class="count-checkboxes">
									<div class="count-row">
										<input type="checkbox" class="count-checkbox" />
										<input type="checkbox" class="count-checkbox" />
									</div>
									<div class="count-row">
										<input type="checkbox" class="count-checkbox" />
										<input type="checkbox" class="count-checkbox" />
										<input type="checkbox" class="count-checkbox" />
									</div>
								</div>
							</td>
						</tr>
					{/each}
					<!-- Runs Row -->
					<tr>
						<td class="player-name">Runs</td>
						<td class="at-bat">
							<div class="baseball-diamond"></div>
							<div class="count-checkboxes">
								<div class="count-row">
									<input type="checkbox" class="count-checkbox" />
									<input type="checkbox" class="count-checkbox" />
								</div>
								<div class="count-row">
									<input type="checkbox" class="count-checkbox" />
									<input type="checkbox" class="count-checkbox" />
									<input type="checkbox" class="count-checkbox" />
								</div>
							</div>
						</td>
						<td class="at-bat">
							<div class="baseball-diamond"></div>
							<div class="count-checkboxes">
								<div class="count-row">
									<input type="checkbox" class="count-checkbox" />
									<input type="checkbox" class="count-checkbox" />
								</div>
								<div class="count-row">
									<input type="checkbox" class="count-checkbox" />
									<input type="checkbox" class="count-checkbox" />
									<input type="checkbox" class="count-checkbox" />
								</div>
							</div>
						</td>
						<td class="at-bat">
							<div class="baseball-diamond"></div>
							<div class="count-checkboxes">
								<div class="count-row">
									<input type="checkbox" class="count-checkbox" />
									<input type="checkbox" class="count-checkbox" />
								</div>
								<div class="count-row">
									<input type="checkbox" class="count-checkbox" />
									<input type="checkbox" class="count-checkbox" />
									<input type="checkbox" class="count-checkbox" />
								</div>
							</div>
						</td>
						<td class="at-bat">
							<div class="baseball-diamond"></div>
							<div class="count-checkboxes">
								<div class="count-row">
									<input type="checkbox" class="count-checkbox" />
									<input type="checkbox" class="count-checkbox" />
								</div>
								<div class="count-row">
									<input type="checkbox" class="count-checkbox" />
									<input type="checkbox" class="count-checkbox" />
									<input type="checkbox" class="count-checkbox" />
								</div>
							</div>
						</td>
						<td class="at-bat">
							<div class="baseball-diamond"></div>
							<div class="count-checkboxes">
								<div class="count-row">
									<input type="checkbox" class="count-checkbox" />
									<input type="checkbox" class="count-checkbox" />
								</div>
								<div class="count-row">
									<input type="checkbox" class="count-checkbox" />
									<input type="checkbox" class="count-checkbox" />
									<input type="checkbox" class="count-checkbox" />
								</div>
							</div>
						</td>
						<td class="at-bat">
							<div class="baseball-diamond"></div>
							<div class="count-checkboxes">
								<div class="count-row">
									<input type="checkbox" class="count-checkbox" />
									<input type="checkbox" class="count-checkbox" />
								</div>
								<div class="count-row">
									<input type="checkbox" class="count-checkbox" />
									<input type="checkbox" class="count-checkbox" />
									<input type="checkbox" class="count-checkbox" />
								</div>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		{:else}
			<p class="text-[var(--color-tan-500)] italic">No players in batting order yet</p>
		{/if}
	</div>

	<!-- Print-Friendly Defensive Lineup -->
	{#if Object.keys(generatedLineups).length > 0}
		<div class="defensive-lineup-print hidden print:block">
			<h2>Defensive Lineup</h2>
			<table>
				<thead>
					<tr>
						<th class="position">Position</th>
						{#each Array.from({ length: 6 }, (_, inning) => inning) as inning (inning)}
							<th class="inning">Inning {inning + 1}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each positions as position (position)}
						<tr>
							<td class="position">{position}</td>
							{#each generatedLineups[position] || [] as player, inning (inning)}
								<td class="inning">
									{#if player}
										{player}
									{:else}
										-
									{/if}
								</td>
							{/each}
						</tr>
					{/each}
					<!-- Sitting Players Rows -->
					{#each Array.from({ length: roster.length - 9 }, (_, index) => index) as index (index)}
						{@const sittingKey = `Sitting ${index + 1}`}
						<tr class="sitting-row">
							<td class="position">Sitting {index + 1}</td>
							{#each generatedLineups[sittingKey] || [] as sittingPlayer, inning (inning)}
								<td class="inning">
									{#if sittingPlayer}
										{sittingPlayer}
									{:else}
										-
									{/if}
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}

	<!-- Landscape Defensive Lineup (Print Only) -->
	{#if Object.keys(generatedLineups).length > 0}
		<div class="defensive-lineup-landscape hidden print:block">
			<h2>Defensive Lineup</h2>
			<table>
				<thead>
					<tr>
						<th class="position">Position</th>
						{#each Array.from({ length: 6 }, (_, inning) => inning) as inning (inning)}
							<th class="inning">Inning {inning + 1}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each positions as position (position)}
						<tr>
							<td class="position">{position}</td>
							{#each generatedLineups[position] || [] as player, inning (inning)}
								<td class="inning">
									{#if player}
										{player}
									{:else}
										-
									{/if}
								</td>
							{/each}
						</tr>
					{/each}
					<!-- Sitting Players Rows -->
					{#each Array.from({ length: roster.length - 9 }, (_, index) => index) as index (index)}
						{@const sittingKey = `Sitting ${index + 1}`}
						<tr class="sitting-row">
							<td class="position">Sitting {index + 1}</td>
							{#each generatedLineups[sittingKey] || [] as sittingPlayer, inning (inning)}
								<td class="inning">
									{#if sittingPlayer}
										{sittingPlayer}
									{:else}
										-
									{/if}
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}

	<!-- Roster Tab -->
	{#if activeTab === 'roster'}
		<div class="space-y-6 print:hidden">
			<div class="flex items-center justify-between">
				<h2 class="text-2xl font-semibold text-[var(--color-text)]">Team Roster</h2>
				<p class="text-sm text-[var(--color-tan-500)]">
					{roster.length} player{roster.length !== 1 ? 's' : ''}
				</p>
			</div>

			<!-- Add New Player -->
			<div class="rounded-lg bg-[var(--color-tan-100)] p-4">
				<h3 class="mb-3 text-lg font-medium text-[var(--color-tan-700)]">Add New Player</h3>
				<div class="flex gap-2">
					<input
						type="text"
						bind:value={newPlayerName}
						placeholder="Enter player name"
						class="flex-1 rounded border border-[var(--color-tan-300)] bg-[var(--color-tan-50)] p-2 text-[var(--color-text)] focus:border-[var(--color-primary)] focus:outline-none"
						onkeydown={(e) => e.key === 'Enter' && addPlayer()}
					/>
					<button
						class="rounded bg-[var(--color-primary)] px-4 py-2 text-white transition-colors hover:bg-[var(--color-primary-dark)]"
						onclick={addPlayer}
						disabled={!newPlayerName.trim()}
					>
						Add Player
					</button>
				</div>
			</div>

			<!-- Current Roster -->
			<div class="rounded-lg bg-[var(--color-tan-100)] p-4">
				<h3 class="mb-3 text-lg font-medium text-[var(--color-tan-700)]">
					Current Roster ({roster.length})
				</h3>
				{#if roster.length === 0}
					<p class="text-[var(--color-tan-500)] italic">
						No players added yet. Add your first player above!
					</p>
				{:else}
					<div class="space-y-2">
						{#each roster as player (player)}
							<div
								class="flex items-center justify-between rounded border bg-[var(--color-tan-50)] p-3"
							>
								{#if editingPlayer === player}
									<input
										type="text"
										bind:value={editingName}
										class="flex-1 rounded border border-[var(--color-tan-300)] bg-white p-1 text-[var(--color-text)] focus:border-[var(--color-primary)] focus:outline-none"
										onkeydown={(e) => {
											if (e.key === 'Enter') saveEdit();
											if (e.key === 'Escape') cancelEdit();
										}}
									/>
								{:else}
									<span class="font-medium text-[var(--color-text)]">{player}</span>
								{/if}
								<div class="flex gap-2">
									{#if editingPlayer === player}
										<button
											class="rounded bg-green-600 px-3 py-1 text-sm text-white transition-colors hover:bg-green-700"
											onclick={saveEdit}
										>
											Save
										</button>
										<button
											class="rounded bg-gray-500 px-3 py-1 text-sm text-white transition-colors hover:bg-gray-600"
											onclick={cancelEdit}
										>
											Cancel
										</button>
									{:else}
										<button
											class="rounded bg-[var(--color-primary)] px-3 py-1 text-sm text-white transition-colors hover:bg-[var(--color-primary-dark)]"
											onclick={() => startEditing(player)}
										>
											Edit
										</button>
										<button
											class="rounded bg-red-600 px-3 py-1 text-sm text-white transition-colors hover:bg-red-700"
											onclick={() => removePlayer(player)}
										>
											Remove
										</button>
									{/if}
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Instructions -->
			<div class="instructions rounded-lg bg-[var(--color-tan-100)] p-4">
				<h3 class="mb-3 text-lg font-medium text-[var(--color-tan-700)]">Instructions</h3>
				<ul class="space-y-2 text-sm text-[var(--color-tan-600)]">
					<li>• Add players by entering their name and clicking "Add Player"</li>
					<li>• Click "Edit" to rename a player</li>
					<li>• Click "Remove" to delete a player from the roster</li>
					<li>• Your roster is automatically saved to your browser's local storage</li>
					<li>
						• Once you have players, use the other tabs to manage batting order and defensive
						positioning
					</li>
				</ul>
			</div>
		</div>
	{/if}

	<!-- Batting Order Tab -->
	{#if activeTab === 'batting'}
		<div class="space-y-6 print:hidden">
			<div class="flex items-center justify-between">
				<h2 class="text-2xl font-semibold text-[var(--color-text)]">Batting Order</h2>
				<button
					class="rounded bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
					onclick={randomizeBattingOrder}
				>
					Randomize
				</button>
			</div>

			<!-- Current Batting Order (Screen View) -->
			<div class="rounded-lg bg-[var(--color-tan-100)] p-4 print:hidden">
				<h3 class="mb-3 text-lg font-medium text-[var(--color-tan-700)]">Current Batting Order</h3>
				{#if battingOrder.length === 0}
					<p class="text-[var(--color-tan-500)] italic">No players in batting order yet</p>
				{:else}
					<div class="space-y-2">
						{#each battingOrder as player, index (player)}
							<div
								class="flex items-center justify-between rounded border bg-[var(--color-tan-50)] p-3"
							>
								<span class="font-medium">{index + 1}. {player}</span>
								<button
									class="text-sm text-red-600 hover:text-red-700"
									onclick={() => removeFromBattingOrder(player)}
								>
									Remove
								</button>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	{/if}

	<!-- Defensive Positioning Tab -->
	{#if activeTab === 'defensive'}
		<div class="space-y-6 print:hidden">
			<div class="flex items-center justify-between">
				<h2 class="text-2xl font-semibold text-[var(--color-text)]">Defensive Positioning</h2>
				{#if Object.keys(generatedLineups).length > 0}
					<button
						class="rounded bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
						onclick={clearGeneratedLineups}
					>
						Clear Lineups
					</button>
				{/if}
			</div>

			<!-- Player Position Capabilities -->
			<div class="player-capabilities rounded-lg bg-[var(--color-tan-100)] p-4">
				<div class="mb-4 flex items-center justify-between">
					<h3 class="text-lg font-medium text-[var(--color-tan-700)]">
						Player Position Capabilities
					</h3>
					{#if allPlayersHaveCapabilities()}
						<button
							class="rounded bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
							onclick={generateDefensiveLineups}
						>
							Generate Lineups
						</button>
					{:else}
						<p class="text-sm text-[var(--color-tan-500)]">
							Assign at least one position to each player to generate lineups
						</p>
					{/if}
				</div>
				<p class="mb-4 text-sm text-[var(--color-tan-500)]">
					Click to toggle which positions each player can play. Once all players have at least one
					position, you can generate 6 random defensive lineups.
				</p>
				<div class="overflow-x-auto">
					<table class="w-full border-collapse">
						<thead>
							<tr class="border-b border-[var(--color-tan-300)]">
								<th class="p-2 text-left text-sm font-medium text-[var(--color-tan-700)]">Player</th
								>
								{#each positions as position (position)}
									<th class="p-2 text-center text-sm font-medium text-[var(--color-tan-700)]"
										>{position}</th
									>
								{/each}
							</tr>
						</thead>
						<tbody>
							{#each roster as player (player)}
								<tr class="border-b border-[var(--color-tan-200)]">
									<td class="p-2 font-medium text-[var(--color-text)]">{player}</td>
									{#each positions as position (position)}
										<td class="p-2 text-center">
											<button
												class="h-8 w-8 rounded border-2 transition-colors {canPlayerPlayPosition(
													player,
													position
												)
													? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white'
													: 'border-[var(--color-tan-400)] bg-transparent text-[var(--color-tan-400)] hover:border-[var(--color-primary)]'}"
												onclick={() => togglePlayerCapability(player, position)}
											>
												{canPlayerPlayPosition(player, position) ? '✓' : '✗'}
											</button>
										</td>
									{/each}
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>

			<!-- Generated Lineups Results (Screen View) -->
			{#if Object.keys(generatedLineups).length > 0}
				<div class="rounded-lg bg-[var(--color-tan-100)] p-4 print:hidden">
					<h3 class="mb-3 text-lg font-medium text-[var(--color-tan-700)]">
						Generated Defensive Lineups
					</h3>
					<p class="mb-4 text-sm text-[var(--color-tan-500)]">
						Each position shows the player assigned for each of the 6 innings. The "Sitting" rows
						show which {roster.length - 9} players are not on the field for each inning.
						<br /><br />
						<strong>League Rules Applied:</strong>
						• Max 3 innings per position per player • Min 2 infield innings per player (Pitcher, Catcher,
						1st-3rd Base, Shortstop) • Max 1 inning difference in bench time between players • 4+ innings
						catching = no pitching eligibility • 2+ innings pitching = no catching eligibility
					</p>

					<!-- League Rules Validation -->
					<div class="validation-message">
						{#if !validateLineup(generatedLineups).isValid}
							{@const validation = validateLineup(generatedLineups)}
							<div class="mb-4 rounded-lg border border-red-200 bg-red-50 p-3">
								<h4 class="mb-2 text-sm font-medium text-red-800">⚠️ League Rules Violations</h4>
								<ul class="space-y-1 text-sm text-red-700">
									{#each validation.errors as error (error)}
										<li>• {error}</li>
									{/each}
								</ul>
								<p class="mt-2 text-xs text-red-600">
									Try generating again or adjust player position capabilities to resolve these
									issues.
								</p>
							</div>
						{:else}
							<div class="mb-4 rounded-lg border border-green-200 bg-green-50 p-3">
								<h4 class="mb-2 text-sm font-medium text-green-800">
									✅ All League Rules Satisfied
								</h4>
								<p class="text-sm text-green-700">
									This lineup complies with all league rules including position limits, infield
									requirements, and bench time fairness.
								</p>
							</div>
						{/if}
					</div>
					<div class="overflow-x-auto">
						<table class="w-full border-collapse">
							<thead>
								<tr class="border-b border-[var(--color-tan-300)]">
									<th class="p-2 text-left text-sm font-medium text-[var(--color-tan-700)]"
										>Position</th
									>
									{#each Array(6) as _, inning (inning)}
										<th class="p-2 text-center text-sm font-medium text-[var(--color-tan-700)] {_}">
											Inning {inning + 1}
										</th>
									{/each}
								</tr>
							</thead>
							<tbody>
								{#each positions as position (position)}
									<tr class="border-b border-[var(--color-tan-200)]">
										<td class="p-2 font-medium text-[var(--color-text)]">{position}</td>
										{#each generatedLineups[position] || [] as player, inning (inning)}
											<td class="p-2 text-center text-sm">
												{#if player}
													<span class="rounded bg-[var(--color-primary)] px-2 py-1 text-white">
														{player}
													</span>
												{:else}
													<span class="text-[var(--color-tan-500)] italic">-</span>
												{/if}
											</td>
										{/each}
									</tr>
								{/each}
								<!-- Sitting Players Rows -->
								{#each Array.from({ length: roster.length - 9 }, (_, index) => index) as index (index)}
									{@const sittingKey = `Sitting ${index + 1}`}
									<tr class="border-b border-[var(--color-tan-200)] bg-[var(--color-tan-50)]">
										<td class="p-2 font-medium text-[var(--color-text)]">Sitting {index + 1}</td>
										{#each generatedLineups[sittingKey] || [] as sittingPlayer, inning (inning)}
											<td class="p-2 text-center text-sm">
												{#if sittingPlayer}
													<span class="rounded bg-[var(--color-tan-600)] px-2 py-1 text-white">
														{sittingPlayer}
													</span>
												{:else}
													<span class="text-[var(--color-tan-500)] italic">-</span>
												{/if}
											</td>
										{/each}
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	/* Print Styles */
	@media print {
		/* Reset colors for print */
		* {
			color: black !important;
			background: white !important;
			border-color: black !important;
		}

		/* Page setup */
		:global(body) {
			font-family: Arial, sans-serif;
			font-size: 12pt;
			line-height: 1.2;
		}

		.container {
			max-width: none !important;
			padding: 0 !important;
			margin: 0 !important;
		}

		/* Batting Order Box Score */
		.batting-box-score {
			page-break-inside: avoid;
			margin-bottom: 20pt;
		}

		.batting-box-score h2 {
			font-size: 16pt;
			font-weight: bold;
			margin-bottom: 10pt;
			text-align: center;
		}

		.batting-box-score table {
			width: 100%;
			border-collapse: collapse;
			font-size: 10pt;
		}

		.batting-box-score th {
			border: 1pt solid black;
			padding: 4pt;
			text-align: center;
			font-weight: bold;
			background: #f0f0f0 !important;
		}

		.batting-box-score td {
			border: 1pt solid black;
			padding: 4pt;
			text-align: center;
		}

		.batting-box-score .player-name {
			text-align: left;
			font-weight: bold;
			width: 20%;
		}

		.batting-box-score .at-bat {
			width: 13.33%;
			position: relative;
		}

		/* Count checkboxes for balls/strikes */
		.count-checkboxes {
			position: absolute;
			bottom: 1pt;
			right: 1pt;
			display: flex;
			flex-direction: column;
			gap: 2pt;
			align-items: flex-end;
		}

		.count-row {
			display: flex;
			gap: 2pt;
			justify-content: flex-end;
		}

		.count-checkbox {
			width: 8pt;
			height: 8pt;
			min-width: 8pt;
			min-height: 8pt;
			max-width: 8pt;
			max-height: 8pt;
			margin: 0;
			padding: 0;
			border: 1pt solid black;
			background: white;
			accent-color: black;
			appearance: none;
			-webkit-appearance: none;
			-moz-appearance: none;
			box-sizing: border-box;
		}

		.count-checkbox:checked {
			background: black;
		}

		/* Baseball diamond for each at-bat */
		.baseball-diamond {
			width: 20pt;
			height: 20pt;
			margin: 0 auto;
			position: relative;
		}

		.baseball-diamond::before {
			content: '';
			position: absolute;
			top: 50%;
			left: 50%;
			width: 16pt;
			height: 16pt;
			transform: translate(-50%, -50%) rotate(45deg);
			border: 1pt dotted #666;
			background: transparent;
		}

		/* Defensive Lineup Table */
		.defensive-lineup-print {
			page-break-inside: avoid;
		}

		.defensive-lineup-print h2 {
			font-size: 16pt;
			font-weight: bold;
			margin-bottom: 10pt;
			text-align: center;
		}

		.defensive-lineup-print table {
			width: 100%;
			border-collapse: collapse;
			font-size: 9pt;
		}

		.defensive-lineup-print th {
			border: 1pt solid black;
			padding: 3pt;
			text-align: center;
			font-weight: bold;
			background: #f0f0f0 !important;
		}

		.defensive-lineup-print td {
			border: 1pt solid black;
			padding: 3pt;
			text-align: center;
		}

		.defensive-lineup-print .position {
			text-align: left;
			font-weight: bold;
			width: 15%;
		}

		.defensive-lineup-print .inning {
			width: 14.16%;
		}

		.defensive-lineup-print .sitting-row {
			background: #f8f8f8 !important;
			font-style: italic;
		}

		/* Defensive Lineup Landscape Page */
		.defensive-lineup-landscape {
			page-break-before: always;
		}

		@page {
			size: landscape;
			margin: 0.5in;
		}

		/* Hide the defensive lineup in the main print view */
		.defensive-lineup-print {
			display: none !important;
		}

		/* Show the landscape version */
		.defensive-lineup-landscape {
			display: block !important;
		}

		/* Landscape Defensive Lineup Styles */
		.defensive-lineup-landscape {
			page-break-inside: avoid;
			width: 100%;
		}

		.defensive-lineup-landscape h2 {
			font-size: 18pt;
			font-weight: bold;
			margin-bottom: 15pt;
			text-align: center;
		}

		.defensive-lineup-landscape table {
			width: 100%;
			border-collapse: collapse;
			font-size: 11pt;
		}

		.defensive-lineup-landscape th {
			border: 1pt solid black;
			padding: 4pt;
			text-align: center;
			font-weight: bold;
			background: #f0f0f0 !important;
		}

		.defensive-lineup-landscape td {
			border: 1pt solid black;
			padding: 4pt;
			text-align: center;
		}

		.defensive-lineup-landscape .position {
			text-align: left;
			font-weight: bold;
			width: 12%;
		}

		.defensive-lineup-landscape .inning {
			width: 14.66%;
		}

		.defensive-lineup-landscape .sitting-row {
			background: #f8f8f8 !important;
			font-style: italic;
		}
	}
</style>
