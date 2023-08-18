import { MeshPortalMaterial, PortalMaterialType } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { MathUtils } from "three";
import {
  centralDiamondPosition,
  diamondGeometry,
} from "../DiamondGroup/constants";

interface Props {
  isInsidePortal: boolean;
}

const DiamondPortal = ({ isInsidePortal }: Props) => {
  const portalRef = useRef<PortalMaterialType | null>(null);
  useFrame((_, delta) => {
    let dampenedBlend = 0;
    if (portalRef?.current) {
      dampenedBlend = parseFloat(
        MathUtils.damp(
          portalRef.current.blend,
          isInsidePortal ? 1 : 0,
          5,
          delta
        ).toFixed(5)
      );

      if (dampenedBlend <= 0.003) portalRef.current.blend = 0;
      else portalRef.current.blend = dampenedBlend;
    }
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
