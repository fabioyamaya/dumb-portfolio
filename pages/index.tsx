import Canvas from "@/components/Canvas/Canvas";
import HomeSegment from "@/components/HomeSegment/HomeSegment";

const Home = () => {
  return (
    <main className="h-screen w-screen bg-gradient-pastel-home text-zinc-800">
      <HomeSegment />
      <Canvas />
    </main>
  );
};

export default Home;
