import { Flex, Icon, SimpleGrid, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { HiChevronDoubleDown } from "react-icons/hi";

const variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: +70,
    atrrY: +70,
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

const MotionChakraIcon = motion(
  React.forwardRef<HTMLDivElement>(function ChevronDownIcon(_props, ref) {
    return (
      <div ref={ref}>
        <Icon as={HiChevronDoubleDown} boxSize={"10"} />
      </div>
    );
  }),
  { forwardMotionProps: true }
);

const HomeSegment = () => {
  return (
    <SimpleGrid
      column={2}
      className="absolute left-0 top-0 mx-36 my-auto flex h-full w-1/2 content-center"
    >
      <Flex
        as={motion.div}
        variants={variants}
        initial="hidden"
        animate="show"
        className="min-h-[500px] flex-col items-start justify-between"
      >
        <Flex className="flex-col items-end">
          <motion.h1
            variants={item}
            className="text-7xl font-bold tracking-tighter"
          >
            Hey, I&apos;m Fabio Yamaya
          </motion.h1>
          <Text
            as={motion.i}
            variants={item}
            className="leading font-thin text-slate-500"
            fontSize={"2xl"}
          >
            I do some frontend stuff
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
        <MotionChakraIcon variants={item} />
      </Flex>
    </SimpleGrid>
  );
};

export default HomeSegment;
