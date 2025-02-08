<script>
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { onMount, onDestroy } from 'svelte';

  const scrollProgress = tweened(0, {
    duration: 400,
    easing: cubicOut
  });

  const updateScrollProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(Math.max((scrollTop / docHeight) * 100, 0), 100);
    scrollProgress.set(progress);
  };

  onMount(() => {
    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Initial call
  });
  
  onDestroy(() => {
    window.removeEventListener('scroll', updateScrollProgress);
  });
</script>

<div class="progress-bar" style="width: {$scrollProgress}%;"></div>

<nav>
  <ul>
    <li><a href="#projects">Projects</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>

<style>
  .progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    height: 5px;
    background: linear-gradient(90deg, rgba(0, 157, 255, 0.8), rgba(0, 157, 255, 0.4));
    box-shadow: 0 0 10px rgba(0, 157, 255, 0.3);
    z-index: 1001;
    will-change: width;
    transform: translateZ(0);
  }

  nav {
    position: fixed;
    top: 10px;
    right: 20px;
    z-index: 1000;
  }

  nav ul {
    list-style: none;
    display: flex;
    gap: 20px;
    padding: 0;
    margin: 0;
  }

  nav a {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.8);
    font-weight: bold;
    position: relative; 
    padding: 5px 10px;
    transition: all 0.3s ease;
    text-shadow: 0 0 10px rgba(0, 157, 255, 0.3);
  }

  nav a::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -3px; 
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, rgba(0, 157, 255, 0.8), rgba(0, 157, 255, 0.2));
    transition: width 0.3s ease-out;
    box-shadow: 0 0 10px rgba(0, 157, 255, 0.5);
  }

  nav a:hover {
    transform: scale(1.1);
    color: rgba(0, 157, 255, 1);
    text-shadow: 0 0 15px rgba(0, 157, 255, 0.5);
  }

  nav a:hover::after {
    width: 100%;
  }
</style>