export const kain_profile = 'did:plc:oatxppwapvz76m3bvn3c2tub';

export function getPostIdFromUri(uri: string) {
	return uri.split('/').pop();
}
