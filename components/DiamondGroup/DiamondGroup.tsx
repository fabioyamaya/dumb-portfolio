import { useProgressValue } from "@/contexts/ProgressValueContext";
import { Segments } from "@/pages";
import {
  GradientTexture,
  Instance,
  Instances,
  MeshDistortMaterial,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { InstancedMesh } from "three";
import DiamondPortal from "../DiamondPortal/DiamondPortal";
import {
  animationConstants,
  centralDiamondPosition,
  diamondGeometry,
} from "./constants";

interface Props {
  currentSegment: Segments;
}
const DiamondGroup = ({ currentSegment }: Props) => {
  const diamondRefs = useRef<Array<InstancedMesh | null>>([]);

  const { getDampenedValue } = useProgressValue();

  useFrame(({ camera }) => {
    const dampenedValue = getDampenedValue();

    diamondRefs.current.forEach((ref, i) => {
      if (ref) {
        const { radius, speed, offset, yPos } = animationConstants[i];

        ref.position.x =
          centralDiamondPosition[0] +
          Math.cos(dampenedValue * speed + offset) * radius;
        ref.position.z =
          centralDiamondPosition[2] +
          Math.sin(dampenedValue * speed + offset) * radius;
        ref.position.y = yPos + Math.cos(dampenedValue * speed + offset) * 50;
      }
    });

    if (dampenedValue < Segments.home) {
      camera.position.x = dampenedValue * 1700;
      camera.position.z = 700 - dampenedValue * 1700;
    }
  });

  return (
    <>
      <DiamondPortal
        isInsidePortal={currentSegment === Segments.introduction}
      />
      <Instances geometry={diamondGeometry}>
        <MeshDistortMaterial speed={3}>
          <GradientTexture
            stops={[0, 0.5, 1]}
            colors={["#85fff9", "#f5d6ff", "#ffeecf"]}
          />
        </MeshDistortMaterial>
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
