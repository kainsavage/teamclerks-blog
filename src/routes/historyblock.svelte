<script context="module">
    export const prerender = true;
</script>

<svelte:head>
    <title>HistoryBlock | TeamClerks</title>
</svelte:head>

<h1>HistoryBlock</h1>
<h5>
    Current Version:{" "}
    <a href="https://addons.mozilla.org/en-US/firefox/addon/historyblock/">
        v.2.0.0
    </a>
</h5>

<p>
    HistoryBlock was originally a Firefox addon that I created severar years
    ago. I have ported HistoryBlock to use the standardized{" "}
    <a href="https://developer.mozilla.org/en-US/Add-ons/WebExtensions">
        Web Extension APIs
    </a>
    .
</p>

<p>
    HistoryBlock is an addon for blocking unwanted entries from showing up
    in the browser's history (as well as caches, cookies, local storage,
    etc). HistoryBlock was originally developed before Private Browsing Mode
    was available, but it still serves a purpose even while Private Browsing
    Mode exists.
</p>

<p>
    Currently, I am working on v2.1.0 which will include a lot of
    long-awaited feature requests. You can view the{" "}
    <a href="https://github.com/kainsavage/HistoryBlock/projects/1">
        v.2.1.0 kanban
    </a>{" "}
    (which conveniently illustrates what currently is, will be in the
    future, or has been worked on).
</p>

<p>
    If you have a feature request or bug to report, you can search for
    answers or open an issue on the{" "}
    <a href="https://github.com/kainsavage/HistoryBlock/issues">
        issue tracker
    </a>
    .
</p>
