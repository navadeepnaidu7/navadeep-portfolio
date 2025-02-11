<script>
  import { onMount } from 'svelte';
</script>

<div class="scroll-indicator">
  <span class="text">scroll down</span>
  <span class="arrow">▼</span>
</div>

<style>
  .scroll-indicator {
    position: fixed;
    bottom: 0rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    opacity: 0.8;
    z-index: 100;
  }

  .text {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .arrow {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.5rem;
    animation: float 2.5s ease-in-out infinite;
    display: block;
    transform: scaleX(1.5) scaleY(0.7); /* Makes the triangle wider and shorter */
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0) scaleX(1.5) scaleY(0.7);
    }
    50% {
      transform: translateY(-10px) scaleX(1.5) scaleY(0.7);
    }
  }
</style>
