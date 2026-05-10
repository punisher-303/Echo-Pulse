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
	<!-- Category Tag -->
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
		<div class="lg:col-span-7 bg-[#121115] border-neutral-800 border-[1.5px] rounded-[18px] overflow-hidden shadow-[0_24px_50px_-10px_rgba(0,0,0,0.6)] relative group">
			<!-- Glass Ambient Backdrop Accent -->
			<div class="absolute top-0 right-0 w-[150px] h-[150px] bg-gradient-to-br from-c-pk/10 to-indigo-500/10 rounded-full blur-[80px] pointer-events-none"></div>

			<!-- Console Header / Tabs -->
			<div class="bg-[#18171d] border-b border-neutral-800/80 px-4 py-3 flex items-center justify-between gap-4">
				<div class="flex items-center gap-1.5 shrink-0">
					<div class="w-2.5 h-2.5 rounded-full bg-red-500/70"></div>
					<div class="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></div>
					<div class="w-2.5 h-2.5 rounded-full bg-green-500/70"></div>
				</div>
				
				<!-- Tabs Navigation -->
				<div class="flex bg-neutral-950/80 border border-neutral-800/80 rounded-lg p-0.5 text-[11px] font-mono">
					<button 
						class="px-3 py-1 rounded-md transition-all cursor-pointer {activeTab === 'features' ? 'bg-neutral-800 text-white font-medium shadow' : 'text-neutral-400 hover:text-neutral-200'}"
						onclick={() => activeTab = 'features'}
					>
						Architecture
					</button>
					<button 
						class="px-3 py-1 rounded-md transition-all cursor-pointer {activeTab === 'setup' ? 'bg-neutral-800 text-white font-medium shadow' : 'text-neutral-400 hover:text-neutral-200'}"
						onclick={() => activeTab = 'setup'}
					>
						Setup Server
					</button>
					<button 
						class="px-3 py-1 rounded-md transition-all cursor-pointer {activeTab === 'api' ? 'bg-neutral-800 text-white font-medium shadow' : 'text-neutral-400 hover:text-neutral-200'}"
						onclick={() => activeTab = 'api'}
					>
						API Endpoint
					</button>
				</div>
			</div>

			<!-- Tab Content Areas -->
			<div class="p-5 font-mono text-[11.5px] text-neutral-300 leading-relaxed min-h-[350px] flex flex-col justify-between bg-neutral-950/20 relative">
				{#if activeTab === 'features'}
					<div class="space-y-4 w-full">
						<div class="text-neutral-400 border-b border-neutral-800/60 pb-2 mb-2 uppercase text-[9px] tracking-widest font-bold flex items-center gap-2">
							<span class="w-2 h-2 rounded-full bg-c-pk animate-pulse"></span>
							Canvas Streaming Flow System
						</div>
						
						<!-- Spectacular visual spectrum flow chart connector timeline -->
						<div class="relative flex flex-col gap-4 py-4 w-full">
							
							<!-- Vertical connecting gradient spectrum line for mobile, horizontal for desktop -->
							<div class="absolute left-6 top-[28px] bottom-[28px] w-0.5 bg-gradient-to-b from-c-pk via-indigo-400 to-emerald-400 md:left-[40px] md:right-[40px] md:top-[44px] md:h-0.5 md:w-auto md:bg-gradient-to-r pointer-events-none z-0 opacity-70"></div>

							<div class="flex flex-col md:flex-row items-stretch gap-5 justify-between relative z-10 perspective-3d">
								<!-- STEP 1 CARD (3D POPUP & FLOAT) -->
								<div class="flex-1 bg-white/[0.03] hover-3d-card float-3d-slow border border-white/5 hover:border-c-pk/20 p-3.5 rounded-xl transition-all duration-300 flex md:flex-col items-start md:items-center gap-3 text-left md:text-center relative" style="animation-delay: 0s">
									<!-- Number Stamp -->
									<div class="absolute top-2 right-3 font-mono text-[10px] font-bold text-c-pk bg-c-pk/10 px-1.5 py-0.2 rounded layer-3d-front">01</div>
									<!-- Icon Circle -->
									<div class="w-[36px] h-[36px] rounded-full bg-c-pk/15 border border-c-pk/35 flex items-center justify-center text-c-pk shrink-0 relative layer-3d-deep">
										<svg class="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
										</svg>
										<!-- Pulse beacon dot -->
										<span class="absolute -top-0.5 -right-0.5 w-2 h-2 bg-c-pk rounded-full animate-ping"></span>
									</div>
									<div class="min-w-0 layer-3d-front">
										<span class="text-white text-[12px] font-semibold block md:mt-2">Track Query</span>
										<span class="text-neutral-400 text-[10px] mt-1 block">Echo Pulse parses the currently playing Track URI or ID.</span>
										<span class="text-[9px] font-mono text-neutral-500 bg-neutral-900 px-1.5 py-0.5 rounded mt-2 inline-block">track:3OHfY25...</span>
									</div>
								</div>

								<!-- STEP 2 CARD (3D POPUP & FLOAT) -->
								<div class="flex-1 bg-white/[0.03] hover-3d-card float-3d-slow border border-white/5 hover:border-indigo-500/20 p-3.5 rounded-xl transition-all duration-300 flex md:flex-col items-start md:items-center gap-3 text-left md:text-center relative" style="animation-delay: 0.25s">
									<!-- Number Stamp -->
									<div class="absolute top-2 right-3 font-mono text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-1.5 py-0.2 rounded layer-3d-front">02</div>
									<!-- Icon Circle -->
									<div class="w-[36px] h-[36px] rounded-full bg-indigo-500/15 border border-indigo-500/35 flex items-center justify-center text-indigo-400 shrink-0 relative layer-3d-deep">
										<svg class="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>
										</svg>
									</div>
									<div class="min-w-0 layer-3d-front">
										<span class="text-white text-[12px] font-semibold block md:mt-2">Canva Gateway</span>
										<span class="text-neutral-400 text-[10px] mt-1 block">Companion microservice uses protobuf to resolve Canvas URL.</span>
										<span class="text-[9px] font-mono text-neutral-500 bg-neutral-900 px-1.5 py-0.5 rounded mt-2 inline-block">Protobuf Decoded</span>
									</div>
								</div>

								<!-- STEP 3 CARD (3D POPUP & FLOAT) -->
								<div class="flex-1 bg-white/[0.03] hover-3d-card float-3d-slow border border-white/5 hover:border-emerald-500/20 p-3.5 rounded-xl transition-all duration-300 flex md:flex-col items-start md:items-center gap-3 text-left md:text-center relative" style="animation-delay: 0.5s">
									<!-- Number Stamp -->
									<div class="absolute top-2 right-3 font-mono text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded layer-3d-front">03</div>
									<!-- Icon Circle -->
									<div class="w-[36px] h-[36px] rounded-full bg-emerald-500/15 border border-emerald-500/35 flex items-center justify-center text-emerald-400 shrink-0 relative layer-3d-deep">
										<svg class="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
										</svg>
										<!-- Green beacon dot -->
										<span class="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
									</div>
									<div class="min-w-0 layer-3d-front">
										<span class="text-white text-[12px] font-semibold block md:mt-2">Looping Stream</span>
										<span class="text-neutral-400 text-[10px] mt-1 block">MP4 file streams securely to the mobile player instantly.</span>
										<span class="text-[9px] font-mono text-neutral-500 bg-neutral-900 px-1.5 py-0.5 rounded mt-2 inline-block">canvaz.scdn.co/..</span>
									</div>
								</div>
							</div>
						</div>

						<p class="text-neutral-400 text-[12px] leading-relaxed font-sans mt-2">
							By bridging the app directly with the self-contained Node.js gateway server, Echo Pulse parses the internal video descriptors to deliver a visually engaging, dynamic media session instantly without external track ads or heavy API quotas.
						</p>
					</div>

				{:else if activeTab === 'setup'}
					<div class="space-y-4">
						<div class="flex items-center justify-between border-b border-neutral-800/60 pb-2">
							<span class="text-neutral-500 uppercase text-[9px] tracking-widest font-bold">1. Install & Deploy</span>
							<button 
								class="px-2.5 py-0.5 rounded text-[10px] bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-mono"
								onclick={() => copyToClipboard(codeBlocks.clone, 'clone')}
							>
								{copiedText === 'clone' ? 'Copied ✓' : 'Copy'}
							</button>
						</div>
						<pre class="bg-neutral-950 p-3.5 rounded-lg border border-neutral-900 overflow-x-auto text-[11px] text-indigo-300 leading-normal">{codeBlocks.clone}</pre>

						<div class="flex items-center justify-between border-b border-neutral-800/60 pb-2 mt-4">
							<span class="text-neutral-500 uppercase text-[9px] tracking-widest font-bold">2. Set Environment Variables (.env)</span>
							<button 
								class="px-2.5 py-0.5 rounded text-[10px] bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-mono"
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
								class="px-2.5 py-0.5 rounded text-[10px] bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-mono"
								onclick={() => copyToClipboard(codeBlocks.apiResponse, 'response')}
							>
								{copiedText === 'response' ? 'Copied ✓' : 'Copy'}
							</button>
						</div>
						<pre class="bg-neutral-950 p-3.5 rounded-lg border border-neutral-900 overflow-x-auto text-[10.5px] text-neutral-400 max-h-[240px] leading-tight">{codeBlocks.apiResponse}</pre>
					</div>
				{/if}

				<!-- Footer of the console -->
				<div class="border-t border-neutral-800/80 pt-3 mt-4 flex items-center justify-between text-[10px] text-neutral-500">
					<span class="flex items-center gap-1.5">
						<span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
						Gateway Status: Operational
					</span>
					<span>punisher-303/spotify-video</span>
				</div>
			</div>
		</div>
	</div>
</section>
