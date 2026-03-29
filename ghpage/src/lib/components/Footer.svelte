<script>
	import { base } from '$app/paths';
</script>

<div class="h-[1px] bg-c-b1"></div>
<div style="max-width:1100px;margin:0 auto" class="px-5 md:px-10">
	<footer class="py-7 flex flex-col sm:flex-row justify-between items-center gap-4">
		<div class="flex items-center gap-2.5 flex-wrap justify-center sm:justify-start">
			<a href="{base}/" class="flex items-center gap-2 no-underline group shrink-0">
				<span class="font-serif text-[14px] font-normal tracking-[-0.025em] text-c-t1 whitespace-nowrap">
					Echo<em class="not-italic text-c-pk">Pulse</em>
				</span>
			</a>
			<span class="font-sans text-[12px] text-c-t3">·</span>
			<span class="font-sans text-[12px] text-c-t3 flex items-center gap-1.5" style="line-height:1">
				Made with
				<svg width="12" height="11" viewBox="0 0 22 20" fill="var(--color-c-pk)" style="display:inline-block;vertical-align:middle;flex-shrink:0;overflow:visible" aria-hidden="true">
					<path d="M11 19C11 19 1 13 1 6.5a5.5 5.5 0 0110-3.1A5.5 5.5 0 0121 6.5C21 13 11 19 11 19z"></path>
				</svg>
				by
				<a href="https://github.com/punisher-303" target="_blank" rel="noopener noreferrer" class="text-c-t2 hover:text-c-pk transition-colors no-underline">
					Anand
				</a>
			</span>
		</div>
		
		<div class="flex flex-wrap gap-4 justify-center sm:justify-end">
			<a href="{base}/#apps" class="font-sans text-[12px] text-c-t3 no-underline hover:text-c-t2 transition-colors">Apps</a>
			<a href="{base}/echopulse#features" class="font-sans text-[12px] text-c-t3 no-underline hover:text-c-t2 transition-colors">Features</a>
			<a href="{base}/#about" class="font-sans text-[12px] text-c-t3 no-underline hover:text-c-t2 transition-colors">About</a>
			<a href="https://github.com/punisher-303/ECHOPULS" target="_blank" rel="noopener noreferrer" class="font-sans text-[12px] text-c-t3 no-underline hover:text-c-t2 transition-colors">GitHub</a>
		</div>
	</footer>
</div>

