<script>
  import { onMount } from 'svelte';
  import Navbar from './components/Navbar.svelte';
  import Hero from './components/Hero.svelte';
  import ScrollIndicator from './components/ScrollIndicator.svelte';
  import Skills from './components/Skills.svelte';
  import Loading from './components/Loading.svelte';
  import './styles/global.css';

  let showScrollIndicator = true;
  let mouseX = 0;
  let mouseY = 0;
  let isLoading = true;

  function handleLoadingComplete() {
    isLoading = false;
  }

  onMount(() => {
    window.addEventListener('scroll', () => {
      showScrollIndicator = window.pageYOffset < 100;
    });

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      document.documentElement.style.setProperty('--mouse-x', `${mouseX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${mouseY}px`);
    });
  });
</script>

{#if isLoading}
  <Loading onLoadingComplete={handleLoadingComplete} />
{:else}
  <div class="cursor-gradient"></div>
  <Navbar />
  <div id="home">
    <Hero />
  </div>

  {#if showScrollIndicator}
    <ScrollIndicator />
  {/if}

  <Skills />
{/if}