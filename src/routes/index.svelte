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
    and implement ideas I have. This site, for instance, is a blog I built using
    <span class="strike-through">React</span> <span class="strike-through">React+Gatsby</span>
    SvelteKit as the front-end because I wanted to try it out.
</p>

<p>This website is also the home of <a href="/historyblock">HistoryBlock</a>.</p>

<style>
    h1 {
        width: 100%;
    }

    .strike-through {
        text-decoration: line-through;
    }
</style>
