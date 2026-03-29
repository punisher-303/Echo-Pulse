<script>
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { fetchLatestRelease } from '$lib/utils/github';

	let repo = "punisher-303/Echo-Pulse";
	let release = null;
	
	onMount(async () => {
		release = await fetchLatestRelease(repo);
	});
</script>

<section id="download" class="py-[84px] px-5 md:px-8 max-w-[1040px] mx-auto scroll-mt-[100px]">
	<div class="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.18em] uppercase text-c-t3 mb-9">
		<div class="w-[14px] h-[2px] bg-c-pk rounded-sm"></div>
		Download
	</div>
	
	<div class="bg-c-s1 border-[1.5px] border-c-b1 rounded-[20px] overflow-hidden shadow-sh-md">
		<div class="px-6 py-10 md:py-11 md:px-11 border-b border-c-b1 text-center bg-gradient-to-b from-c-pk-l to-c-s1">
			<h2 class="font-serif text-[clamp(28px,5vw,48px)] font-light tracking-[-0.04em] text-c-t1 mb-1.5">
				Download <em class="italic text-c-pk">Echo Pulse</em> {#if release}{release.tag_name}{/if}
			</h2>
			<p class="font-sans text-[13px] text-c-t2">
				Free. Always. No account, no sign-up, no waiting.
			</p>
		</div>
		
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
			<!-- Android GitHub -->
			<a href="https://github.com/{repo}/releases/latest" target="_blank" rel="noopener noreferrer" class="p-5 md:p-6 border-b sm:border-r border-c-b1 no-underline flex flex-col gap-1 transition-colors hover:bg-c-pk-l">
				<div class="font-mono text-[9px] tracking-[0.12em] uppercase text-c-t3">Android</div>
				<div class="font-sans text-[14px] font-medium text-c-t1">APK · GitHub</div>
				<div class="font-sans text-[11px] text-c-t3">Arm64 · Universal · Official</div>
				<div class="inline-flex items-center gap-1 font-mono text-[9px] tracking-[0.06em] uppercase text-c-gn bg-c-gn-l border border-[#aadcc0] px-1.5 py-0.5 rounded mt-1 w-fit">
					Recommended
				</div>
			</a>
			
			<!-- SourceForge Mirror -->
			<a href="https://sourceforge.net/projects/echo-pulse/files/latest/download" target="_blank" rel="noopener noreferrer" class="p-5 md:p-6 border-b md:border-r border-c-b1 no-underline flex flex-col gap-1 transition-colors hover:bg-c-pk-l">
				<div class="font-mono text-[9px] tracking-[0.12em] uppercase text-c-t3">All Platforms</div>
				<div class="font-sans text-[14px] font-medium text-c-t1">SourceForge Mirror</div>
				<div class="font-sans text-[11px] text-c-t3">Fast global downloads</div>
			</a>

			<!-- F-Droid / IzzyOnDroid -->
			<div class="p-5 md:p-6 border-b sm:border-r md:border-r-0 border-c-b1 flex flex-col gap-1 grayscale opacity-60">
				<div class="font-mono text-[9px] tracking-[0.12em] uppercase text-c-t3">Android</div>
				<div class="font-sans text-[14px] font-medium text-c-t1">IzzyOnDroid</div>
				<div class="font-sans text-[11px] text-c-t3 text-c-pk">Coming soon</div>
			</div>
			
			<!-- Windows -->
			<a href="https://github.com/{repo}/releases/latest" target="_blank" rel="noopener noreferrer" class="p-5 md:p-6 border-b sm:border-b-0 md:border-r border-c-b1 no-underline flex flex-col gap-1 transition-colors hover:bg-c-pk-l">
				<div class="font-mono text-[9px] tracking-[0.12em] uppercase text-c-t3">Windows</div>
				<div class="font-sans text-[14px] font-medium text-c-t1">Installer / Portable</div>
				<div class="font-sans text-[11px] text-c-t3">Native media controls</div>
			</a>
			
			<!-- Linux -->
			<a href="https://github.com/{repo}/releases/latest" target="_blank" rel="noopener noreferrer" class="p-5 md:p-6 border-b sm:border-b-0 sm:border-r border-c-b1 no-underline flex flex-col gap-1 transition-colors hover:bg-c-pk-l">
				<div class="font-mono text-[9px] tracking-[0.12em] uppercase text-c-t3">Linux</div>
				<div class="font-sans text-[14px] font-medium text-c-t1">AppImage / Tarball</div>
				<div class="font-sans text-[11px] text-c-t3">GitHub release</div>
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

