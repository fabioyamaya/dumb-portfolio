import Canvas from "@/components/Canvas/Canvas";
import HomeSegment from "@/components/HomeSegment/HomeSegment";
import { ProgressValueContextProvider } from "@/contexts/ProgressValueContext";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useRef, useState } from "react";

export enum Segments {
  none = 0,
  home = 0.2,
  introduction = 0.4,
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
      scrollYProgress.get() > Segments.home
        ? Segments.introduction
        : Segments.home;
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
        <ProgressValueContextProvider>
          <div className="sticky left-0 top-0 h-screen w-screen bg-gradient-pastel-home text-zinc-800">
            <AnimatePresence>
              {segment === Segments.home && (
                <MotionHomeSegment
                  handleAnimationCycle={handleAnimationCycle}
                />
              )}
            </AnimatePresence>

            <Canvas
              scrollContainer={scrollContainerRef}
              currentSegment={segment}
            />
          </div>

          <div className="pointer-events-none h-[300vh] w-full" />
        </ProgressValueContextProvider>
      </div>
    </>
  );
};

export default Home;
