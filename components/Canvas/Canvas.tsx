import { Canvas as ThreeCanvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { NoToneMapping } from "three";
import CameraRig from "../CameraRig/CameraRig";
import DampenedScrollControl from "../Controls/DampenedScrollControl";
import DiamondGroup from "../DiamondGroup/DiamondGroup";

interface Props {
  scrollContainer: React.RefObject<HTMLDivElement>;
}
const Canvas = ({ scrollContainer }: Props) => (
  <ThreeCanvas
    gl={{
      antialias: true,
      toneMapping: NoToneMapping,
    }}
    camera={{ far: 4000 }}
  >
    <Perf position="top-left" />
    <ambientLight intensity={1} />
    <DampenedScrollControl scrollContainer={scrollContainer} />
    <DiamondGroup />
    <CameraRig />
  </ThreeCanvas>
);

export default Canvas;
