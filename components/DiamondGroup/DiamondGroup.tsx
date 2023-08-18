import { Segments } from "@/pages";
import { GradientTexture, Instance, Instances } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "framer-motion";
import { useRef } from "react";
import { InstancedMesh, MathUtils } from "three";
import DiamondPortal from "../DiamondPortal/DiamondPortal";
import {
  animationConstants,
  centralDiamondPosition,
  diamondGeometry,
} from "./constants";

interface Props {
  scrollContainer: React.RefObject<HTMLDivElement>;
  currentSegment: Segments;
}
const DiamondGroup = ({ scrollContainer, currentSegment }: Props) => {
  // const ref = useRef<{ distort: number }>();

  const diamondRefs = useRef<Array<InstancedMesh | null>>([]);

  // const [hovered, hover] = useState(false);

  const { scrollYProgress } = useScroll({ container: scrollContainer });

  const dampenedScrollValue = useRef<number>(0);

  useFrame(({ camera }, delta) => {
    dampenedScrollValue.current = MathUtils.damp(
      dampenedScrollValue.current,
      scrollYProgress.get(),
      1,
      delta
    );

    const { current } = dampenedScrollValue;
    diamondRefs.current.forEach((ref, i) => {
      if (ref) {
        const { radius, speed, offset, yPos } = animationConstants[i];

        ref.position.x =
          centralDiamondPosition[0] +
          Math.cos(current * speed + offset) * radius;
        ref.position.z =
          centralDiamondPosition[2] +
          Math.sin(current * speed + offset) * radius;
        ref.position.y = yPos + Math.cos(current * speed + offset) * 50;
      }
    });

    camera.position.x = current * 1700;
    camera.position.z = 1000 - current * 1700;
  });

  // useCursor(hovered, "default");
  // useFrame(() => {
  //   if (ref?.current)
  //     ref.current.distort = MathUtils.lerp(
  //       ref?.current?.distort,
  //       hovered ? 0.4 : 0,
  //       hovered ? 0.05 : 0.01
  //     );
  // });

  return (
    <>
      <DiamondPortal
        isInsidePortal={currentSegment === Segments.introduction}
      />
      <Instances geometry={diamondGeometry}>
        <meshBasicMaterial>
          <GradientTexture
            stops={[0, 0.5, 1]}
            colors={["#85fff9", "#f5d6ff", "#ffeecf"]}
          />
        </meshBasicMaterial>
        <Instance
          ref={(ref: InstancedMesh) => (diamondRefs.current[0] = ref)}
          scale={[40, 35, 1]}
          position={[0, 270, 0]}
        />
        <Instance
          ref={(ref: InstancedMesh) => (diamondRefs.current[1] = ref)}
          scale={[100, 110, 1]}
          position={[0, 360, 0]}
        />
        <Instance
          ref={(ref: InstancedMesh) => (diamondRefs.current[2] = ref)}
          scale={[60, 60, 1]}
          position={[0, -125, 0]}
        />
        <Instance
          ref={(ref: InstancedMesh) => (diamondRefs.current[3] = ref)}
          scale={[100, 100, 1]}
          position={[0, -445, 0]}
        />
        <Instance
          ref={(ref: InstancedMesh) => (diamondRefs.current[4] = ref)}
          scale={[40, 40, 1]}
          position={[0, -300, 0]}
        />
        <Instance
          ref={(ref: InstancedMesh) => (diamondRefs.current[5] = ref)}
          scale={[10, 10, 1]}
          position={[0, -245, 0]}
        />
      </Instances>
    </>
  );
};
export default DiamondGroup;
