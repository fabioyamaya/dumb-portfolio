import {
  GradientTexture,
  Instance,
  Instances,
  MeshDistortMaterial,
  useCursor,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "framer-motion";
import { useRef, useState } from "react";
import { InstancedMesh, MathUtils } from "three";
import {
  animationConstants,
  centralDiamondPosition,
  diamondGeometry,
} from "./constants";

interface Props {
  scrollContainer: React.RefObject<HTMLDivElement>;
}
const DiamondGroup = ({ scrollContainer }: Props) => {
  const ref = useRef<{ distort: number }>();

  const diamondRefs = useRef<Array<InstancedMesh | null>>([]);

  const [hovered, hover] = useState(false);

  const { scrollYProgress } = useScroll({ container: scrollContainer });

  const dampenedValue = useRef<number>(0);

  useFrame(({ camera }, delta) => {
    dampenedValue.current = MathUtils.damp(
      dampenedValue.current,
      scrollYProgress.get(),
      1,
      delta
    );

    const { current } = dampenedValue;
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

  useCursor(hovered, "default");
  useFrame(() => {
    if (ref?.current)
      ref.current.distort = MathUtils.lerp(
        ref?.current?.distort,
        hovered ? 0.4 : 0,
        hovered ? 0.05 : 0.01
      );
  });

  return (
    <>
      <mesh
        position={centralDiamondPosition}
        scale={[250, 350, 1]}
        geometry={diamondGeometry}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
      >
        <MeshDistortMaterial ref={ref} speed={6}>
          <GradientTexture stops={[0, 1]} colors={["#9dfffd", "white"]} />
        </MeshDistortMaterial>
      </mesh>
      <Instances geometry={diamondGeometry}>
        <meshBasicMaterial>
          <GradientTexture
            stops={[0, 0.5, 1]}
            colors={["#85fff9", "#f0bdff", "#ffda97ff"]}
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
