import useStore from "@/state/UseStore";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "framer-motion";

interface Props {
  scrollContainer: React.RefObject<HTMLDivElement>;
}

const DampenedScrollControl = ({ scrollContainer }: Props) => {
  const { scrollYProgress } = useScroll({ container: scrollContainer });

  const updateDampenedValue = useStore(
    (state) => state.updateDampenedScrollValue
  );

  useFrame((_, delta) => {
    // console.log(scrollYProgress.get());
    const newYProgress = updateDampenedValue(scrollYProgress.get(), delta);
    if (newYProgress) scrollYProgress.set(newYProgress);
  });

  return null;
};

export default DampenedScrollControl;
