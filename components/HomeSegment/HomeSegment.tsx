import { Flex, Heading, Icon, SimpleGrid, Text } from "@chakra-ui/react";
import { HiChevronDoubleDown } from "react-icons/hi";

const HomeSegment = () => {
  return (
    <SimpleGrid
      column={2}
      className="mx-36 my-auto flex h-full w-1/2 content-center "
    >
      <Flex className="min-h-[500px] flex-col items-start justify-between">
        <Flex className="flex-col items-end">
          <Heading as="h1" size={"4xl"}>
            Hey, I&apos;m Fabio Yamaya
          </Heading>
          <Text className="font-thin text-slate-500" fontSize={"2xl"} as="i">
            I do some frontend stuff
          </Text>
        </Flex>
        <Text className="font-thin" fontSize={"5xl"}>
          and this is my take <br />
          on a dumb portfolio
        </Text>
        <Icon as={HiChevronDoubleDown} boxSize={"10"} />
      </Flex>
    </SimpleGrid>
  );
};

export default HomeSegment;
