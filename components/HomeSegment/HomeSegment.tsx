import { AnimationStage } from "@/pages";
import { Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import ScrollDownIcon from "../ScrollDownIcon/ScrollDownIcon";

const variants = {
  hide: {
    transition: { staggerChildren: 0.1, staggerDirection: -1 },
  },
  show: {
    transition: { staggerChildren: 0.2 },
  },
};

const item = {
  hide: {
    opacity: 0,
    y: +70,
    atrrY: +70,
    transition: {
      duration: 0.7,
      ease: [0.2, 0.59, 0.13, 0.94],
    },
  },
  show: {
    opacity: 1,
    y: 0,
    attrY: 0,
    transition: {
      duration: 1,
      ease: [0.2, 0.59, 0.13, 0.94],
    },
  },
};

const sillyTerms = [
  "software building",
  "innovative bug designing",
  "exception dodging",
  "commit squashing",
  "binary ballet",
  "algorithm alchemy",
  "code cuisine",
  "syntax sorcery",
  "function fandango",
  "API acrobatics",
  "freestyle debugging",
  "loop symphonies",
  "; DROP TABLE users;",
  "keyboard mashing",
];

interface Props {
  handleAnimationCycle: (animationStage: AnimationStage) => void;
}
const MotionScrollDownIcon = motion(ScrollDownIcon);

const HomeSegment = React.forwardRef<HTMLDivElement, Props>(
  ({ handleAnimationCycle }, ref) => {
    const [currentTermIndex, setCurrentTermIndex] = useState<number>(0);

    useEffect(() => {
      const termsIntervalId = setInterval(() => {
        setCurrentTermIndex((prevIndex) => (prevIndex + 1) % sillyTerms.length);
      }, 5000);

      return () => {
        clearInterval(termsIntervalId);
      };
    }, []);

    return (
      <SimpleGrid
        ref={ref}
        column={2}
        className="absolute left-0 top-0 mx-36 my-auto flex h-full w-1/2 content-center"
      >
        <Flex
          as={motion.div}
          variants={variants}
          initial="hide"
          animate="show"
          exit="hide"
          className="min-h-[500px] flex-col items-start justify-between"
          onAnimationComplete={() => {
            handleAnimationCycle(AnimationStage.end);
          }}
          onAnimationStart={() => {
            handleAnimationCycle(AnimationStage.start);
          }}
        >
          <Flex className="flex-col items-end">
            <motion.h1
              variants={item}
              className="text-7xl font-bold tracking-tighter"
            >
              hey, &nbsp;I&apos;m Fábio Yamaya
            </motion.h1>
            <Text
              as={motion.i}
              key={currentTermIndex}
              variants={item}
              className="leading font-thin text-slate-500"
              fontSize={"2xl"}
            >
              I do some {sillyTerms[currentTermIndex]}
            </Text>
          </Flex>
          <Text
            as={motion.p}
            variants={item}
            className="font-thin leading-tight"
            fontSize={"5xl"}
          >
            and this is my take <br />
            on a dumb portfolio
          </Text>
          <MotionScrollDownIcon variants={item} />
        </Flex>
      </SimpleGrid>
    );
  }
);

HomeSegment.displayName = "HomeSegments";

export default HomeSegment;
