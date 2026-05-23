<script>
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { fetchLatestRelease, fetchUpdateConfig } from '$lib/utils/github';
	import DownloadDropdown from '$lib/components/DownloadDropdown.svelte';

	let repo = "punisher-303/Echo-Pulse";
	let release = $state(null);
	let downloadUrlAndroid = $state("https://play.google.com/store/apps/details?id=com.echo.pulse");
	let downloadUrlWindows = $state("https://github.com/punisher-303/Echo-Pulse/releases/download/v4.7.9%2B2113/echo_pulse_windows_x64_v4.7.9+2113.zip");
	let downloadUrlMac = $state("https://github.com/punisher-303/Echo-Pulse/releases/latest");
	let downloadUrlLinux = $state("https://github.com/punisher-303/Echo-Pulse/releases/download/v4.7.9%2B2113/echo_pulse_linux_v4.7.9+2113.tar.gz");
	
	onMount(async () => {
		release = await fetchLatestRelease(repo);
		try {
			const config = await fetchUpdateConfig();
			if (config) {
				if (config.download_url_android) downloadUrlAndroid = config.download_url_android;
				if (config.download_url_windows) downloadUrlWindows = config.download_url_windows;
				if (config.download_url_mac) downloadUrlMac = config.download_url_mac;
				if (config.download_url_linux) downloadUrlLinux = config.download_url_linux;
			}
		} catch (error) {
			console.error('Error fetching update config:', error);
		}
	});
</script>

<section id="download" class="py-[84px] px-5 md:px-8 max-w-[1040px] mx-auto scroll-mt-[100px]">
	<div class="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.18em] uppercase text-c-t3 mb-9">
		<div class="w-[14px] h-[2px] bg-c-pk rounded-sm"></div>
		Download
	</div>
	
	<div class="bg-c-s1 border-[1.5px] border-c-b1 rounded-[20px] overflow-hidden shadow-sh-md">
		<div class="px-6 py-10 md:py-11 md:px-11 border-b border-c-b1 text-center bg-gradient-to-b from-c-pk-l to-c-s1 flex flex-col items-center">
			<h2 class="font-serif text-[clamp(28px,5vw,48px)] font-light tracking-[-0.04em] text-c-t1 mb-1.5">
				Download <em class="italic text-c-pk">Echo Pulse</em> {#if release}{release.tag_name}{/if}
			</h2>
			<p class="font-sans text-[13px] text-c-t2 mb-6">
				Free. Always. No account, no sign-up, no waiting.
			</p>
			<DownloadDropdown align="center" buttonClass="px-8 h-12 text-[15px]" />
		</div>
		
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
			<!-- Android Google Play -->
			<a href={downloadUrlAndroid} target="_blank" rel="noopener noreferrer" class="p-5 md:p-6 border-b sm:border-r border-c-b1 no-underline flex flex-col gap-1 transition-colors hover:bg-c-pk-l">
				<div class="font-mono text-[9px] tracking-[0.12em] uppercase text-c-t3 font-semibold text-c-pk">Android</div>
				<div class="font-sans text-[14px] font-medium text-c-t1">Google Play Store</div>
				<div class="font-sans text-[11px] text-c-t3 font-medium">Official Android Release</div>
				<div class="inline-flex items-center gap-1 font-mono text-[9px] tracking-[0.06em] uppercase text-c-gn bg-c-gn-l border border-[#aadcc0] px-1.5 py-0.5 rounded mt-1.5 w-fit">
					Recommended
				</div>
			</a>
			
			<!-- Windows -->
			<a href={downloadUrlWindows} target="_blank" rel="noopener noreferrer" class="p-5 md:p-6 border-b md:border-r border-c-b1 no-underline flex flex-col gap-1 transition-colors hover:bg-c-pk-l">
				<div class="font-mono text-[9px] tracking-[0.12em] uppercase text-c-t3 font-semibold text-c-pk">Windows</div>
				<div class="font-sans text-[14px] font-medium text-c-t1">Zip Installer / Portable</div>
				<div class="font-sans text-[11px] text-c-t3">Windows x64 Native Build</div>
			</a>

			<!-- macOS -->
			<a href={downloadUrlMac} target="_blank" rel="noopener noreferrer" class="p-5 md:p-6 border-b sm:border-r md:border-r-0 border-c-b1 no-underline flex flex-col gap-1 transition-colors hover:bg-c-pk-l">
				<div class="font-mono text-[9px] tracking-[0.12em] uppercase text-c-t3 font-semibold text-c-pk">macOS</div>
				<div class="font-sans text-[14px] font-medium text-c-t1">DMG package</div>
				<div class="font-sans text-[11px] text-c-t3">Universal (Intel & Apple Silicon)</div>
			</a>
			
			<!-- Linux -->
			<a href={downloadUrlLinux} target="_blank" rel="noopener noreferrer" class="p-5 md:p-6 border-b sm:border-b-0 md:border-r border-c-b1 no-underline flex flex-col gap-1 transition-colors hover:bg-c-pk-l">
				<div class="font-mono text-[9px] tracking-[0.12em] uppercase text-c-t3 font-semibold text-c-pk">Linux</div>
				<div class="font-sans text-[14px] font-medium text-c-t1">Tarball Bundle</div>
				<div class="font-sans text-[11px] text-c-t3">Linux x64 Executable</div>
			</a>
			
			<!-- SourceForge Mirror -->
			<a href="https://sourceforge.net/projects/echo-pulse/files/latest/download" target="_blank" rel="noopener noreferrer" class="p-5 md:p-6 border-b sm:border-b-0 sm:border-r border-c-b1 no-underline flex flex-col gap-1 transition-colors hover:bg-c-pk-l">
				<div class="font-mono text-[9px] tracking-[0.12em] uppercase text-c-t3">All Platforms</div>
				<div class="font-sans text-[14px] font-medium text-c-t1">SourceForge Mirror</div>
				<div class="font-sans text-[11px] text-c-t3">Alternative fast mirrors</div>
			</a>
			
			<!-- Source -->
			<a href="https://github.com/{repo}" target="_blank" rel="noopener noreferrer" class="p-5 md:p-6 no-underline flex flex-col gap-1 transition-colors hover:bg-c-pk-l">
				<div class="font-mono text-[9px] tracking-[0.12em] uppercase text-c-t3">Developers</div>
				<div class="font-sans text-[14px] font-medium text-c-t1">Build from Source</div>
				<div class="font-sans text-[11px] text-c-t3">MIT · Flutter & Dart</div>
			</a>
		</div>
		
		<div class="px-6 py-4 border-t border-c-b1 font-mono text-[10px] text-c-t3 leading-[1.6]">
			Verify download at <a href="https://github.com/{repo}/releases" target="_blank" rel="noopener noreferrer" class="text-c-t2 underline underline-offset-2 hover:text-c-pk">github.com/{repo}</a><br>
			Made with ♥ by <a href="https://github.com/punisher-303" target="_blank" rel="noopener noreferrer" class="text-c-t2 underline underline-offset-2 hover:text-c-pk">Anand</a> · Part of <a href="{base}/" class="text-c-t2 underline underline-offset-2 hover:text-c-pk">Echo Pulse Portfolio</a>
		</div>
	</div>
</section>

