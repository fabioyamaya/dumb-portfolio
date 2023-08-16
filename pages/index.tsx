import Canvas from "@/components/Canvas/Canvas";
import HomeSegment from "@/components/HomeSegment/HomeSegment";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useRef, useState } from "react";

enum Segments {
  none,
  home,
}

export enum AnimationStage {
  start,
  end,
}

const Home = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollContainerRef });

  const isAnimatingSegment = useRef<boolean>(false);

  const [segment, setSegment] = useState<Segments>(Segments.home);

  const switchSegments = () => {
    if (isAnimatingSegment.current) return;
    const newSegment =
      scrollYProgress.get() > 0.2 ? Segments.none : Segments.home;
    if (newSegment !== segment) {
      setSegment(newSegment);
    }
  };

  useMotionValueEvent(scrollYProgress, "change", switchSegments);

  const handleAnimationCycle = (animationStage: AnimationStage) => {
    if (animationStage === AnimationStage.start)
      isAnimatingSegment.current = true;
    else {
      isAnimatingSegment.current = false;
    }
  };

  const MotionHomeSegment = motion(HomeSegment);

  return (
    <>
      <div
        className="absolute left-0 top-0 h-screen w-screen overflow-y-auto overflow-x-hidden "
        ref={scrollContainerRef}
      >
        <div className="sticky left-0 top-0 h-screen w-screen bg-gradient-pastel-home text-zinc-800">
          <AnimatePresence>
            {segment === Segments.home && (
              <MotionHomeSegment handleAnimationCycle={handleAnimationCycle} />
            )}
          </AnimatePresence>

          <Canvas scrollContainer={scrollContainerRef} />
        </div>
        <div className="pointer-events-none h-[300vh] w-full" />
      </div>
    </>
  );
};

export default Home;
