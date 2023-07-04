import {
  GradientTexture,
  Instance,
  Instances,
  MeshDistortMaterial,
  useCursor,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { BufferAttribute, BufferGeometry, MathUtils } from "three";

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

const geometry = new BufferGeometry();
geometry.setAttribute("position", new BufferAttribute(vertices, 3));
geometry.setAttribute("uv", new BufferAttribute(uvs, 2));
geometry.computeVertexNormals();

const DiamondGroup = () => {
  const ref = useRef<{ distort: number }>();
  const [hovered, hover] = useState(false);

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
        rotation={[0, (Math.PI / 10) * 2, 0]}
        position={[350, 0, 0]}
        scale={[300, 300, 1]}
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
        <Instance scale={[40, 35, 1]} position={[150, 270, -100]} />
        <Instance scale={[100, 110, 1]} position={[550, 360, 100]} />
        <Instance scale={[60, 60, 1]} position={[265, -125, 70]} />
        <Instance scale={[100, 100, 1]} position={[-125, -445, 200]} />
        <Instance scale={[40, 40, 1]} position={[525, -300, -150]} />
        <Instance scale={[10, 10, 1]} position={[535, -245, 0]} />
      </Instances>
    </>
  );
};
export default DiamondGroup;
