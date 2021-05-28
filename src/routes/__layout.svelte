<script>
	import Header from '$lib/components/header.svelte';
	import {slugify} from "$lib/utils/string_helper.js";
	import '../app.css';

	import posts from "./posts/posts.json";
</script>

<Header />
<section>
	<div class="left-nav">
		<h5>Posts</h5>
		<ul>
			{#each posts.posts as post}
				<li class="post">
					<a href="/posts/{slugify(post.name)}">{post.name}</a>
					<span>{post.date}</span>
				</li>
			{/each}
		</ul>
	</div>
	<main>
		<slot />
		<footer>
			© {new Date().getFullYear()}{" "}
			TeamClerks
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
		width: 80%;
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
