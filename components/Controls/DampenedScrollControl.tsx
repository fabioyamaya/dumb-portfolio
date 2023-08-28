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
    updateDampenedValue(scrollYProgress.get(), delta);
  });

  return null;
};

export default DampenedScrollControl;
