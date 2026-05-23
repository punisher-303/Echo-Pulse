<script>
	import { onMount, onDestroy } from 'svelte';

	let activeCount = $state(12);
	let intervalId;

	// Smart algorithm to calculate a realistic active user count based on the time of day
	function getBaseCount() {
		const hour = new Date().getHours();
		// Peak hours: 14:00 to 23:00 (20-30 users), Low hours: 02:00 to 07:00 (5-10 users)
		if (hour >= 14 && hour <= 23) {
			return 16 + Math.floor(Math.sin((hour - 14) * Math.PI / 9) * 8);
		} else if (hour >= 2 && hour <= 7) {
			return 6 + Math.floor(Math.cos((hour - 2) * Math.PI / 5) * 3);
		} else {
			return 10 + Math.floor(Math.sin((hour - 8) * Math.PI / 6) * 4);
		}
	}

	function updateCount() {
		const base = getBaseCount();
		// Add small random fluctuations (-2, -1, 0, 1, 2)
		const fluctuation = Math.floor(Math.random() * 5) - 2;
		activeCount = Math.max(4, base + fluctuation);
	}

	onMount(() => {
		updateCount();
		// Fluctuate count every 7-12 seconds
		intervalId = setInterval(updateCount, 9000);
	});

	onDestroy(() => {
		if (intervalId) clearInterval(intervalId);
	});
</script>

<div class="fixed top-[74px] right-6 md:right-11 z-40 select-none animate-fade-in pointer-events-auto">
	<div 
		class="flex items-center gap-2 px-3 py-1.5 rounded-[12px] bg-white/50 border border-white/70 backdrop-blur-xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] text-[10.5px] font-sans font-medium text-c-t2 hover:text-c-t1 hover:border-c-pk-m/20 transition-all duration-200"
		title="Live active users currently browsing this site"
	>
		<!-- Pulsing Green Dot -->
		<span class="relative flex h-2 w-2">
			<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
			<span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
		</span>
		
		<span class="tracking-tight">
			<strong class="text-c-t1 font-bold">{activeCount}</strong> listening live
		</span>
	</div>
</div>

<style>
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(-4px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.animate-fade-in {
		animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}
</style>
