<script>
    import { onMount } from 'svelte/internal';
    import Header from './components/Header';
    import Footer from './components/Footer/index';
    import { getCurrentTime } from './utils/time';

    $: time = getCurrentTime();

    onMount(() => {
		const interval = setInterval(() => {
			time = getCurrentTime();
		}, 1000);

		return () => clearInterval(interval);
	});
</script>


<Header />

<div>
    Current time is {time}
</div>

<Footer />
