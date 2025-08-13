type DateStyle = Intl.DateTimeFormatOptions['dateStyle'];

export function formatDate(date: string, dateStyle: DateStyle = 'medium', locales = 'en') {
	// Safari is mad about dashes in the date
	const dateToFormat = new Date(date.replaceAll('-', '/'));
	const dateFormatter = new Intl.DateTimeFormat(locales, { dateStyle });
	return dateFormatter.format(dateToFormat);
}

/**
 * Process hero image metadata and return proper URLs
 */
export function processHeroImage(hero?: string) {
	if (!hero) return null;

	// If hero is already a full URL, return as is
	if (hero.startsWith('http://') || hero.startsWith('https://') || hero.startsWith('data:')) {
		return {
			hero_url: hero,
			blurred_hero_data_url: generateBlurDataUrl()
		};
	}

	// For local images, construct the proper paths
	const ext = hero.split('.').pop();
	const name = hero.replace(`.${ext}`, '');

	const heroUrl = `/images/${hero}`;
	const thumbnailUrl = `/images/${name}_thumb.${ext}`;
	const blurredUrl = `/images/${name}_blurred.${ext}`;

	return {
		hero_url: heroUrl,
		thumbnail_url: thumbnailUrl,
		blurred_hero_data_url: blurredUrl
	};
}

/**
 * Generate a blur data URL for an image
 * This creates a simple SVG-based blur placeholder as fallback
 */
export function generateBlurDataUrl(): string {
	// Create a simple SVG blur placeholder
	const svg = `
		<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<filter id="blur">
					<feGaussianBlur stdDeviation="10"/>
				</filter>
			</defs>
			<rect width="100" height="100" filter="url(#blur)" opacity="0.3" fill="#f0f0f0"/>
		</svg>
	`;

	// Convert to base64
	const base64 = btoa(svg.trim());
	return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Extract excerpt from content (first paragraph or description)
 */
export function extractExcerpt(content: string, maxLength: number = 160): string {
	// Remove markdown formatting
	const plainText = content
		.replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text
		.replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
		.replace(/\*([^*]+)\*/g, '$1') // Remove italic
		.replace(/`([^`]+)`/g, '$1') // Remove inline code
		.replace(/```[\s\S]*?```/g, '') // Remove code blocks
		.replace(/#{1,6}\s+/g, '') // Remove headers
		.replace(/\n+/g, ' ') // Replace newlines with spaces
		.trim();

	// Take first paragraph or truncate
	const firstParagraph = plainText.split('.')[0];
	if (firstParagraph.length <= maxLength) {
		return firstParagraph + (plainText.includes('.') ? '.' : '');
	}

	return firstParagraph.substring(0, maxLength - 3) + '...';
}

/**
 * Get the thumbnail URL for a hero image
 * Similar to the legacy getHeroThumbnailUrl function
 */
export function getHeroThumbnailUrl(hero?: string, includeHost = false): string {
	if (!hero) return '';

	// If it's already a full URL, return as is
	if (hero.startsWith('http://') || hero.startsWith('https://')) {
		return hero;
	}

	// If it's a data URL, return as is
	if (hero.startsWith('data:')) {
		return hero;
	}

	// For local images, construct the thumbnail path
	const ext = hero.split('.').pop();
	const name = hero.replace(`.${ext}`, '');
	const thumbnailFilename = `${name}_thumb.${ext}`;

	if (includeHost) {
		// In a real deployment, you'd use your actual domain
		return `https://your-domain.com/images/${thumbnailFilename}`;
	}

	return `/images/${thumbnailFilename}`;
}
