"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const Meteors = ({ number = 20 }) => {
  const [meteorStyles, setMeteorStyles] = useState([]);

  useEffect(() => {
    const styles = [...new Array(number)].map(() => {
      const leftPosition = Math.random() * window.innerWidth; // Ensures meteors start within bounds
      return {
        top: -5, // Start above the viewport
        left: `${leftPosition + 30}px`,
        animationDelay: `${Math.random() * 1 + 0.2}s`,
        animationDuration: `${Math.random() * 8 + 2}s`,
      };
    });
    setMeteorStyles(styles);
  }, [number]);

  return (
    <>
      {meteorStyles.map((style, idx) => (
        // Meteor Head
        <span
          key={idx}
          className={cn(
            "pointer-events-none absolute -top-10 size-[0.35rem] rotate-[215deg] animate-meteor rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10]"
          )}
          style={style}
        />
      ))}
    </>
  );
};

export default Meteors;
