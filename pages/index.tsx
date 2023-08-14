import Canvas from "@/components/Canvas/Canvas";
import HomeSegment from "@/components/HomeSegment/HomeSegment";
import { useRef } from "react";

const Home = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <div className="absolute left-0 top-0 h-screen w-screen bg-gradient-pastel-home text-zinc-800">
        <HomeSegment />
        <Canvas scrollContainer={scrollContainerRef} />
      </div>
      <div
        className="absolute left-0 top-0 h-screen w-screen overflow-y-auto overflow-x-hidden"
        ref={scrollContainerRef}
      >
        <div className="pointer-events-none h-[300vh] w-full" />
      </div>
    </>
  );
};

export default Home;
