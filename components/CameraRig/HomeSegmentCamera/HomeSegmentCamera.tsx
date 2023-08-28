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

    camera.position.x = dampenedValue.current * 1700;
    camera.position.z = 700 - dampenedValue.current * 1700;
  });
  return null;
};

export default HomeSegmentCamera;
