<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  
  export let onLoadingComplete;
  
  onMount(() => {
    setTimeout(() => {
      onLoadingComplete();
    }, 2000);
  });
</script>

<div class="loading-screen" transition:fade={{ duration: 800 }}>
  <div class="loading-content">
    <div class="logo">N²</div>
    <div class="loading-bar">
      <div class="loading-progress"></div>
    </div>
  </div>
</div>

<style>
  .loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }

  .loading-content {
    text-align: center;
  }

  .logo {
    font-family: 'VT323', monospace;
    font-size: 4rem;
    color: #fff;
    margin-bottom: 2rem;
    animation: pulse 2s infinite;
  }

  .loading-bar {
    width: 200px;
    height: 3px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
    overflow: hidden;
  }

  .loading-progress {
    height: 100%;
    background: #fff;
    animation: load 2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  @keyframes load {
    from { width: 0; }
    to { width: 100%; }
  }

  @keyframes pulse {
    0% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.95); }
    100% { opacity: 1; transform: scale(1); }
  }
</style>
