<script>
	import { onMount } from 'svelte';

	let activeTab = 'features'; // 'features' | 'setup' | 'api'
	let copiedText = '';

	const codeBlocks = {
		env: 'SP_DC=your_sp_dc_cookie_here\nPORT=3000',
		clone: 'git clone https://github.com/punisher-303/spotify-video.git\ncd spotify-video\nnpm install',
		apiResponse: `{
  "data": {
    "canvasesList": [
      {
        "id": "32b57cbf354b453a95eee32bb04d4e42",
        "canvasUrl": "https://canvaz.scdn.co/upload/licensor/...video.mp4",
        "trackUri": "spotify:track:3OHfY25tqY28d16oZczHc8",
        "artist": {
          "artistName": "SZA"
        }
      }
    ]
  }
}`
	};

	function copyToClipboard(text, id) {
		navigator.clipboard.writeText(text);
		copiedText = id;
		setTimeout(() => {
			copiedText = '';
		}, 2000);
	}
</script>

<section id="spotify-canvas" class="py-[84px] px-5 md:px-8 max-w-[1040px] mx-auto scroll-mt-[100px]">
	<div class="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.18em] uppercase text-c-t3 mb-9">
		<div class="w-[14px] h-[2px] bg-c-pk rounded-sm"></div>
		Dynamic Visualizers
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
		<!-- Left: Text Fold -->
		<div class="lg:col-span-5">
			<h2 class="font-serif text-[clamp(32px,3.8vw,48px)] font-light tracking-[-0.04em] leading-[1.05] text-c-t1 mb-4">
				Immersive <em class="italic text-c-pk">Spotify Canvas</em> looping visuals.
			</h2>
			<p class="font-sans text-[14px] text-c-t2 leading-[1.78] mb-6">
				Echo Pulse integrates our custom companion **Spotify Canva API** to extract and stream the official looping high-definition background videos for your playing tracks. 
			</p>

			<!-- Feature Sub-bullets -->
			<div class="space-y-4 mb-8">
				<div class="flex gap-3 items-start">
					<div class="w-[26px] h-[26px] rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 text-indigo-400 mt-[2px]">
						<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
							<polygon points="5 3 19 12 5 21 5 3"/>
						</svg>
					</div>
					<div>
						<h4 class="font-sans text-[13px] font-semibold text-c-t1 mb-0.5">High-Fidelity Loops</h4>
						<p class="font-sans text-[11.5px] leading-[1.5] text-c-t2">Plays smooth, borderless background visualizers behind your synced lyrics dynamically.</p>
					</div>
				</div>

				<div class="flex gap-3 items-start">
					<div class="w-[26px] h-[26px] rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400 mt-[2px]">
						<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
							<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
						</svg>
					</div>
					<div>
						<h4 class="font-sans text-[13px] font-semibold text-c-t1 mb-0.5">Custom Protobuf Decoding</h4>
						<p class="font-sans text-[11.5px] leading-[1.5] text-c-t2">Communicates via compiled protocol buffers with internal backends for speed and security.</p>
					</div>
				</div>

				<div class="flex gap-3 items-start">
					<div class="w-[26px] h-[26px] rounded-full bg-c-pk-l/30 border border-c-pk-m/20 flex items-center justify-center shrink-0 text-c-pk mt-[2px]">
						<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
							<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
						</svg>
					</div>
					<div>
						<h4 class="font-sans text-[13px] font-semibold text-c-t1 mb-0.5">Self-Hostable Microservice</h4>
						<p class="font-sans text-[11.5px] leading-[1.5] text-c-t2">Deploy your own private bridge server on Vercel, Render, or Deno for direct streaming.</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Right: Interactive Code Console Tabbed Box -->
		<div class="lg:col-span-7 bg-c-s1 border-c-b1 border-[1.5px] rounded-[18px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
			<!-- Console Header / Tabs -->
			<div class="bg-neutral-900/60 border-b border-c-b1 px-4 py-3 flex items-center justify-between gap-4">
				<div class="flex items-center gap-1.5 shrink-0">
					<div class="w-3 h-3 rounded-full bg-red-500/70"></div>
					<div class="w-3 h-3 rounded-full bg-yellow-500/70"></div>
					<div class="w-3 h-3 rounded-full bg-green-500/70"></div>
				</div>
				
				<!-- Tabs Navigation -->
				<div class="flex bg-neutral-950/80 border border-neutral-800/80 rounded-lg p-0.5 text-[11px] font-mono">
					<button 
						class="px-3 py-1 rounded-md transition-colors cursor-pointer {activeTab === 'features' ? 'bg-neutral-800 text-white font-medium' : 'text-neutral-400 hover:text-neutral-200'}"
						onclick={() => activeTab = 'features'}
					>
						Architecture
					</button>
					<button 
						class="px-3 py-1 rounded-md transition-colors cursor-pointer {activeTab === 'setup' ? 'bg-neutral-800 text-white font-medium' : 'text-neutral-400 hover:text-neutral-200'}"
						onclick={() => activeTab = 'setup'}
					>
						Setup Server
					</button>
					<button 
						class="px-3 py-1 rounded-md transition-colors cursor-pointer {activeTab === 'api' ? 'bg-neutral-800 text-white font-medium' : 'text-neutral-400 hover:text-neutral-200'}"
						onclick={() => activeTab = 'api'}
					>
						API Endpoint
					</button>
				</div>
			</div>

			<!-- Tab Content Areas -->
			<div class="p-5 font-mono text-[11.5px] text-neutral-300 leading-relaxed min-h-[290px] flex flex-col justify-between bg-neutral-950/40">
				{#if activeTab === 'features'}
					<div class="space-y-4">
						<div class="text-neutral-500 border-b border-neutral-800/60 pb-2 mb-2 uppercase text-[9px] tracking-widest font-bold">
							Canvas Streaming Flow
						</div>
						
						<!-- Interactive flow diagram with real vector SVGs -->
						<div class="flex flex-col sm:flex-row items-stretch gap-4 py-4 justify-between">
							<div class="flex-1 bg-neutral-900/50 border border-neutral-800/80 p-3 rounded-lg text-center flex flex-col items-center justify-center">
								<svg class="w-6 h-6 text-c-pk mb-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
								</svg>
								<span class="text-white text-[11px] font-semibold">1. Track Query</span>
								<span class="text-neutral-500 text-[9px] mt-0.5">Track ID / URI</span>
							</div>

							<div class="flex items-center justify-center shrink-0">
								<svg class="w-4 h-4 text-neutral-600 rotate-90 sm:rotate-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
									<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
								</svg>
							</div>

							<div class="flex-1 bg-neutral-900/50 border border-neutral-800/80 p-3 rounded-lg text-center flex flex-col items-center justify-center">
								<svg class="w-6 h-6 text-indigo-400 mb-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>
								</svg>
								<span class="text-white text-[11px] font-semibold">2. Canva Server</span>
								<span class="text-neutral-500 text-[9px] mt-0.5">Protobuf Request</span>
							</div>

							<div class="flex items-center justify-center shrink-0">
								<svg class="w-4 h-4 text-neutral-600 rotate-90 sm:rotate-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
									<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
								</svg>
							</div>

							<div class="flex-1 bg-neutral-900/50 border border-neutral-800/80 p-3 rounded-lg text-center flex flex-col items-center justify-center">
								<svg class="w-6 h-6 text-emerald-400 mb-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
								</svg>
								<span class="text-white text-[11px] font-semibold">3. Video Stream</span>
								<span class="text-neutral-500 text-[9px] mt-0.5">Direct Loop MP4</span>
							</div>
						</div>

						<p class="text-neutral-400 text-[11px] leading-relaxed">
							By bridging the app directly with the self-contained Node.js gateway server, Echo Pulse parses the internal video descriptors to deliver a visually engaging, dynamic media session instantly without external track ads or heavy API quotas.
						</p>
					</div>

				{:else if activeTab === 'setup'}
					<div class="space-y-4">
						<div class="flex items-center justify-between border-b border-neutral-800/60 pb-2">
							<span class="text-neutral-500 uppercase text-[9px] tracking-widest font-bold">1. Install & Deploy</span>
							<button 
								class="px-2 py-0.5 rounded text-[10px] bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
								onclick={() => copyToClipboard(codeBlocks.clone, 'clone')}
							>
								{copiedText === 'clone' ? 'Copied ✓' : 'Copy'}
							</button>
						</div>
						<pre class="bg-neutral-950 p-3.5 rounded-lg border border-neutral-900 overflow-x-auto text-[11px] text-indigo-300 leading-normal">{codeBlocks.clone}</pre>

						<div class="flex items-center justify-between border-b border-neutral-800/60 pb-2 mt-4">
							<span class="text-neutral-500 uppercase text-[9px] tracking-widest font-bold">2. Set Environment Variables (.env)</span>
							<button 
								class="px-2 py-0.5 rounded text-[10px] bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
								onclick={() => copyToClipboard(codeBlocks.env, 'env')}
							>
								{copiedText === 'env' ? 'Copied ✓' : 'Copy'}
							</button>
						</div>
						<pre class="bg-neutral-950 p-3.5 rounded-lg border border-neutral-900 overflow-x-auto text-[11px] text-emerald-300 leading-normal">{codeBlocks.env}</pre>
					</div>

				{:else}
					<div class="space-y-4">
						<div class="flex items-center justify-between border-b border-neutral-800/60 pb-2">
							<span class="text-neutral-500 uppercase text-[9px] tracking-widest font-bold">GET /api/canvas?trackId=[id]</span>
							<button 
								class="px-2 py-0.5 rounded text-[10px] bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
								onclick={() => copyToClipboard(codeBlocks.apiResponse, 'response')}
							>
								{copiedText === 'response' ? 'Copied ✓' : 'Copy'}
							</button>
						</div>
						<pre class="bg-neutral-950 p-3.5 rounded-lg border border-neutral-900 overflow-x-auto text-[10.5px] text-neutral-400 max-h-[220px] leading-tight">{codeBlocks.apiResponse}</pre>
					</div>
				{/if}

				<!-- Footer of the console -->
				<div class="border-t border-neutral-900/80 pt-3 mt-4 flex items-center justify-between text-[10px] text-neutral-500">
					<span>Gateway Status: Operational</span>
					<span>punisher-303/spotify-video</span>
				</div>
			</div>
		</div>
	</div>
</section>
