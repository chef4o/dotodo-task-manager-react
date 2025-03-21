import { useEffect, useRef } from "react";

export function useAutoResizeInput(text, minVw = 10, maxVw = 40) {
  const inputRef = useRef(null);
  const spanRef = useRef(null);

  useEffect(() => {
    if (spanRef.current && inputRef.current) {
      const measuredPx = spanRef.current.offsetWidth;
      const measuredVw = (measuredPx / window.innerWidth) * 100;
      const clampedVw = Math.max(minVw, Math.min(measuredVw, maxVw));
      inputRef.current.style.width = `${clampedVw}vw`;
    }
  }, [text, minVw, maxVw]);

  return { inputRef, spanRef };
}

export function useAutoScroll(dependency) {
  const containerRef = useRef(null);
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [dependency]);
  return containerRef;
}
