<script>
  import { onMount } from 'svelte';
  import Navbar from './components/Navbar.svelte';
  import Hero from './components/Hero.svelte';
  import Projects from './components/Projects.svelte';
  import About from './components/About.svelte';
  import Contact from './components/Contact.svelte';
  import ScrollIndicator from './components/ScrollIndicator.svelte';
  import './styles/global.css';

  let name = "Navadeep Naidu";
  let showScrollIndicator = true;

  onMount(() => {
    window.addEventListener('scroll', () => {
      showScrollIndicator = window.pageYOffset < 100;
    });
  });
</script>

<Navbar />
<div id="home">
  <Hero {name} />
</div>
<div id="projects">
  <Projects />
</div>
<div id="about">
  <About />
</div>
<div id="contact">
  <Contact />
</div>

{#if showScrollIndicator}
  <ScrollIndicator />
{/if}