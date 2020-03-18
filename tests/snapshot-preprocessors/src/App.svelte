<script lang="typescript">
    import { onMount } from 'svelte/internal';
    import Header from './components/Header';
    import Footer from '/components/Footer/index'; // Absolute imports will get prefixed with the dist directory
    import { getCurrentTime } from './utils/time';

    $: time = getCurrentTime();

    onMount(() => {
        const interval = setInterval(() => {
            time = getCurrentTime();
        }, 1000);

        return () => clearInterval(interval);
    });

    const urlText: string = 'click here';
</script>


<template lang="pug">
    div Posts
    a(href="/#") {urlText}
</template>

<Header />

<div>
    Current time is {time}
</div>

<Footer />
