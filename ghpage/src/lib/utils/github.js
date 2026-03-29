/**
 * Fetches repository data from GitHub API
 * @param {string} repo - The repo in 'owner/name' format
 * @returns {Promise<any>}
 */
export async function fetchRepoData(repo) {
	try {
		const response = await fetch(`https://api.github.com/repos/${repo}`);
		if (!response.ok) throw new Error('Failed to fetch repo data');
		return await response.ok ? response.json() : null;
	} catch (error) {
		console.error('Error fetching repo data:', error);
		return null;
	}
}

/**
 * Fetches latest release data from GitHub API
 * @param {string} repo - The repo in 'owner/name' format
 * @returns {Promise<any>}
 */
export async function fetchLatestRelease(repo) {
	try {
		const response = await fetch(`https://api.github.com/repos/${repo}/releases/latest`);
		if (!response.ok) throw new Error('Failed to fetch release');
		return await response.json();
	} catch (error) {
		console.error('Error fetching release:', error);
		return null;
	}
}

/**
 * Fetches all releases to calculate total downloads
 * @param {string} repo - The repo in 'owner/name' format
 * @returns {Promise<any[]>}
 */
export async function fetchAllReleases(repo) {
	try {
		const response = await fetch(`https://api.github.com/repos/${repo}/releases?per_page=100`);
		if (!response.ok) throw new Error('Failed to fetch releases');
		return await response.json();
	} catch (error) {
		console.error('Error fetching all releases:', error);
		return [];
	}
}

/**
 * Calculates total downloads across all assets and releases
 * @param {string} repo 
 * @returns {Promise<number>}
 */
export async function fetchTotalDownloads(repo) {
	const releases = await fetchAllReleases(repo);
	return releases.reduce((acc, rel) => {
		const relSum = rel.assets.reduce((sum, asset) => sum + (asset.download_count || 0), 0);
		return acc + relSum;
	}, 0);
}

/**
 * Formats a number to k/m/b format
 * @param {number} num 
 * @returns {string}
 */
export function formatCount(num) {
	if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
	if (num >= 1000) return (num / 1000).toFixed(1) + 'k+';
	return num?.toString() || '0';
}
