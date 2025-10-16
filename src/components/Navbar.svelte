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
  let ticking = false;
  let menuOpen = false;

  const updateScrollProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(Math.max((scrollTop / docHeight) * 100, 0), 100);
    scrollProgress.set(progress);

    // Hide navbar when scrolling down, show when scrolling up
    isVisible = scrollTop < lastScrollY || scrollTop < 50;
    lastScrollY = scrollTop;
    
    ticking = false;
  };

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateScrollProgress();
      });
      ticking = true;
    }
  };

  const toggleMenu = () => {
    menuOpen = !menuOpen;
  };

  const closeMenu = () => {
    menuOpen = false;
  };

  // Lock page scroll when mobile menu is open
  $: {
    if (menuOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
  }

  const BLOG_URL = 'https://medium.com/@navadeepnaidu7'; 

  onMount(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollProgress(); // Initial call
  });
  
  onDestroy(() => {
    window.removeEventListener('scroll', handleScroll);
    // Ensure scroll is restored on unmount
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  });
</script>

<div class="progress-bar" style="width: {$scrollProgress}%;"></div>

<nav class:hidden={!isVisible}>
  <div class="logo">N²</div>
  
  <!-- Hamburger Menu Button (Mobile Only) -->
  <button class="hamburger" class:open={menuOpen} on:click={toggleMenu} aria-label="Toggle menu">
    <span></span>
    <span></span>
    <span></span>
  </button>

  <!-- Navigation Menu -->
  <ul class:menu-open={menuOpen}>
    <li><a href="#ideasboard" on:click={closeMenu}>IdeaBoard</a></li>
    <li><a href="#skills" on:click={closeMenu}>Skills</a></li>
    <li><a href="#projects" on:click={closeMenu}>Projects</a></li>
    <li><a href="#contact" on:click={closeMenu}>Contact</a></li>
    <li><a href="#about" on:click={closeMenu}>About</a></li>
    <li>
      <a 
        href="https://drive.google.com/file/d/1ej8kQagn1jKxqDUhMF1i9rIryu2I1NSv/view?usp=drive_link" 
        target="_blank" 
        rel="noopener noreferrer"
        on:click={closeMenu}
      >Resume</a>
    </li>
    <li>
      <a href={BLOG_URL} target="_blank" rel="noopener noreferrer" class="blog-button" on:click={closeMenu}>
        <span class="label-desktop">Blog</span>
        <span class="label-mobile">Read my blog</span>
        <svg class="external-link" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </a>
    </li>
  </ul>
  <div class="nav-underline"></div>
</nav>

<!-- Overlay for mobile menu -->
{#if menuOpen}
  <div class="overlay" on:click={closeMenu} on:keydown={(e) => e.key === 'Escape' && closeMenu()} role="button" tabindex="0"></div>
{/if}

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
    will-change: transform;
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

  /* Hamburger Menu Button */
  .hamburger {
    display: none;
    flex-direction: column;
    justify-content: space-around;
    width: 26px;
    height: 22px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 1002;
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
  }

  .hamburger span {
    width: 100%;
    height: 2.5px;
    background: #ffffff;
    border-radius: 10px;
    transition: all 0.3s ease;
    position: relative;
  }

  .hamburger.open span:nth-child(1) {
    transform: rotate(45deg) translate(6px, 6px);
  }

  .hamburger.open span:nth-child(2) {
    opacity: 0;
    transform: translateX(20px);
  }

  .hamburger.open span:nth-child(3) {
    transform: rotate(-45deg) translate(6px, -6px);
  }

  /* Overlay */
  .overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(10px);
    z-index: 999;
    animation: fadeIn 0.4s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* Mobile menu styles */
  @media (max-width: 768px) {
    nav {
      padding: 12px 15px;
    }

    .hamburger {
      display: flex;
    }

    .overlay {
      display: block;
    }

    nav ul {
      position: fixed;
      top: 0;
      right: 0;
      width: 100%;
      height: 100vh;
      background: rgb(3, 3, 0);
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 80px 40px 40px;
      gap: 0;
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.4s ease, visibility 0.4s ease;
    }

    nav ul.menu-open {
      opacity: 1;
      visibility: visible;
    }

    nav li {
      width: 100%;
      max-width: 400px;
      opacity: 0;
      transform: translateY(20px);
      transition: none;
    }

    nav ul.menu-open li {
      animation: fadeInUp 0.5s ease forwards;
    }

    nav ul.menu-open li:nth-child(1) { animation-delay: 0.1s; }
    nav ul.menu-open li:nth-child(2) { animation-delay: 0.15s; }
    nav ul.menu-open li:nth-child(3) { animation-delay: 0.2s; }
    nav ul.menu-open li:nth-child(4) { animation-delay: 0.25s; }
    nav ul.menu-open li:nth-child(5) { animation-delay: 0.3s; }
    nav ul.menu-open li:nth-child(6) { animation-delay: 0.35s; }
    nav ul.menu-open li:nth-child(7) { animation-delay: 0.4s; }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    nav a {
      width: 100%;
      padding: 18px 20px;
      font-size: 1.3rem;
      text-align: center;
      border-radius: 12px;
      transition: all 0.3s ease;
      color: rgba(255, 255, 255, 0.8);
    }

    nav a:hover {
      color: rgba(255, 255, 255, 1);
      background: rgba(255, 255, 255, 0.05);
      transform: translateX(5px);
    }

    .logo {
      font-size: 1.6rem;
      left: 15px;
      z-index: 1001;
    }

    .blog-button {
      width: auto;
      max-width: 100%;
      padding: 12px 20px !important;
      font-size: 1.1rem !important;
      background: rgba(255, 255, 255, 0.9) !important;
      color: #000 !important;
      border-radius: 35px !important;
      justify-content: center;
      margin-top: 15px;
      box-shadow: 0 2px 8px rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.2);
      gap: 6px;
      white-space: nowrap;
    }

    .blog-button:hover {
      background: #fff !important;
      transform: translateX(5px);
      box-shadow: 0 4px 12px rgba(255, 255, 255, 0.25);
    }

    .external-link {
      width: 14px;
      height: 14px;
    }

    /* Label swap: desktop shows 'Blog', mobile shows 'Read my blog' */
    .label-desktop { display: none; }
    .label-mobile { display: inline; }

    .nav-underline {
      display: none;
    }
  }

  @media (max-width: 480px) {
    nav {
      padding: 10px;
    }

    nav ul {
      padding: 70px 30px 40px;
    }

    nav a {
      padding: 16px 18px;
      font-size: 1.2rem;
    }

    .logo {
      font-size: 1.4rem;
      left: 10px;
    }

    .hamburger {
      width: 24px;
      height: 20px;
      right: 10px;
    }

    .hamburger span {
      height: 2px;
    }

    .blog-button {
      padding: 11px 18px !important;
      font-size: 1rem !important;
    }

    .external-link {
      width: 12px;
      height: 12px;
    }
  }

  /* On desktop: show short label */
  @media (min-width: 769px) {
    .label-desktop { display: inline; }
    .label-mobile { display: none; }
  }
</style>