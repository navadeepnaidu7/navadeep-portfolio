<script>
  import { onMount } from "svelte";

  let words = [];
  let sectionElement;

  const content = [
    { text: "I'm ", bold: false },
    { text: "a ", bold: false },
    { text: "backend ", bold: true },
    { text: "engineer ", bold: true },
    { text: "and ", bold: false },
    { text: "DevOps ", bold: true },
    { text: "enthusiast ", bold: true },
    { text: "who ", bold: false },
    { text: "loves ", bold: false },
    { text: "building ", bold: false },
    { text: "scalable ", bold: false },
    { text: "systems. ", bold: false },
    { text: "From ", bold: false },
    { text: "designing ", bold: false },
    { text: "robust ", bold: true },
    { text: "APIs ", bold: true },
    { text: "to ", bold: false },
    { text: "orchestrating ", bold: false },
    { text: "cloud ", bold: true },
    { text: "deployments, ", bold: true },
    { text: "I ", bold: false },
    { text: "turn ", bold: false },
    { text: "complex ", bold: false },
    { text: "infrastructure ", bold: false },
    { text: "challenges ", bold: false },
    { text: "into ", bold: false },
    { text: "elegant ", bold: false },
    { text: "solutions. ", bold: false },
    { text: "I ", bold: false },
    { text: "build ", bold: false },
    { text: "these ", bold: false },
    { text: "things ", bold: false },
    { text: "because ", bold: false },
    { text: "I ", bold: false },
    { text: "genuinely ", bold: false },
    { text: "enjoy ", bold: false },
    { text: "making ", bold: false },
    { text: "technology ", bold: false },
    { text: "work ", bold: false },
    { text: "smarter, ", bold: true },
    { text: "faster, ", bold: true },
    { text: "and ", bold: false },
    { text: "more ", bold: false },
    { text: "reliably.", bold: true },
  ];

  function getWordColor(opacity = 0.2, isBold = false) {
    const clamped = Math.max(0, Math.min(1, opacity));
    const base = isBold ? 150 : 130;
    const max = 245;
    const value = Math.round(base + (max - base) * Math.pow(clamped, 1.15));
    return `rgb(${value}, ${value}, ${value})`;
  }

  onMount(() => {
    words = content.map(() => ({ opacity: 0.2 }));
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (sectionElement) {
        const rect = sectionElement.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const windowHeight = window.innerHeight;
        const currentScrollY = window.scrollY;
        const direction = currentScrollY - lastScrollY;

        const sectionProgress = Math.max(
          0,
          Math.min(
            1.75,
            (windowHeight - sectionTop) / (windowHeight + sectionHeight * 0.2),
          ),
        );

        content.forEach((_, index) => {
          const wordStartProgress = (index / content.length) * 0.65;
          const wordEndProgress = ((index + 1) / content.length) * 0.42;

          const revealProgress = Math.max(
            0,
            Math.min(
              1,
              (sectionProgress - wordStartProgress) /
                (wordEndProgress - wordStartProgress + 0.4),
            ),
          );

          let opacity = Math.pow(revealProgress, 0.6);

          const previousOpacity = words[index]?.opacity ?? 0.2;

          if (direction >= 0) {
            opacity = Math.max(previousOpacity, opacity);
          }

          opacity = Math.max(0.15, Math.min(1, opacity));
          words[index] = { opacity };
        });

        words = [...words];
        lastScrollY = currentScrollY;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
</script>

<section class="about-section" bind:this={sectionElement}>
  <div class="content-shell">
    <div class="copy-block">
      <p class="text">
        {#each content as segment, index}
          <span
            class="word"
            class:bold={segment.bold}
            data-word={index}
            style="opacity: {words[index]?.opacity ??
              0.2}; color: {getWordColor(
              words[index]?.opacity ?? 0.2,
              segment.bold,
            )}"
          >
            {segment.text}
          </span>
        {/each}
      </p>
    </div>
  </div>
</section>

<style>
  :global(body) {
    --page-surface: #030207;
  }

  .about-section {
    position: relative;
    width: 100%;
    padding: clamp(4.5rem, 8vw, 6rem) 2vw clamp(1rem, 2vw, 1.5rem);
    background: transparent;
  }

  .content-shell {
    max-width: 1200px;
    margin: 0 auto;
  }

  .copy-block {
    position: relative;
    padding: clamp(2.75rem, 5vw, 4rem) clamp(2rem, 6vw, 4.5rem);
    z-index: 1;
  }

  .text {
    font-size: clamp(1.2rem, 2.2vw, 1.55rem);
    line-height: 1.85;
    letter-spacing: -0.012em;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI",
      Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #f5f5f5;
    text-align: center;
  }

  .word {
    font-weight: 420;
    transition:
      opacity 0.5s ease-out,
      color 0.5s ease-out;
    display: inline;
  }

  .word.bold {
    font-weight: 690;
    letter-spacing: -0.022em;
  }

  @media (max-width: 768px) {
    .copy-block {
      padding: clamp(2.25rem, 7vw, 3.5rem) clamp(1.75rem, 7vw, 3rem);
    }

    .text {
      line-height: 1.75;
    }
  }

  @media (max-width: 480px) {
    .text {
      font-size: 1.05rem;
      line-height: 1.7;
    }
  }
</style>
