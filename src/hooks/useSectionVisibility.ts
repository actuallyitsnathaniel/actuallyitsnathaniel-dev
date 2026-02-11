import { useEffect, useRef } from "react";
import { useActivityLog } from "../context/ActivityLogContext";

export const useSectionVisibility = (sectionName: string) => {
  const { log } = useActivityLog();
  const ref = useRef<HTMLDivElement>(null);
  const hasLoggedRef = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasLoggedRef.current) {
            log("info", `Viewing: ${sectionName}`);
            hasLoggedRef.current = true;
          } else if (!entry.isIntersecting) {
            hasLoggedRef.current = false;
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [sectionName, log]);

  return ref;
};
