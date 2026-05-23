// Simple in-memory cache for API promises to prevent redundant fetches on the same page load
const repoDataCache = {};
const latestReleaseCache = {};
const allReleasesCache = {};
let updateConfigCache = null;

/**
 * Fetches update config JSON from the raw repository source
 * @returns {Promise<any>}
 */
export function fetchUpdateConfig() {
	if (!updateConfigCache) {
		updateConfigCache = (async () => {
			try {
				const response = await fetch('https://raw.githubusercontent.com/punisher-303/Echo-Pulse/refs/heads/main/update.json');
				if (!response.ok) throw new Error('Failed to fetch update config');
				return await response.json();
			} catch (error) {
				console.error('Error fetching update config:', error);
				updateConfigCache = null; // Clear from cache on failure
				return null;
			}
		})();
	}
	return updateConfigCache;
}

/**
 * Fetches repository data from GitHub API
 * @param {string} repo - The repo in 'owner/name' format
 * @returns {Promise<any>}
 */
export function fetchRepoData(repo) {
	if (!repoDataCache[repo]) {
		repoDataCache[repo] = (async () => {
			try {
				const response = await fetch(`https://api.github.com/repos/${repo}`);
				if (!response.ok) throw new Error('Failed to fetch repo data');
				return await response.json();
			} catch (error) {
				console.error('Error fetching repo data:', error);
				delete repoDataCache[repo]; // Clear from cache on failure
				return null;
			}
		})();
	}
	return repoDataCache[repo];
}

/**
 * Fetches latest release data from GitHub API
 * @param {string} repo - The repo in 'owner/name' format
 * @returns {Promise<any>}
 */
export function fetchLatestRelease(repo) {
	if (!latestReleaseCache[repo]) {
		latestReleaseCache[repo] = (async () => {
			try {
				const response = await fetch(`https://api.github.com/repos/${repo}/releases/latest`);
				if (!response.ok) throw new Error('Failed to fetch release');
				return await response.json();
			} catch (error) {
				console.error('Error fetching release:', error);
				delete latestReleaseCache[repo]; // Clear from cache on failure
				return null;
			}
		})();
	}
	return latestReleaseCache[repo];
}

/**
 * Fetches all releases to calculate total downloads
 * @param {string} repo - The repo in 'owner/name' format
 * @returns {Promise<any[]>}
 */
export function fetchAllReleases(repo) {
	if (!allReleasesCache[repo]) {
		allReleasesCache[repo] = (async () => {
			try {
				const response = await fetch(`https://api.github.com/repos/${repo}/releases?per_page=100`);
				if (!response.ok) throw new Error('Failed to fetch releases');
				return await response.json();
			} catch (error) {
				console.error('Error fetching all releases:', error);
				delete allReleasesCache[repo]; // Clear from cache on failure
				return [];
			}
		})();
	}
	return allReleasesCache[repo];
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
