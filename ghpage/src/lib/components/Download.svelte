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

	// Action to track pointer positions efficiently without triggering Svelte re-renders
	function spotlight(node) {
		const handleMouseMove = (e) => {
			const rect = node.getBoundingClientRect();
			node.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
			node.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
		};
		node.addEventListener('mousemove', handleMouseMove, { passive: true });
		return {
			destroy() {
				node.removeEventListener('mousemove', handleMouseMove);
			}
		};
	}
</script>

<section id="download" class="py-[84px] px-5 md:px-8 max-w-[1040px] mx-auto scroll-mt-[100px]">
	<div class="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.18em] uppercase text-c-t3 mb-9">
		<div class="w-[14px] h-[2px] bg-c-pk rounded-sm"></div>
		Download
	</div>
	
	<div use:spotlight class="bg-c-s1 border-[1.5px] border-c-b1 rounded-[20px] shadow-sh-md glow-card-outer">
		<div class="px-6 py-10 md:py-11 md:px-11 border-b border-c-b1 text-center bg-gradient-to-b from-c-pk-l to-c-s1 flex flex-col items-center z-30 relative rounded-t-[19px]">
			<h2 class="font-serif text-[clamp(28px,5vw,48px)] font-light tracking-[-0.04em] text-c-t1 mb-1.5">
				Download <em class="italic text-c-pk">Echo Pulse</em> {#if release}{release.tag_name}{/if}
			</h2>
			<p class="font-sans text-[13px] text-c-t2 mb-6">
				Free. Always. No account, no sign-up, no waiting.
			</p>
			<DownloadDropdown align="center" buttonClass="px-8 h-12 text-[15px]" direction="down" />
		</div>
		
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
			<!-- Android Google Play -->
			<a use:spotlight href={downloadUrlAndroid} target="_blank" rel="noopener noreferrer" class="p-5 md:p-6 border-b sm:border-r border-c-b1 no-underline flex flex-col gap-1 transition-colors hover:bg-c-pk-l glow-card">
				<div class="font-mono text-[9px] tracking-[0.12em] uppercase text-c-t3 font-semibold text-c-pk z-10 relative">Android</div>
				<div class="font-sans text-[14px] font-medium text-c-t1 z-10 relative">Google Play Store</div>
				<div class="font-sans text-[11px] text-c-t3 font-medium z-10 relative">Official Android Release</div>
				<div class="inline-flex items-center gap-1 font-mono text-[9px] tracking-[0.06em] uppercase text-c-gn bg-c-gn-l border border-[#aadcc0] px-1.5 py-0.5 rounded mt-1.5 w-fit z-10 relative">
					Recommended
				</div>
			</a>
			
			<!-- Windows -->
			<a use:spotlight href={downloadUrlWindows} target="_blank" rel="noopener noreferrer" class="p-5 md:p-6 border-b md:border-r border-c-b1 no-underline flex flex-col gap-1 transition-colors hover:bg-c-pk-l glow-card">
				<div class="font-mono text-[9px] tracking-[0.12em] uppercase text-c-t3 font-semibold text-c-pk z-10 relative">Windows</div>
				<div class="font-sans text-[14px] font-medium text-c-t1 z-10 relative">Zip Installer / Portable</div>
				<div class="font-sans text-[11px] text-c-t3 z-10 relative">Windows x64 Native Build</div>
			</a>

			<!-- macOS -->
			<a use:spotlight href={downloadUrlMac} target="_blank" rel="noopener noreferrer" class="p-5 md:p-6 border-b sm:border-r md:border-r-0 border-c-b1 no-underline flex flex-col gap-1 transition-colors hover:bg-c-pk-l glow-card">
				<div class="font-mono text-[9px] tracking-[0.12em] uppercase text-c-t3 font-semibold text-c-pk z-10 relative">macOS</div>
				<div class="font-sans text-[14px] font-medium text-c-t1 z-10 relative">DMG package</div>
				<div class="font-sans text-[11px] text-c-t3 z-10 relative">Universal (Intel & Apple Silicon)</div>
			</a>
			
			<!-- Linux -->
			<a use:spotlight href={downloadUrlLinux} target="_blank" rel="noopener noreferrer" class="p-5 md:p-6 border-b sm:border-b-0 md:border-r border-c-b1 no-underline flex flex-col gap-1 transition-colors hover:bg-c-pk-l glow-card">
				<div class="font-mono text-[9px] tracking-[0.12em] uppercase text-c-t3 font-semibold text-c-pk z-10 relative">Linux</div>
				<div class="font-sans text-[14px] font-medium text-c-t1 z-10 relative">Tarball Bundle</div>
				<div class="font-sans text-[11px] text-c-t3 z-10 relative">Linux x64 Executable</div>
			</a>
			
			<!-- SourceForge Mirror -->
			<a use:spotlight href="https://sourceforge.net/projects/echo-pulse/files/latest/download" target="_blank" rel="noopener noreferrer" class="p-5 md:p-6 border-b sm:border-b-0 sm:border-r border-c-b1 no-underline flex flex-col gap-1 transition-colors hover:bg-c-pk-l glow-card">
				<div class="font-mono text-[9px] tracking-[0.12em] uppercase text-c-t3 z-10 relative">All Platforms</div>
				<div class="font-sans text-[14px] font-medium text-c-t1 z-10 relative">SourceForge Mirror</div>
				<div class="font-sans text-[11px] text-c-t3 z-10 relative">Alternative fast mirrors</div>
			</a>
			
			<!-- Source -->
			<a use:spotlight href="https://github.com/{repo}" target="_blank" rel="noopener noreferrer" class="p-5 md:p-6 no-underline flex flex-col gap-1 transition-colors hover:bg-c-pk-l glow-card">
				<div class="font-mono text-[9px] tracking-[0.12em] uppercase text-c-t3 z-10 relative">Developers</div>
				<div class="font-sans text-[14px] font-medium text-c-t1 z-10 relative">Build from Source</div>
				<div class="font-sans text-[11px] text-c-t3 z-10 relative">MIT · Flutter & Dart</div>
			</a>
		</div>
		
		<div class="px-6 py-4 border-t border-c-b1 font-mono text-[10px] text-c-t3 leading-[1.6] z-10 relative bg-[#faf8f4]/30 rounded-b-[19px]">
			Verify download at <a href="https://github.com/{repo}/releases" target="_blank" rel="noopener noreferrer" class="text-c-t2 underline underline-offset-2 hover:text-c-pk">github.com/{repo}</a><br>
			Made with ♥ by <a href="https://github.com/punisher-303" target="_blank" rel="noopener noreferrer" class="text-c-t2 underline underline-offset-2 hover:text-c-pk">Anand</a> · Part of <a href="{base}/" class="text-c-t2 underline underline-offset-2 hover:text-c-pk">Echo Pulse Portfolio</a>
		</div>
	</div>
</section>

<style>
	.glow-card-outer {
		position: relative;
	}
	.glow-card-outer::before {
		content: '';
		position: absolute;
		inset: 0;
		background: radial-gradient(420px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(224, 79, 106, 0.04), transparent 75%);
		pointer-events: none;
		z-index: 0;
		opacity: 0;
		transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
		border-radius: inherit;
	}
	.glow-card-outer:hover::before {
		opacity: 1;
	}

	.glow-card {
		position: relative;
		overflow: hidden;
	}
	.glow-card::before {
		content: '';
		position: absolute;
		inset: 0;
		background: radial-gradient(220px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(224, 79, 106, 0.06), transparent 75%);
		pointer-events: none;
		z-index: 0;
		opacity: 0;
		transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
		border-radius: inherit;
	}
	.glow-card::after {
		content: '';
		position: absolute;
		inset: -1.5px;
		background: radial-gradient(140px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(224, 79, 106, 0.25), transparent 70%);
		border-radius: inherit;
		pointer-events: none;
		z-index: 2;
		opacity: 0;
		transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
		padding: 1.5px;
		-webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
	}
	.glow-card:hover::before,
	.glow-card:hover::after {
		opacity: 1;
	}
</style>

