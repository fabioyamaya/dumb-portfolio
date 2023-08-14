import { BufferAttribute, BufferGeometry } from "three";

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

const diamondGeometry = new BufferGeometry();
diamondGeometry.setAttribute("position", new BufferAttribute(vertices, 3));
diamondGeometry.setAttribute("uv", new BufferAttribute(uvs, 2));
diamondGeometry.computeVertexNormals();

export { animationConstants, centralDiamondPosition, diamondGeometry };
