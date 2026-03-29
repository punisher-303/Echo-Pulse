<script>
	import { onMount } from 'svelte';
	
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
	<a href="#" class="flex items-center gap-2.5 no-underline group" on:click={closeMenu}>
		<span class="font-serif text-[18px] font-normal tracking-[-0.025em] text-c-t1 whitespace-nowrap">
			Echo<em class="not-italic text-c-pk">Pulse</em>
		</span>
	</a>
	
	<ul class="hidden md:flex items-center gap-0.5 list-none m-0 p-0">
		<li><a href="#apps" class="text-c-t2 no-underline font-sans text-[13px] font-normal px-3 py-1.5 rounded-lg transition-colors hover:text-c-t1 hover:bg-c-s3">Apps</a></li>
		<li><a href="#features" class="text-c-t2 no-underline font-sans text-[13px] font-normal px-3 py-1.5 rounded-lg transition-colors hover:text-c-t1 hover:bg-c-s3">Features</a></li>
		<li><a href="#about" class="text-c-t2 no-underline font-sans text-[13px] font-normal px-3 py-1.5 rounded-lg transition-colors hover:text-c-t1 hover:bg-c-s3">About</a></li>
		<li>
			<a href="#download" class="inline-flex items-center gap-1.5 h-[36px] px-[18px] bg-c-pk text-white font-sans text-[13px] font-medium rounded-[10px] no-underline shadow-[0_2px_10px_rgba(224,79,106,0.26)] transition-all duration-150 hover:opacity-85 hover:-translate-y-[1px] ml-2">
				Get Echo Pulse
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
	<a href="#apps" class="block text-c-t2 no-underline font-sans text-[15px] py-3 border-b border-c-b1 hover:text-c-t1 transition-colors" on:click={closeMenu}>Apps</a>
	<a href="#features" class="block text-c-t2 no-underline font-sans text-[15px] py-3 border-b border-c-b1 hover:text-c-t1 transition-colors" on:click={closeMenu}>Features</a>
	<a href="#about" class="block text-c-t2 no-underline font-sans text-[15px] py-3 border-b border-c-b1 hover:text-c-t1 transition-colors" on:click={closeMenu}>About</a>
	<a href="https://github.com/punisher-303" target="_blank" rel="noopener noreferrer" class="block text-c-t2 no-underline font-sans text-[15px] py-3 border-b border-c-b1 hover:text-c-t1 transition-colors" on:click={closeMenu}>GitHub</a>
	<a href="#download" class="block text-c-pk no-underline font-sans text-[15px] font-medium py-3 mt-1 hover:text-c-pk-d" on:click={closeMenu}>Get Echo Pulse →</a>
</div>
