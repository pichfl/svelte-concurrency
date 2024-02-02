<script lang="ts">
	import { task, timeout, drop } from '$lib/concurrency/index.js';

	export let count = 0;

	let countTask = task({
		trackState: true,
		policy: drop,
		*perform(n: number) {
			count = n;
			while (count-- > 1) {
				yield timeout(100);
			}

			return Math.floor(Math.random() * 100);
		}
	});
</script>

<p>Count: <input readonly value={count} /></p>

<p>
	<button type="button" on:click={() => countTask.perform(100)}>
		{$countTask.isRunning ? 'Running...' : 'Click Me'}
	</button>

	<button type="button" on:click={() => countTask.cancelAll()}>Cancel</button>
</p>

{console.log(countTask)}

{#if $countTask.lastSuccessful}
	<p>
		The last value returned from countTask was
		{$countTask.lastSuccessful.value}
	</p>
{/if}
