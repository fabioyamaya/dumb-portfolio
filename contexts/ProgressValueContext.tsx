import { ReactNode, createContext, useContext, useRef } from "react";
import { MathUtils } from "three";

interface ProgressValueContext {
  dampenedScrollValue: number;
  updateDampenedValue: (target: number, detal: number) => number;
  getDampenedValue: () => number;
}

const ProgressValueContext = createContext<ProgressValueContext | undefined>(
  undefined
);

export const ProgressValueContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const dampenedScrollValue = useRef<number>(0);

  const updateDampenedValue = (target: number, delta: number): number => {
    dampenedScrollValue.current = MathUtils.damp(
      dampenedScrollValue.current,
      target,
      1,
      delta
    );
    return dampenedScrollValue.current;
  };

  const getDampenedValue = () => {
    return dampenedScrollValue.current;
  };

  return (
    <ProgressValueContext.Provider
      value={{
        dampenedScrollValue: dampenedScrollValue.current,
        updateDampenedValue,
        getDampenedValue,
      }}
    >
      {children}
    </ProgressValueContext.Provider>
  );
};

export const useProgressValue = () => {
  const context = useContext(ProgressValueContext);

  if (context === undefined) {
    throw new Error(
      "useProgressValue must be used within an ProgressValueContextProvider"
    );
  }

  return context;
};
