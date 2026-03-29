<script>
	import { base } from '$app/paths';
	export let active = 'overview';
</script>

<div class="sticky top-[58px] z-40 bg-[#faf8f4]/95 backdrop-blur-md border-b border-c-b1 px-5 md:px-10 flex items-center overflow-x-auto no-scrollbar">
	<a href="#overview" class="flex items-center gap-1.5 text-c-t1 font-sans text-[13px] px-4 py-3.5 border-b-2 whitespace-nowrap no-underline transition-all duration-200" class:border-c-pk={active === 'overview'} class:border-transparent={active !== 'overview'}>Overview</a>
	<a href="#features" class="flex items-center gap-1.5 font-sans text-[13px] px-4 py-3.5 border-b-2 whitespace-nowrap no-underline transition-all duration-200" class:text-c-t1={active === 'features'} class:text-c-t3={active !== 'features'} class:border-c-pk={active === 'features'} class:border-transparent={active !== 'features'}>Features</a>
	<a href="#releases" class="flex items-center gap-1.5 font-sans text-[13px] px-4 py-3.5 border-b-2 whitespace-nowrap no-underline transition-all duration-200" class:text-c-t1={active === 'releases'} class:text-c-t3={active !== 'releases'} class:border-c-pk={active === 'releases'} class:border-transparent={active !== 'releases'}>Releases</a>
	<a href="#download" class="flex items-center gap-1.5 font-sans text-[13px] px-4 py-3.5 border-b-2 whitespace-nowrap no-underline transition-all duration-200" class:text-c-t1={active === 'download'} class:text-c-t3={active !== 'download'} class:border-c-pk={active === 'download'} class:border-transparent={active !== 'download'}>Download</a>
	<a href="#about" class="flex items-center gap-1.5 font-sans text-[13px] px-4 py-3.5 border-b-2 whitespace-nowrap no-underline transition-all duration-200" class:text-c-t1={active === 'about'} class:text-c-t3={active !== 'about'} class:border-c-pk={active === 'about'} class:border-transparent={active !== 'about'}>Support</a>
</div>
