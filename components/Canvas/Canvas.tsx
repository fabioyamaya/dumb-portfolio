import { PerspectiveCamera, ScrollControls } from "@react-three/drei";
import { Canvas as ThreeCanvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { NoToneMapping } from "three";
import DiamondGroup from "../DiamondGroup/DiamondGroup";

const Canvas = () => (
  <ThreeCanvas gl={{ antialias: true, toneMapping: NoToneMapping }}>
    <Perf position="top-left" />
    <PerspectiveCamera makeDefault position={[0, 0, 1000]} />
    {/* <OrbitControls /> */}

    <ambientLight intensity={1} />
    <ScrollControls pages={3} damping={0.8}>
      <DiamondGroup />
    </ScrollControls>
  </ThreeCanvas>
);

export default Canvas;
