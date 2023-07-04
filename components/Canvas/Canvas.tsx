import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { Canvas as ThreeCanvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { NoToneMapping } from "three";
import DiamondGroup from "../DiamondGroup/DiamondGroup";

const Canvas = () => (
  <ThreeCanvas gl={{ antialias: true, toneMapping: NoToneMapping }}>
    <Perf position="top-left" />
    <OrthographicCamera makeDefault position={[0, 0, 1000]} />
    <OrbitControls />

    <ambientLight intensity={1} />
    <DiamondGroup />
  </ThreeCanvas>
);

export default Canvas;
