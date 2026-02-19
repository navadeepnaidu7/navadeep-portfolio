<script>
  import { onMount } from "svelte";
  import Navbar from "./components/Navbar.svelte";
  import Hero from "./components/Hero.svelte";
  import About from "./components/About.svelte";
  import ScrollIndicator from "./components/ScrollIndicator.svelte";
  import Experience from "./components/Experience.svelte";
  import Skills from "./components/Skills.svelte";
  import Loading from "./components/Loading.svelte";
  import Footer from "./components/Footer.svelte";
  import "./styles/global.css";

  let showScrollIndicator = true;
  let isLoading = true;

  function handleLoadingComplete() {
    isLoading = false;
  }

  onMount(() => {
    window.addEventListener("scroll", () => {
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

      <About />
      <Experience />
      <Skills />
    </main>
    <Footer />
  </div>
{/if}

<style>
  .app-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-x: hidden;
  }

  main {
    flex: 1;
    width: 100%;
  }

  @media (max-width: 768px) {
    .app-container {
      min-height: 100vh;
    }
  }
</style>
