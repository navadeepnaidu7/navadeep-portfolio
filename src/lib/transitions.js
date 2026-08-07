import { cubicOut } from "svelte/easing";

/**
 * Fly + blur — adapted from colinlienard.com
 * @param {Element} node
 * @param {{ delay?: number; duration?: number; easing?: (t: number) => number; x?: number | string; y?: number | string; opacity?: number }} [params]
 */
export function flyWithBlur(
  node,
  { delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 } = {},
) {
  const style = getComputedStyle(node);
  const targetOpacity = +style.opacity;
  const transform = style.transform === "none" ? "" : style.transform;
  const od = targetOpacity * (1 - opacity);
  const [xValue, xUnit] = splitCssUnit(x);
  const [yValue, yUnit] = splitCssUnit(y);

  return {
    delay,
    duration,
    easing,
    css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * xValue}${xUnit}, ${(1 - t) * yValue}${yUnit});
			opacity: ${targetOpacity - od * u};
			filter: blur(${u * 2}px);`,
  };
}

/** @param {number | string} value */
function splitCssUnit(value) {
  if (typeof value === "string") {
    const match = value.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
    if (match) return [Number.parseFloat(match[1]), match[2] || "px"];
  }
  return [/** @type {number} */ (value), "px"];
}
