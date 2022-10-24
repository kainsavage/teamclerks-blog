<script context="module">
    import {order_by_date_str_desc} from "$lib/utils/string_helper.js";

    export async function load() {
        const posts = import.meta.globEager('./posts/*.svx');
        const postsList = Object.values(posts);
        const postsMeta = postsList.map(post => post.metadata);

        return {
            props: {
                posts: postsMeta.sort(order_by_date_str_desc),
            },
        };
    }
</script>

<script>
    import Header from '$lib/components/header.svelte';
    import {slugify, format_date_string} from "$lib/utils/string_helper.js";
    import '../app.css';

    export let posts;
</script>

<Header/>
<section>
    <div class="left-nav">
        <h5>Posts</h5>
        <ul>
            {#each posts as post}
                <li class="post">
                    <a href="/posts/{slugify(post.title)}">{post.title}</a>
                    <span>{format_date_string(new Date(post.date))}</span>
                </li>
            {/each}
        </ul>
    </div>
    <main>
        <slot/>
        <footer>
            © {new Date().getFullYear()} TeamClerks
        </footer>
    </main>
</section>

<style>
    section {
        display: flex;
        flex-direction: row;
    }

    .left-nav {
        padding: 0 0 0 2%;
        width: 250px;
        display: flex;
        flex-direction: column;
    }

    .left-nav h5 {
        margin-bottom: 8px;
    }

    .left-nav ul {
        margin: 0;
    }

    .left-nav ul li {
        margin: 0;
    }

    .left-nav .post {
        display: flex;
        flex-direction: row;
        width: 100%;
    }

    .left-nav .post a {
        width: 70%;
        font-size: 0.8em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0 10px 0 0;
    }

    .left-nav .post span {
        font-size: 0.6em;
        align-self: flex-end;
    }

    main {
        width: 75%;
        padding: 0 2% 0px;
    }
</style>
