export async function load() {
	try {
		// @ts-expect-error - mdsvex handles markdown imports at runtime
		const about = await import(`./about.md`);

		return {
			content: about.default,
			meta: about.metadata
		};
	} catch {
		throw new Error('Could not load about page');
	}
}
