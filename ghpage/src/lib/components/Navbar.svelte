<script>
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	
	let scrolled = false;
	let mobileMenuOpen = false;

	onMount(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 14;
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function toggleMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}
	
	function closeMenu() {
		mobileMenuOpen = false;
	}
</script>

<nav id="site-nav" class="fixed top-0 left-0 right-0 z-50 h-[58px] flex items-center justify-between px-5 md:px-10 bg-[#faf8f4]/90 backdrop-blur-xl border-b border-c-b1 transition-shadow duration-200" class:shadow-sh-1={scrolled}>
	<a href="{base}/#overview" class="flex items-center gap-2.5 no-underline group" on:click={closeMenu}>
		<span class="font-serif text-[16px] font-normal tracking-[-0.025em] text-c-t1 whitespace-nowrap">
			Echo<span class="text-c-pk font-semibold">Pulse</span>
		</span>
	</a>
	
	<ul class="hidden md:flex items-center gap-0.5 list-none m-0 p-0">
		<li><a href="{base}/#overview" class="text-c-t2 no-underline font-sans text-[13px] font-normal px-3 py-1.5 rounded-lg transition-colors hover:text-c-t1 hover:bg-c-s3">Overview</a></li>
		<li><a href="{base}/#features" class="text-c-t2 no-underline font-sans text-[13px] font-normal px-3 py-1.5 rounded-lg transition-colors hover:text-c-t1 hover:bg-c-s3">Features</a></li>
		<li><a href="{base}/#spotify-canvas" class="text-c-t2 no-underline font-sans text-[13px] font-normal px-3 py-1.5 rounded-lg transition-colors hover:text-c-t1 hover:bg-c-s3">Canvas</a></li>
		<li><a href="{base}/#screenshots" class="text-c-t2 no-underline font-sans text-[13px] font-normal px-3 py-1.5 rounded-lg transition-colors hover:text-c-t1 hover:bg-c-s3">Screenshots</a></li>
		<li><a href="{base}/#releases" class="text-c-t2 no-underline font-sans text-[13px] font-normal px-3 py-1.5 rounded-lg transition-colors hover:text-c-t1 hover:bg-c-s3">Releases</a></li>
		<li><a href="{base}/#about" class="text-c-t2 no-underline font-sans text-[13px] font-normal px-3 py-1.5 rounded-lg transition-colors hover:text-c-t1 hover:bg-c-s3">Support</a></li>
		<li><a href="{base}/issues" class="text-c-t2 no-underline font-sans text-[13px] font-normal px-3 py-1.5 rounded-lg transition-colors hover:text-c-t1 hover:bg-c-s3">Issues</a></li>
		<li>
			<a href="https://github.com/punisher-303/Echo-Pulse" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center w-9 h-9 rounded-[10px] bg-c-s2 hover:bg-c-pk text-c-t2 hover:text-white transition-all duration-150 ml-2" aria-label="GitHub Repository">
				<i class="fa-brands fa-github text-[18px]"></i>
			</a>
		</li>
	</ul>

	<!-- Hamburger -->
	<button id="hamburger" class="md:hidden flex flex-col gap-[4.5px] bg-transparent border-none cursor-pointer p-2" aria-label="Menu" aria-expanded={mobileMenuOpen} on:click={toggleMenu}>
		<span class="block w-[18px] h-[1.5px] bg-c-t2 rounded-sm"></span>
		<span class="block w-[18px] h-[1.5px] bg-c-t2 rounded-sm"></span>
		<span class="block w-[18px] h-[1.5px] bg-c-t2 rounded-sm"></span>
	</button>
</nav>

<!-- Mobile drawer -->
<div id="mobile-nav" class="md:hidden fixed top-[58px] left-0 right-0 z-[190] bg-c-bg border-b border-c-b1 px-7 py-4 shadow-sh-2 flex-col gap-0.5" class:hidden={!mobileMenuOpen} class:flex={mobileMenuOpen}>
	<a href="{base}/#overview" class="block text-c-t2 no-underline font-sans text-[15px] py-3 border-b border-c-b1 hover:text-c-t1 transition-colors" on:click={closeMenu}>Overview</a>
	<a href="{base}/#features" class="block text-c-t2 no-underline font-sans text-[15px] py-3 border-b border-c-b1 hover:text-c-t1 transition-colors" on:click={closeMenu}>Features</a>
	<a href="{base}/#spotify-canvas" class="block text-c-t2 no-underline font-sans text-[15px] py-3 border-b border-c-b1 hover:text-c-t1 transition-colors" on:click={closeMenu}>Canvas</a>
	<a href="{base}/#screenshots" class="block text-c-t2 no-underline font-sans text-[15px] py-3 border-b border-c-b1 hover:text-c-t1 transition-colors" on:click={closeMenu}>Screenshots</a>
	<a href="{base}/#releases" class="block text-c-t2 no-underline font-sans text-[15px] py-3 border-b border-c-b1 hover:text-c-t1 transition-colors" on:click={closeMenu}>Releases</a>
	<a href="{base}/#about" class="block text-c-t2 no-underline font-sans text-[15px] py-3 border-b border-c-b1 hover:text-c-t1 transition-colors" on:click={closeMenu}>Support</a>
	<a href="{base}/issues" class="block text-c-t2 no-underline font-sans text-[15px] py-3 border-b border-c-b1 hover:text-c-t1 transition-colors" on:click={closeMenu}>Issues</a>
	<a href="https://github.com/punisher-303/Echo-Pulse" target="_blank" rel="noopener noreferrer" class="block text-c-t2 no-underline font-sans text-[15px] py-3 mt-1 hover:text-c-pk transition-colors" on:click={closeMenu}>
		<i class="fa-brands fa-github mr-2"></i> GitHub Repository
	</a>
</div>
