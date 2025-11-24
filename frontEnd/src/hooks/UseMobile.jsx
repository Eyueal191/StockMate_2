import { useState, useEffect } from "react";

export function useMobile() {
  // true if viewport is less than Tailwind's "sm" breakpoint (640px)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}
