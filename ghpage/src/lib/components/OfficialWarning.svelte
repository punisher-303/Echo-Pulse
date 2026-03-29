<script>
	export let repo; 
</script>

<div class="sticky top-[108px] z-30 bg-[#fffbf0] border-b border-[#f0d89a] px-5 md:px-10 py-3 shadow-[0_10px_25px_rgba(0,0,0,0.08)]">
	<div class="max-w-[1040px] mx-auto flex items-start sm:items-center gap-3 flex-col sm:flex-row">
		<div class="flex items-center gap-2 shrink-0">
			<span class="font-mono text-[9px] tracking-[0.1em] uppercase bg-c-gn text-white px-2 py-0.5 rounded-full shrink-0">Official</span>
		</div>
		<p class="font-sans text-[12px] text-c-t2 leading-[1.5] m-0">
			<strong class="text-c-t1 font-normal">Echo Pulse is open-source.</strong> 
			Verify downloads only from <a href="https://github.com/{repo}/releases/latest" target="_blank" rel="noopener noreferrer" class="text-c-pk underline underline-offset-2 hover:text-c-pk-d transition-colors">GitHub</a> or official mirrors to ensure your security.
		</p>
	</div>
</div>
