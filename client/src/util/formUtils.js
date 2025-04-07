import { useEffect, useRef } from "react";

const handleInputChange = (setFormValues, setValidationErrors) => (e) => {
  const { name, value } = e.target;
  setFormValues((state) => ({
    ...state,
    [name]: value,
  }));

  setValidationErrors((state) => ({
    ...state,
    [name]: value.trim() ? "" : state[name],
  }));
};

const focusHandler = (validationFunction, setValidationErrors, ...formValues) => {
  validationFunction(setValidationErrors, ...formValues);
};

function useAutoResizeInput(text, minVw = 10, maxVw = 40) {
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

function useAutoScroll(dependency) {
  const containerRef = useRef(null);
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [dependency]);
  return containerRef;
}

export const formUtils = {
  handleInputChange,
  focusHandler,
  useAutoScroll,
  useAutoResizeInput,
};
