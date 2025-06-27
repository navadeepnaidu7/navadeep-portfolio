<script>
  import { onMount } from 'svelte';
  import Navbar from './components/Navbar.svelte';
  import Hero from './components/Hero.svelte';
  import ScrollIndicator from './components/ScrollIndicator.svelte';
  import Experience from './components/Experience.svelte';
  import Skills from './components/Skills.svelte';
  import Projects from './components/Projects.svelte';
  import Loading from './components/Loading.svelte';
  import Footer from './components/Footer.svelte';
  import './styles/global.css';

  let showScrollIndicator = true;
  
  let isLoading = true;

  function handleLoadingComplete() {
    isLoading = false;
  }

  onMount(() => {
    window.addEventListener('scroll', () => {
      showScrollIndicator = window.pageYOffset < 100;
    });

    
  });
</script>

{#if isLoading}
  <Loading onLoadingComplete={handleLoadingComplete} />
{:else}
  <div class="app-container">
    
    <Navbar />
    <main>
      <div id="home">
        <Hero />
      </div>

      {#if showScrollIndicator}
        <ScrollIndicator />
      {/if}

      <Experience />
      <Skills />
      <Projects />
    </main>
    <Footer />
  </div>
{/if}

<style>
  .app-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1;
  }
</style>