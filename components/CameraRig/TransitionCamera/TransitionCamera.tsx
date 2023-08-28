import useStore from "@/state/UseStore";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";

const HomeSegmentCamera = () => {
  const dampenedValue = useRef<number>(useStore.getState().dampenedScrollValue);

  useEffect(
    () =>
      useStore.subscribe(
        (state) => (dampenedValue.current = state.dampenedScrollValue)
      ),
    []
  );
  useFrame((state) => {
    const { camera } = state;
    camera.position.z -= dampenedValue.current * 10;
  });
  return null;
};

export default HomeSegmentCamera;
