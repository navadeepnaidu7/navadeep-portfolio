<script>
  import { onMount } from 'svelte';

  let showScrollTop = false;

  onMount(() => {
    window.addEventListener('scroll', () => {
      showScrollTop = window.pageYOffset > 300;
    });
  });

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
</script>

<main class="min-h-[200vh]">
  <h1 class="text-4xl font-bold text-center py-8">My Portfolio</h1>
  <!-- Add more sections here -->
  <div class="hero">
    <h2 class="tagline">Code · Automate · Scale</h2>
    <div class="intro">
      <span class="greeting">Hello👋🏼, I'm</span>
      <h1 class="name">Navadeep Naidu</h1>
    </div>
    <p class="description">
      Building scalable backends & automating DevOps workflows, the infrastructure behind great software.
    </p>
  </div>
</main>

<button
  class="scroll-top"
  class:visible={showScrollTop}
  on:click={scrollToTop}
  aria-label="Scroll to top"
>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
  </svg>
</button>

<style>
  .scroll-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: rgba(0, 157, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 2px solid rgba(0, 157, 255, 0.2);
    border-radius: 50%;
    width: 3.5rem;
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
    z-index: 1000;
    outline: none;
  }

  .scroll-top.visible {
    opacity: 1;
    visibility: invisible;
    transform: translateY(0);
  }

  .scroll-top:hover {
    background: rgba(0, 157, 255, 0.2);
    border-color: rgba(0, 157, 255, 0.4);
    transform: translateY(-5px);
    box-shadow: 
      0 0 20px rgba(0, 157, 255, 0.3),
      0 0 40px rgba(0, 157, 255, 0.2);
  }

  .scroll-top svg {
    width: 1.5rem;
    height: 1.5rem;
    stroke: #009dff;
    transition: transform 0.3s ease;
  }

  .scroll-top:hover svg {
    transform: scale(1.2);
  }

  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 2rem;
    text-align: center;
    gap: 1.5rem; /* Add consistent spacing between elements */
  }

  .tagline {
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 1rem; /* Reduced from 2rem */
    letter-spacing: 0.2em;
  }

  .intro {
    margin-bottom: 1rem; /* Reduced from 1.5rem */
  }

  .greeting {
    display: block; /* Makes it a block element */
    font-size: 1.8rem;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 0.5rem; /* Add space between greeting and name */
  }

  .name {
    font-size: 4rem;
    font-weight: bold;
    margin: 0.25rem 0 1rem 0; /* Adjusted margins */
    background: linear-gradient(45deg, #ffffff, #a8a8a8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .description {
    max-width: 600px;
    font-size: 1.2rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.7);
    margin-top: 0.5rem; /* Add some space above description */
  }

  @media (max-width: 768px) {
    .tagline {
      font-size: 1.2rem;
    }

    .greeting {
      font-size: 1.4rem;
    }

    .name {
      font-size: 3rem;
    }

    .description {
      font-size: 1rem;
    }
  }
</style>