<script>
  import Navbar from './components/Navbar.svelte';
  import Hero from './components/Hero.svelte';
  import Projects from './components/Projects.svelte';
  import About from './components/About.svelte';
  import Contact from './components/Contact.svelte';
  import ScrollToTop from './components/ScrollToTop.svelte';
  import './styles/global.css';

  let name = "Navadeep Naidu";
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
<ScrollToTop />