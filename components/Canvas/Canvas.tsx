import { Segments } from "@/pages";
import { PerspectiveCamera } from "@react-three/drei";
import { Canvas as ThreeCanvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { NoToneMapping } from "three";
import DiamondGroup from "../DiamondGroup/DiamondGroup";

interface Props {
  scrollContainer: React.RefObject<HTMLDivElement>;
  currentSegment: Segments;
}
const Canvas = ({ scrollContainer, currentSegment }: Props) => (
  <ThreeCanvas gl={{ antialias: true, toneMapping: NoToneMapping }}>
    <Perf position="top-left" />
    <PerspectiveCamera makeDefault />
    {/* <OrbitControls /> */}

    <ambientLight intensity={1} />
    <DiamondGroup
      scrollContainer={scrollContainer}
      currentSegment={currentSegment}
    />
  </ThreeCanvas>
);

export default Canvas;
