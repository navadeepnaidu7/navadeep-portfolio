<script>
  import { fade } from "svelte/transition";
  import { toWeeks } from "../lib/social.js";

  /** @type {{ contributions: { total: number; start: string; levels: string; counts: number[] } | null }} */
  let { contributions } = $props();

  const weeks = $derived(contributions ? toWeeks(contributions) : []);

  const levels = [
    "level-0",
    "level-1",
    "level-2",
    "level-3",
    "level-4",
  ];

  /** @type {{ count: number; date: string; left: number; top: number } | undefined} */
  let hovered = $state(undefined);
  let containerWidth = $state(0);
  let tooltipWidth = $state(0);

  const formatter = new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });

  const label = $derived(
    hovered
      ? `${hovered.count} contribution${hovered.count === 1 ? "" : "s"} · ${formatter.format(new Date(hovered.date))}`
      : "",
  );

  const tooltipLeft = $derived(
    hovered
      ? Math.min(
          Math.max(hovered.left, tooltipWidth / 2 + 4),
          Math.max(containerWidth - tooltipWidth / 2 - 4, tooltipWidth / 2 + 4),
        )
      : 0,
  );

  /** @param {PointerEvent} event */
  function handlePointerOver(event) {
    const target = /** @type {HTMLElement} */ (event.target);
    const { date, count } = target.dataset;
    if (!date) {
      hovered = undefined;
      return;
    }
    hovered = {
      count: Number(count),
      date,
      left: target.offsetLeft + target.offsetWidth / 2,
      top: target.offsetTop,
    };
  }
</script>

{#if weeks.length}
  <div
    class="graph"
    bind:clientWidth={containerWidth}
    onpointerover={handlePointerOver}
    onpointerleave={() => (hovered = undefined)}
    role="presentation"
  >
    <div
      class="grid"
      style:grid-template-columns="repeat({weeks.length}, minmax(0, 1fr))"
    >
      {#each weeks as week, weekIndex (weekIndex)}
        {#each week as day, dayIndex (dayIndex)}
          <div
            class="day {day ? levels[day.level] : 'empty'}"
            data-date={day?.date}
            data-count={day?.count}
          ></div>
        {/each}
      {/each}
    </div>

    {#if hovered}
      <div
        transition:fade={{ duration: 100 }}
        class="tooltip"
        style:left="{tooltipLeft}px"
        style:top="{hovered.top}px"
        bind:clientWidth={tooltipWidth}
      >
        {label}
      </div>
    {/if}
  </div>
{:else}
  <div class="graph-skeleton" aria-hidden="true"></div>
{/if}

<style>
  .graph {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;
  }

  .grid {
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: repeat(7, 1fr);
    gap: 1.5px;
  }

  .day {
    aspect-ratio: 1;
    width: 100%;
    border-radius: 1.5px;
  }

  .empty {
    background: transparent;
  }

  .level-0 {
    background: rgba(255, 255, 255, 0.06);
  }
  .level-1 {
    background: rgba(87, 50, 233, 0.28);
  }
  .level-2 {
    background: rgba(87, 50, 233, 0.48);
  }
  .level-3 {
    background: rgba(87, 50, 233, 0.7);
  }
  .level-4 {
    background: rgba(87, 50, 233, 0.95);
  }

  .tooltip {
    pointer-events: none;
    position: absolute;
    z-index: 10;
    transform: translate(-50%, calc(-100% - 0.25rem));
    background: #1a1a1f;
    color: rgba(255, 255, 255, 0.92);
    padding: 0.25rem 0.5rem;
    font-size: 0.7rem;
    font-family: "Inter", system-ui, sans-serif;
    white-space: nowrap;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
  }

  .graph-skeleton {
    width: 100%;
    height: 4.5rem;
    border-radius: 6px;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.04),
      rgba(255, 255, 255, 0.08),
      rgba(255, 255, 255, 0.04)
    );
    background-size: 200% 100%;
    animation: shimmer 1.4s ease infinite;
  }

  @keyframes shimmer {
    0% {
      background-position: 100% 0;
    }
    100% {
      background-position: -100% 0;
    }
  }
</style>
