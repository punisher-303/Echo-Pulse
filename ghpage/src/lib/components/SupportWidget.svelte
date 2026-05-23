<script>
	import { onMount } from 'svelte';

	// Placeholder Webhook URL (Paste your copied webhook URL here)
	const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1494932524604985444/6UT3cI9tcowf4frIQVyvU2NVUhiF30GdWsLqtTBERXVXhi__97Gvb5tea1foNQiVLpbW";

	// Svelte 5 state runes
	let isOpen = $state(false);
	let name = $state("");
	let contact = $state("");
	let topic = $state("Bug Report");
	let issue = $state("");
	
	let isSubmitting = $state(false);
	let showToast = $state(false);
	let toastType = $state("success"); // "success" or "error"
	let toastMessage = $state("");

	function toggleWidget() {
		isOpen = !isOpen;
	}

	function closeWidget() {
		isOpen = false;
	}

	// Trigger custom toast notification
	function triggerToast(message, type = "success") {
		toastMessage = message;
		toastType = type;
		showToast = true;
		setTimeout(() => {
			showToast = false;
		}, 4000);
	}

	async function handleSubmit(e) {
		e.preventDefault();
		
		if (!issue.trim()) {
			triggerToast("Please describe your issue or feedback.", "error");
			return;
		}

		if (!DISCORD_WEBHOOK_URL || DISCORD_WEBHOOK_URL === "YOUR_DISCORD_WEBHOOK_URL") {
			triggerToast("Webhook URL not configured yet. Please configure it in the code.", "error");
			return;
		}

		isSubmitting = true;

		// Format a professional Discord Rich Embed payload
		const payload = {
			username: "Echo Pulse Helpdesk",
			avatar_url: "https://raw.githubusercontent.com/punisher-303/Echo-Pulse/main/assets/icon.png", // Fallback to an icon
			embeds: [
				{
					title: "📥 New Support Ticket Received",
					color: 14700394, // HEX #E04F6A as integer (primary brand pink)
					fields: [
						{
							name: "👤 Submitter Name",
							value: name.trim() || "*Anonymous*",
							inline: true
						},
						{
							name: "📧 Contact Info",
							value: contact.trim() || "*None provided*",
							inline: true
						},
						{
							name: "🏷️ Topic",
							value: topic,
							inline: true
						},
						{
							name: "📝 Issue Description",
							value: issue.trim()
						}
					],
					footer: {
						text: "Echo Pulse Web Portal · User Feedback System"
					},
					timestamp: new Date().toISOString()
				}
			]
		};

		try {
			const response = await fetch(DISCORD_WEBHOOK_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(payload)
			});

			if (response.ok || response.status === 204) {
				triggerToast("Thank you! Your support ticket has been submitted to Anand.");
				// Reset form fields
				name = "";
				contact = "";
				topic = "Bug Report";
				issue = "";
				closeWidget();
			} else {
				throw new Error("Discord API rejected request");
			}
		} catch (error) {
			console.error("Support widget submission error:", error);
			triggerToast("Failed to send ticket. Please try again later.", "error");
		} finally {
			isSubmitting = false;
		}
	}
</script>

<!-- Floating Support Widget Container -->
<div class="fixed bottom-6 right-6 z-[200] font-sans">
	<!-- Floating Action Button (FAB) -->
	<button
		type="button"
		class="w-[52px] h-[52px] rounded-full bg-c-pk text-white flex items-center justify-center shadow-[0_4px_16px_rgba(224,79,106,0.38)] hover:shadow-[0_8px_24px_rgba(224,79,106,0.45)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer border-none relative group"
		onclick={toggleWidget}
		aria-label="Contact Support"
		aria-expanded={isOpen}
	>
		{#if isOpen}
			<i class="fa-solid fa-xmark text-[20px] transition-transform duration-200 rotate-90"></i>
		{:else}
			<i class="fa-solid fa-headset text-[20px] transition-all duration-200 group-hover:scale-105"></i>
		{/if}
		
		<!-- Subtle pulse ring when closed -->
		{#if !isOpen}
			<span class="absolute inset-0 rounded-full border-2 border-c-pk animate-ping opacity-[0.25] pointer-events-none"></span>
		{/if}
	</button>

	<!-- Support Form Popup Modal -->
	{#if isOpen}
		<div
			class="absolute bottom-16 right-0 w-[335px] max-w-[calc(100vw-32px)] border border-white/70 bg-[#faf8f4]/95 backdrop-blur-[24px] rounded-[24px] shadow-[0_12px_40px_rgba(0,0,0,0.06)] p-5 flex flex-col gap-4 animate-fade-scale z-10"
		>
			<div class="flex flex-col gap-1 pr-6 relative">
				<h3 class="font-serif text-[18px] font-normal tracking-[-0.025em] text-c-t1">
					Admin <em class="italic text-c-pk">Support</em>
				</h3>
				<p class="text-[11px] text-c-t3 leading-normal">
					Describe your issue below. Anand will receive this directly in his Discord server.
				</p>
			</div>

			<form onsubmit={handleSubmit} class="flex flex-col gap-3.5 mt-1">
				<!-- Name field -->
				<div class="flex flex-col gap-1.5">
					<label for="support-name" class="font-mono text-[9px] uppercase tracking-wider text-c-t3 font-semibold">Your Name</label>
					<input
						type="text"
						id="support-name"
						bind:value={name}
						placeholder="John Doe"
						disabled={isSubmitting}
						class="w-full h-9 px-3 rounded-[10px] bg-white/50 border border-c-b1 focus:border-c-pk-m/60 focus:bg-white text-[12.5px] text-c-t1 transition-all outline-none"
					/>
				</div>

				<!-- Contact Field -->
				<div class="flex flex-col gap-1.5">
					<label for="support-contact" class="font-mono text-[9px] uppercase tracking-wider text-c-t3 font-semibold">Contact Info</label>
					<input
						type="text"
						id="support-contact"
						bind:value={contact}
						placeholder="Email or Discord Username"
						disabled={isSubmitting}
						class="w-full h-9 px-3 rounded-[10px] bg-white/50 border border-c-b1 focus:border-c-pk-m/60 focus:bg-white text-[12.5px] text-c-t1 transition-all outline-none"
					/>
				</div>

				<!-- Topic selector -->
				<div class="flex flex-col gap-1.5">
					<label for="support-topic" class="font-mono text-[9px] uppercase tracking-wider text-c-t3 font-semibold">Topic</label>
					<div class="relative w-full">
						<select
							id="support-topic"
							bind:value={topic}
							disabled={isSubmitting}
							class="w-full h-9 px-3 rounded-[10px] bg-white/50 border border-c-b1 focus:border-c-pk-m/60 focus:bg-white text-[12.5px] text-c-t1 transition-all outline-none appearance-none cursor-pointer"
						>
							<option>Bug Report</option>
							<option>Feature Request</option>
							<option>General Support</option>
							<option>Other</option>
						</select>
						<div class="absolute inset-y-0 right-3 flex items-center pointer-events-none text-c-t3 text-[10px]">
							<i class="fa-solid fa-chevron-down"></i>
						</div>
					</div>
				</div>

				<!-- Issue Textarea -->
				<div class="flex flex-col gap-1.5">
					<label for="support-issue" class="font-mono text-[9px] uppercase tracking-wider text-c-t3 font-semibold">What's the issue? *</label>
					<textarea
						id="support-issue"
						bind:value={issue}
						placeholder="Please explain the details here..."
						rows="4"
						required
						disabled={isSubmitting}
						class="w-full p-3 rounded-[12px] bg-white/50 border border-c-b1 focus:border-c-pk-m/60 focus:bg-white text-[12.5px] text-c-t1 transition-all outline-none resize-none leading-relaxed"
					></textarea>
				</div>

				<!-- Submit Button -->
				<button
					type="submit"
					disabled={isSubmitting}
					class="w-full h-10 mt-1 rounded-[10px] bg-c-pk text-white font-sans text-[13px] font-medium transition-all hover:opacity-95 disabled:opacity-75 disabled:cursor-not-allowed hover:-translate-y-[1px] shadow-[0_2px_10px_rgba(224,79,106,0.22)] active:translate-y-0 border-none cursor-pointer flex items-center justify-center gap-1.5"
				>
					{#if isSubmitting}
						<i class="fa-solid fa-circle-notch animate-spin text-[14px]"></i>
						<span>Submitting...</span>
					{:else}
						<i class="fa-solid fa-paper-plane text-[11px]"></i>
						<span>Submit Ticket</span>
					{/if}
				</button>
			</form>
		</div>
	{/if}
</div>

<!-- Global Success/Error Notification Toast -->
{#if showToast}
	<div
		class="fixed top-6 left-1/2 -translate-x-1/2 z-[250] flex items-center gap-3 px-4.5 py-3.5 rounded-[18px] border bg-[#faf8f4]/95 backdrop-blur-[16px] shadow-[0_10px_35px_rgba(0,0,0,0.06)] animate-fade-down max-w-[90%] w-[380px]"
	>
		<div class="flex items-center justify-center w-7 h-7 rounded-full shrink-0 {toastType === 'success' ? 'bg-c-gn/12 text-c-gn' : 'bg-c-pk/12 text-c-pk'}">
			<i class={toastType === 'success' ? 'fa-solid fa-circle-check text-[15px]' : 'fa-solid fa-triangle-exclamation text-[14px]'}></i>
		</div>
		<p class="font-sans text-[12.5px] leading-tight text-c-t1 font-medium select-none pr-1">
			{toastMessage}
		</p>
	</div>
{/if}

<style>
	/* Scale-up and fade-in modal animations */
	@keyframes fadeScale {
		from {
			opacity: 0;
			transform: scale(0.96) translateY(8px);
		}
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}
	.animate-fade-scale {
		animation: fadeScale 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}

	/* Fade down toast animations */
	@keyframes fadeDown {
		from {
			opacity: 0;
			transform: translate(-50%, -15px);
		}
		to {
			opacity: 1;
			transform: translate(-50%, 0);
		}
	}
	.animate-fade-down {
		animation: fadeDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}
</style>
