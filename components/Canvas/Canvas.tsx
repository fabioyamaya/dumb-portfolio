import { PerspectiveCamera } from "@react-three/drei";
import { Canvas as ThreeCanvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { NoToneMapping } from "three";
import DiamondGroup from "../DiamondGroup/DiamondGroup";

interface Props {
  scrollContainer: React.RefObject<HTMLDivElement>;
}
const Canvas = ({ scrollContainer }: Props) => (
  <ThreeCanvas gl={{ antialias: true, toneMapping: NoToneMapping }}>
    <Perf position="top-left" />
    <PerspectiveCamera makeDefault position={[0, 0, 1000]} />
    {/* <OrbitControls /> */}

    <ambientLight intensity={1} />
    <DiamondGroup scrollContainer={scrollContainer} />
  </ThreeCanvas>
);

export default Canvas;
