import Canvas from "@/components/Canvas/Canvas";
import HomeSegment from "@/components/HomeSegment/HomeSegment";
import useStore, { Segments } from "@/state/UseStore";
import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";

const Home = () => {
  const segment = useStore((state) => state.currentSegment);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const MotionHomeSegment = motion(HomeSegment);

  return (
    <>
      <div
        className="absolute left-0 top-0 h-screen w-screen overflow-y-auto overflow-x-hidden "
        ref={scrollContainerRef}
      >
        <div className="sticky left-0 top-0 h-screen w-screen bg-gradient-pastel-home text-zinc-800">
          <AnimatePresence>
            {segment === Segments.home && <MotionHomeSegment />}
          </AnimatePresence>

          <Canvas scrollContainer={scrollContainerRef} />
        </div>

        <div className="pointer-events-none h-[300vh] w-full" />
      </div>
    </>
  );
};

export default Home;
