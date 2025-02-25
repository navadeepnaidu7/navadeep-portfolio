<script>
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { onMount, onDestroy } from 'svelte';

  const scrollProgress = tweened(0, {
    duration: 400,
    easing: cubicOut
  });

  let lastScrollY = 0;
  let isVisible = true;

  const updateScrollProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(Math.max((scrollTop / docHeight) * 100, 0), 100);
    scrollProgress.set(progress);

    // Hide navbar when scrolling down, show when scrolling up
    isVisible = scrollTop < lastScrollY || scrollTop < 50;
    lastScrollY = scrollTop;
  };

  const BLOG_URL = 'https://medium.com/@navadeepnaidu7'; 
  const RESUME_URL = 'https://drive.google.com/file/d/1ej8kQagn1jKxqDUhMF1i9rIryu2I1NSv/view?usp=drive_link';

  onMount(() => {
    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Initial call
  });
  
  onDestroy(() => {
    window.removeEventListener('scroll', updateScrollProgress);
  });
</script>

<div class="progress-bar" style="width: {$scrollProgress}%;"></div>

<nav class:hidden={!isVisible}>
  <div class="logo">N²</div>
  <ul>
    <li><a href="#ideasboard">IdeasBoard</a></li>
    <li><a href="#skills">Skills</a></li>
    <li><a href="#projects">Projects</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#contact">Contact</a></li>
    <li>
      <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
        Resume
      </a>
    </li>
    <li>
      <a href={BLOG_URL} target="_blank" rel="noopener noreferrer" class="blog-button">
        Blog
        <svg class="external-link" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </a>
    </li>
  </ul>
  <div class="nav-underline"></div>
</nav>

<style>
  @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

  .progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    height: 3.5px;
    background: rgba(255, 255, 255, 0.756);
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
    background: rgba(0, 0, 0, 0.612);
    backdrop-filter: blur(10px);
    transform: translateY(0);
    transition: transform 0.3s ease;
  }

  nav.hidden {
    transform: translateY(-100%);
  }

  nav ul {
    list-style: none;
    display: flex;
    gap: 8px;
    padding: 0;
    margin: 0;
    justify-content: flex-end;
    align-items: center;
  }

  nav a {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.607);
    font-weight: bold;
    padding: 5px 10px;
    transition: color 0.3s ease;
  }

  nav a:hover {
    color: rgba(255, 255, 255, 1);
  }

  .nav-underline {
    position: absolute;
    bottom: 0;
    left: 0%;
    right: 0%;
    height: 3px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.059) 10%,
      rgba(255, 255, 255, 0.059) 90%,
      transparent 100%
    );
    border-radius: 26px;
  }

  .logo {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-family: 'VT323', monospace;
    font-size: 2rem;
    color: rgba(255, 255, 255, 0.9);
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  }

  .logo:hover {
    color: #fff;
    text-shadow: 
      0 0 5px rgba(255, 255, 255, 0.5),
      0 0 10px rgba(255, 255, 255, 0.3),
      0 0 15px rgba(255, 255, 255, 0.2);
    transform: translateY(-50%) scale(1.1);
  }

  .blog-button {
    background: rgba(255, 255, 255, 0.9);
    color: #000 !important;
    padding: 6px 12px !important;  /* reduced padding */
    border-radius: 35px;
    display: flex;
    align-items: center;
    gap: 4px;  /* reduced gap */
    transition: all 0.3s ease !important;
    font-size: 0.9rem;  /* reduced font size */
  }

  .blog-button:hover {
    background: #fff;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
  }

  .external-link {
    transition: transform 0.3s ease;
  }

  .blog-button:hover .external-link {
    transform: translate(2px, -2px);
  }
</style>