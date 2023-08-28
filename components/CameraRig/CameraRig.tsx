import useStore, { Segments } from "@/state/UseStore";
import HomeSegmentCamera from "./HomeSegmentCamera/HomeSegmentCamera";
import TransitionCamera from "./TransitionCamera/TransitionCamera";

const CameraRig = () => {
  const segment = useStore((state) => state.currentSegment);

  return (
    <>
      {segment === Segments.home && <HomeSegmentCamera />}
      {segment === Segments.transition && <TransitionCamera />}
    </>
  );
};

export default CameraRig;
