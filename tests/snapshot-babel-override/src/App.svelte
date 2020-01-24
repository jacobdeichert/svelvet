<script>
    import { onMount } from 'svelte/internal';
    import Header from './components/Header';
    onMount(() => {
        console.log(`mounted`);
    });
</script>

<Header />
