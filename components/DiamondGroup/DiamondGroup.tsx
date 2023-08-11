import {
  GradientTexture,
  Instance,
  Instances,
  MeshDistortMaterial,
  useCursor,
  useScroll,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import {
  BufferAttribute,
  BufferGeometry,
  InstancedMesh,
  MathUtils,
} from "three";

// prettier-ignore
const vertices = new Float32Array([
  -0.5,  0,  0, // v0
   0.5,  0,  0, // v1
   0  ,  1,  0, // v2
     
   0.5,  0,  0, // v3
  -0.5,  0,  0, // v4
   0  , -1,  0, // v5
]);

// prettier-ignore
const uvs = new Float32Array([
  0.0, 0.5,   // UV coordinate for Vertex 0
  1.0, 0.5,   // UV coordinate for Vertex 1
  0.5, 1.0,   // UV coordinate for Vertex 2

  1.0, 0.5,   // UV coordinate for Vertex 3
  0.0, 0.5,   // UV coordinate for Vertex 4
  0.5, 0.0,   // UV coordinate for Vertex 5
]);

const centralDiamondPosition: [number, number, number] = [350, 0, 0];

const animationConstants = [
  { offset: Math.PI, speed: 50, radius: 200, yPos: 270 },
  { offset: 0, speed: 20, radius: 350, yPos: 360 },
  { offset: Math.PI, speed: 65, radius: 120, yPos: -125 },
  { offset: Math.PI, speed: 40, radius: 500, yPos: -400 },
  { offset: 0, speed: 100, radius: 300, yPos: -270 },
  { offset: 0, speed: 30, radius: 200, yPos: -215 },
];
// [150, 270, -100],
// [550, 360, 100],
// [265, -125, 70],
// [-125, -445, 200],
// [525, -300, -150],
// [535, -245, 0],

const geometry = new BufferGeometry();
geometry.setAttribute("position", new BufferAttribute(vertices, 3));
geometry.setAttribute("uv", new BufferAttribute(uvs, 2));
geometry.computeVertexNormals();

const DiamondGroup = () => {
  const ref = useRef<{ distort: number }>();

  const diamondRefs = useRef<Array<InstancedMesh | null>>([]);

  const [hovered, hover] = useState(false);

  const scroll = useScroll();

  useFrame(({ camera }) => {
    diamondRefs.current.forEach((ref, i) => {
      if (ref) {
        const { radius, speed, offset, yPos } = animationConstants[i];
        const { offset: scrollOffset } = scroll;

        ref.position.x =
          centralDiamondPosition[0] +
          Math.cos(scrollOffset * speed + offset) * radius;
        ref.position.z =
          centralDiamondPosition[2] +
          Math.sin(scrollOffset * speed + offset) * radius;
        ref.position.y = yPos + Math.cos(scrollOffset * speed + offset) * 50;
      }
    });

    camera.position.x = scroll.offset * 1500;
    camera.position.z = 1000 - scroll.offset * 1500;
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
        // rotation={[0, (Math.PI / 10) * 2, 0]}
        position={centralDiamondPosition}
        scale={[250, 350, 1]}
        geometry={geometry}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
      >
        <MeshDistortMaterial ref={ref} speed={5}>
          <GradientTexture stops={[0, 1]} colors={["#9dfffd", "white"]} />
        </MeshDistortMaterial>
      </mesh>
      <Instances geometry={geometry}>
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
