import { MathUtils } from "three";
import { create } from "zustand";

export enum Segments {
  none = 0,
  home = 0.2,
  introduction = 0.4,
}

interface State {
  dampenedScrollValue: number;
  currentSegment: Segments;
  isAnimatingSegmentTransition: boolean;
}

export enum AnimationStage {
  start,
  end,
}

interface Actions {
  handleIsAnimatingSegmentTransition: (animationStage: AnimationStage) => void;
  updateDampenedScrollValue: (
    target: number,
    delta: number
  ) => number | undefined;
}

const setNewSegment = (newSegment: Segments) => {
  if (useStore.getState().currentSegment === newSegment) return;
  useStore.setState({ currentSegment: newSegment });
};

const handleSegmentSwitch = (
  isAnimatingSegmentTransition: boolean,
  dampenedValue: number,
  isIncreasing: boolean
): number | undefined => {
  if (isAnimatingSegmentTransition) return;
  const currentSegment = useStore.getState().currentSegment;
  if (
    currentSegment === Segments.home &&
    isIncreasing &&
    dampenedValue > Segments.home
  ) {
    setNewSegment(Segments.introduction);
    return Segments.home + 0.1;
  } else if (
    currentSegment === Segments.introduction &&
    !isIncreasing &&
    dampenedValue < Segments.introduction - 0.1
  ) {
    setNewSegment(Segments.home);
    return Segments.introduction - 0.1;
  }
};

const useStore = create<State & Actions>()((set, get) => ({
  dampenedScrollValue: 0,
  updateDampenedScrollValue: (target, delta) => {
    set({
      dampenedScrollValue: MathUtils.damp(
        get().dampenedScrollValue,
        target,
        1.5,
        delta
      ),
    });

    const dampenedValue = get().dampenedScrollValue;
    const newYProgress = handleSegmentSwitch(
      get().isAnimatingSegmentTransition,
      dampenedValue,
      target > dampenedValue
    );
    // console.log(get().dampenedScrollValue);
    return newYProgress;
  },
  currentSegment: Segments.home,
  isAnimatingSegmentTransition: false,
  handleIsAnimatingSegmentTransition: (animationStage: AnimationStage) => {
    if (animationStage === AnimationStage.start)
      set({ isAnimatingSegmentTransition: true });
    else {
      set({ isAnimatingSegmentTransition: false });
    }
  },
}));

export default useStore;
