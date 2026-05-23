<script>
	import { onMount } from 'svelte';
	import { fetchUpdateConfig } from '$lib/utils/github';

	// Props using Svelte 5 $props() rune
	let { align = 'center', buttonClass = '' } = $props();

	let isOpen = $state(false);
	let dropdownEl = $state(null);

	// Dynamic URLs with fallback versions from update.json
	let downloadUrlAndroid = $state("https://play.google.com/store/apps/details?id=com.echo.pulse");
	let downloadUrlWindows = $state("https://github.com/punisher-303/Echo-Pulse/releases/download/v4.7.9%2B2113/echo_pulse_windows_x64_v4.7.9+2113.zip");
	let downloadUrlMac = $state("https://github.com/punisher-303/Echo-Pulse/releases/latest");
	let downloadUrlLinux = $state("https://github.com/punisher-303/Echo-Pulse/releases/download/v4.7.9%2B2113/echo_pulse_linux_v4.7.9+2113.tar.gz");

	// Reactive downloads array using Svelte 5 $derived
	const downloads = $derived([
		{
			platform: 'Android',
			icon: 'fa-brands fa-google-play',
			subtitle: 'Official App Store',
			url: downloadUrlAndroid
		},
		{
			platform: 'Windows',
			icon: 'fa-brands fa-windows',
			subtitle: 'Windows Desktop App',
			url: downloadUrlWindows
		},
		{
			platform: 'macOS',
			icon: 'fa-brands fa-apple',
			subtitle: 'macOS Desktop App',
			url: downloadUrlMac
		},
		{
			platform: 'Linux',
			icon: 'fa-brands fa-linux',
			subtitle: 'Linux Desktop App',
			url: downloadUrlLinux
		}
	]);

	function toggleDropdown(e) {
		e.stopPropagation();
		isOpen = !isOpen;
	}

	function closeDropdown() {
		isOpen = false;
	}

	onMount(async () => {
		const handleOutsideClick = (e) => {
			if (dropdownEl && !dropdownEl.contains(e.target)) {
				closeDropdown();
			}
		};
		window.addEventListener('click', handleOutsideClick);

		// Dynamically resolve links from central update.json configuration
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

		return () => {
			window.removeEventListener('click', handleOutsideClick);
		};
	});
</script>

<div class="relative inline-block text-left" bind:this={dropdownEl}>
	<button
		type="button"
		class="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-[10px] bg-c-pk text-white font-sans text-[14px] font-medium no-underline transition-all hover:opacity-95 hover:-translate-y-[2px] shadow-[0_2px_14px_rgba(224,79,106,0.32)] hover:shadow-[0_6px_22px_rgba(224,79,106,0.34)] cursor-pointer select-none border-none {buttonClass}"
		aria-expanded={isOpen}
		onclick={toggleDropdown}
	>
		<span>Download Echo Pulse</span>
		<i class="fa-solid fa-chevron-down transition-transform duration-200 text-[12px] {isOpen ? 'rotate-180' : ''}"></i>
	</button>

	{#if isOpen}
		<div
			class="absolute z-50 mt-2.5 w-[300px] rounded-xl border border-c-b1 bg-white/95 backdrop-blur-xl shadow-sh-3 p-2 transition-all origin-top-right transform scale-100 opacity-100 {align === 'right' ? 'right-0' : align === 'left' ? 'left-0' : 'left-1/2 -translate-x-1/2'}"
			role="menu"
		>
			<div class="flex flex-col gap-1">
				{#each downloads as dl}
					<a
						href={dl.url}
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center justify-between p-2.5 rounded-[10px] text-c-t1 hover:bg-c-pk-l border border-transparent hover:border-c-pk-m/30 transition-all group no-underline"
						role="menuitem"
						onclick={closeDropdown}
					>
						<div class="flex items-center gap-3">
							<div class="flex items-center justify-center w-9 h-9 rounded-lg bg-c-s2 group-hover:bg-c-pk-m/40 text-c-t2 group-hover:text-c-pk transition-colors">
								<i class="{dl.icon} text-[18px]"></i>
							</div>
							<div class="flex flex-col text-left">
								<span class="font-sans font-semibold text-[13px] text-c-t1 group-hover:text-c-pk transition-colors leading-tight">
									{dl.platform}
								</span>
								<span class="font-sans text-[10px] text-c-t3 mt-0.5 leading-none">
									{dl.subtitle}
								</span>
							</div>
						</div>
						<div class="flex items-center justify-center w-7 h-7 rounded-full bg-c-s2 group-hover:bg-c-pk text-c-t2 group-hover:text-white transition-all group-hover:scale-105">
							<i class="fa-solid fa-arrow-down text-[10px]"></i>
						</div>
					</a>
				{/each}
			</div>
		</div>
	{/if}
</div>
