<script>
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { onMount, onDestroy } from "svelte";

  const scrollProgress = tweened(0, {
    duration: 400,
    easing: cubicOut,
  });

  let lastScrollY = 0;
  let isVisible = true;
  let ticking = false;
  let menuOpen = false;
  let blogDropdownOpen = false;

  const updateScrollProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(Math.max((scrollTop / docHeight) * 100, 0), 100);
    scrollProgress.set(progress);

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
    if (menuOpen) {
      blogDropdownOpen = false;
    }
  };

  const closeMenu = () => {
    menuOpen = false;
    blogDropdownOpen = false;
  };

  const toggleBlogDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    blogDropdownOpen = !blogDropdownOpen;
  };

  const closeBlogDropdown = () => {
    blogDropdownOpen = false;
  };

  const handleBlogKeydown = (e) => {
    if (e.key === "Escape") {
      closeBlogDropdown();
    }
  };

  const handleClickOutside = (e) => {
    if (blogDropdownOpen && !e.target.closest(".blog-container")) {
      closeBlogDropdown();
    }
  };

  $: {
    if (menuOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
  }

  const MEDIUM_URL = "https://medium.com/@navadeepnaidu7";
  const PERSONAL_BLOG_URL = "https://blog.navadeepnaidu.com";

  onMount(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("click", handleClickOutside);
    window.addEventListener("keydown", handleBlogKeydown);
    updateScrollProgress();
  });

  onDestroy(() => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("click", handleClickOutside);
    window.removeEventListener("keydown", handleBlogKeydown);
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  });
</script>

<div class="progress-bar" style="width: {$scrollProgress}%;"></div>

<nav class:hidden={!isVisible}>
  <div class="logo">N²</div>

  <button
    class="hamburger"
    class:open={menuOpen}
    on:click={toggleMenu}
    aria-label="Toggle menu"
  >
    <span></span>
    <span></span>
    <span></span>
  </button>

  <ul class:menu-open={menuOpen}>
    <li><a href="#ideasboard" on:click={closeMenu}>IdeaBoard</a></li>
    <li><a href="#writing" on:click={closeMenu}>Writing</a></li>
    <li><a href="#skills" on:click={closeMenu}>Skills</a></li>
    <li><a href="#contact" on:click={closeMenu}>Contact</a></li>
    <li><a href="#about" on:click={closeMenu}>About</a></li>
    <li>
      <a
        href="https://drive.google.com/file/d/1ej8kQagn1jKxqDUhMF1i9rIryu2I1NSv/view?usp=drive_link"
        target="_blank"
        rel="noopener noreferrer"
        on:click={closeMenu}>Resume</a
      >
    </li>
    <li class="blog-container">
      <button
        class="blog-button"
        on:click={toggleBlogDropdown}
        aria-expanded={blogDropdownOpen}
        aria-haspopup="true"
      >
        <span class="label-desktop">Blog</span>
        <span class="label-mobile">Read my blog</span>
        <svg
          class="chevron-icon"
          class:open={blogDropdownOpen}
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {#if blogDropdownOpen}
        <div class="blog-dropdown" role="menu">
          <a
            href={PERSONAL_BLOG_URL}
            target="_blank"
            rel="noopener noreferrer"
            class="dropdown-item"
            role="menuitem"
            on:click={closeMenu}
          >
            <div class="item-text">
              <span class="item-title">Personal Blog</span>
              <span class="item-desc">Focused reading experience</span>
            </div>
          </a>
          <a
            href={MEDIUM_URL}
            target="_blank"
            rel="noopener noreferrer"
            class="dropdown-item"
            role="menuitem"
            on:click={closeMenu}
          >
            <div class="item-text">
              <span class="item-title">Medium</span>
              <span class="item-desc">Community & discussions</span>
            </div>
          </a>
        </div>
      {/if}
    </li>
  </ul>
  <div class="nav-underline"></div>
</nav>

{#if menuOpen}
  <div
    class="overlay"
    on:click={closeMenu}
    on:keydown={(e) => e.key === "Escape" && closeMenu()}
    role="button"
    tabindex="0"
  ></div>
{/if}

<style>
  @import url("https://fonts.googleapis.com/css2?family=VT323&display=swap");

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
    color: rgba(255, 255, 255, 0.5);
    font-weight: 600;
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
    font-family: "VT323", monospace;
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

  /* Blog Dropdown - Apple-style frosted glass */
  .blog-container {
    position: relative;
    display: flex;
    align-items: center;
  }

  .blog-button {
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.8) !important;
    padding: 6px 14px !important;
    border-radius: 20px;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
    font-size: 0.9rem;
    font-weight: 500;
    border: 1px solid rgba(255, 255, 255, 0.08);
    cursor: pointer;
    font-family: inherit;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    outline: none;
    -webkit-tap-highlight-color: transparent;
  }

  .blog-button:hover {
    background: rgba(255, 255, 255, 0.12);
    color: rgba(255, 255, 255, 1) !important;
    border-color: rgba(255, 255, 255, 0.15);
    transform: scale(1.02);
  }

  .blog-button:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.3);
    outline-offset: 4px;
  }

  .blog-button:active {
    transform: scale(0.96);
  }

  .chevron-icon {
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    opacity: 0.7;
  }

  .chevron-icon.open {
    transform: rotate(180deg);
  }

  .blog-dropdown {
    position: absolute;
    top: calc(100% + 12px);
    right: 0;
    min-width: 200px;
    background: rgba(25, 25, 25, 0.75);
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow:
      0 16px 40px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
    padding: 6px;
    z-index: 1100;
  }

  .dropdown-item {
    display: block;
    padding: 10px 14px;
    border-radius: 8px;
    text-decoration: none !important;
    transition: background 0.2s ease;
  }

  .dropdown-item:hover {
    background: rgba(255, 255, 255, 0.08);
  }

  .item-text {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .item-title {
    font-size: 0.9rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.95);
    line-height: 1.2;
  }

  .item-desc {
    font-size: 0.75rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.5);
    line-height: 1.2;
  }

  .dropdown-item:hover .item-title {
    color: #fff;
  }

  .dropdown-item:hover .item-desc {
    color: rgba(255, 255, 255, 0.7);
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
      transition:
        opacity 0.4s ease,
        visibility 0.4s ease;
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

    nav ul.menu-open li:nth-child(1) {
      animation-delay: 0.1s;
    }
    nav ul.menu-open li:nth-child(2) {
      animation-delay: 0.15s;
    }
    nav ul.menu-open li:nth-child(3) {
      animation-delay: 0.2s;
    }
    nav ul.menu-open li:nth-child(4) {
      animation-delay: 0.25s;
    }
    nav ul.menu-open li:nth-child(5) {
      animation-delay: 0.3s;
    }
    nav ul.menu-open li:nth-child(6) {
      animation-delay: 0.35s;
    }
    nav ul.menu-open li:nth-child(7) {
      animation-delay: 0.4s;
    }

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

    .blog-container {
      width: 100%;
      max-width: 400px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .blog-button {
      width: auto;
      max-width: 100%;
      padding: 12px 20px !important;
      font-size: 1.1rem !important;
      background: rgba(255, 255, 255, 0.08) !important;
      color: rgba(255, 255, 255, 0.9) !important;
      border-radius: 35px !important;
      justify-content: center;
      margin-top: 15px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.1);
      gap: 8px;
      white-space: nowrap;
      outline: none;
      -webkit-tap-highlight-color: transparent;
    }

    .blog-button:hover {
      background: rgba(255, 255, 255, 0.12) !important;
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
    }

    .blog-button:focus-visible {
      outline: 2px solid rgba(255, 255, 255, 0.3);
      outline-offset: 4px;
    }

    .blog-button:active {
      transform: translateY(0) scale(0.96);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .chevron-icon {
      width: 14px;
      height: 14px;
    }

    .blog-dropdown {
      position: static;
      min-width: 0;
      width: 100%;
      background: transparent;
      border: none;
      box-shadow: none;
      padding: 8px 0 0 0;
      margin-top: 8px;
    }

    .dropdown-item {
      padding: 14px 16px;
      text-align: center;
    }

    .item-text {
      align-items: center;
    }

    .item-title {
      font-size: 1rem;
    }

    .item-desc {
      font-size: 0.85rem;
    }

    .dropdown-item:hover {
      background: rgba(255, 255, 255, 0.05);
    }

    .label-desktop {
      display: none;
    }
    .label-mobile {
      display: inline;
    }

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

    .chevron-icon {
      width: 12px;
      height: 12px;
    }
  }

  @media (min-width: 769px) {
    .label-desktop {
      display: inline;
    }
    .label-mobile {
      display: none;
    }
  }
</style>
