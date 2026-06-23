import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  /** 0–1 visibility fraction that triggers the in-view state. */
  threshold?: number;
  /** Margin around the root, e.g. "0px 0px -100px 0px". */
  rootMargin?: string;
  /** Keep firing on every enter/leave instead of locking true once seen. */
  once?: boolean;
}

/**
 * Observe an element and report when it enters the viewport.
 * Returns a ref to attach and a boolean `inView`. Locks to `true`
 * after the first intersection unless `once` is set to `false`.
 */
export function useInView<T extends HTMLElement = HTMLElement>(
  options: UseInViewOptions = {},
) {
  const { threshold = 0, rootMargin, once = true } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) io.disconnect();
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { threshold, rootMargin },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}
