import useStore, { Segments } from "@/state/UseStore";
import { MeshPortalMaterial, PortalMaterialType } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { MathUtils } from "three";
import {
  centralDiamondPosition,
  diamondGeometry,
} from "../DiamondGroup/constants";

const DiamondPortal = () => {
  const currentSegment = useStore((state) => state.currentSegment);
  const portalRef = useRef<PortalMaterialType | null>(null);
  useFrame((_, delta) => {
    if (portalRef?.current)
      portalRef.current.blend = MathUtils.damp(
        portalRef.current.blend,
        currentSegment === Segments.introduction ||
          currentSegment === Segments.transition
          ? 1
          : 0,
        5,
        delta
      );
  });

  return (
    <mesh
      position={centralDiamondPosition}
      scale={[250, 350, 1]}
      geometry={diamondGeometry}
    >
      <MeshPortalMaterial ref={portalRef}>
        <color attach="background" args={["#9dfffd"]} />
      </MeshPortalMaterial>
    </mesh>
  );
};

export default DiamondPortal;
