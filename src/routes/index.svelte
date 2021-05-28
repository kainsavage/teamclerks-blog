<script context="module">
	export const prerender = true;
</script>

<svelte:head>
	<title>Home | TeamClerks</title>
</svelte:head>

<h1>Welcome</h1>

<p>
	TeamClerks is an entity I founded around 2001. Originally, it was a gaming clan amongst my
	close friends. Eventually, it grew into a side-business (I built and sold custom gaming
	computers for a while during college).
</p>

<p>I am unsure what TeamClerks is today.</p>

<p>
	Currently, I am treating it as my personal development sandbox to try out new technologies
	and implement ideas I have. This site, for instance, is a blog I built using React as the
	front-end because I wanted to try it out.
</p>

<p>This website is also the home of <a href="/historyblock">HistoryBlock</a>.</p>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
