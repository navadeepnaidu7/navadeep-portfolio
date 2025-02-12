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
  <div class="nav-underline"></div>
</nav>

<style>
  .progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.5);
    z-index: 1001;
    will-change: width;
    transform: translateZ(0);
  }

  nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    padding: 15px 20px;
    background: transparent;
  }

  nav ul {
    list-style: none;
    display: flex;
    gap: 40px;
    padding: 0;
    margin: 0;
    justify-content: flex-end;
    align-items: center;
  }

  nav a {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.8);
    font-weight: bold;
    position: relative; 
    padding: 5px 10px;
    transition: all 0.3s ease;
  }

  nav a::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -3px; 
    width: 0;
    height: 1.5px;
    background: rgba(255, 255, 255, 0.5);
    transition: width 0.3s ease-out;
    border-radius: 1px;
  }

  nav a:hover {
    transform: scale(1.1);
    color: rgba(255, 255, 255, 1);
  }

  nav a:hover::after {
    width: 100%;
  }

  .nav-underline {
    position: absolute;
    bottom: 0;
    left: 3%;
    right: 3%;
    height: 3px;
    background: rgba(255, 255, 255, 0.059);
    border-radius: 26px;
  }
</style>