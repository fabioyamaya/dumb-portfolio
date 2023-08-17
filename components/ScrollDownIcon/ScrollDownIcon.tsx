import { TargetAndTransition, motion } from "framer-motion";
import React from "react";

const Chevron = React.forwardRef<HTMLDivElement>((_, ref) => (
  <div ref={ref} className="absolute h-[6px] w-[36px]">
    <div className="absolute left-0 top-0 h-full w-[51%] skew-y-[30deg] bg-zinc-800" />
    <div className="absolute right-0 top-0 h-full w-[51%] skew-y-[-30deg] bg-zinc-800" />
  </div>
));
Chevron.displayName = "Chevron";

const animation: TargetAndTransition = {
  y: [-20, 10, 20, 35],
  opacity: [0, 1, 1, 0],
  scale: [0.3, 1, 1, 0.3],
};

const getTransition = (delay = 0) => {
  return {
    repeat: Infinity,
    duration: 3,
    easings: ["easeOut", " linear", " easeIn"],
    delay,
  };
};

const ScrollDownIcon = React.forwardRef<HTMLDivElement>((_, ref) => {
  const MotionChevron = motion(Chevron);

  return (
    <div ref={ref} className="relative h-[40px] w-[40px]">
      <MotionChevron animate={animation} transition={getTransition()} />
      <MotionChevron animate={animation} transition={getTransition(1)} />
      <MotionChevron animate={animation} transition={getTransition(2)} />
    </div>
  );
});
ScrollDownIcon.displayName = "ScrollDownIcon";

export default ScrollDownIcon;
