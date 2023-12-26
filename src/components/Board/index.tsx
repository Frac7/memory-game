import {
  Card as ChakraCard,
  CardBody,
  SimpleGrid,
  CardHeader,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useShallow } from "zustand/react/shallow";

import Card from "@/components/Card";
import useMemoryGameStore, {
  gameControllerSelector,
} from "@/store/useMemoryGameStore";

const Board = () => {
  const { score, timer, flips } = useMemoryGameStore(
    useShallow(gameControllerSelector)
  );

  return (
    <ChakraCard variant="filled">
      <CardHeader>
        <Flex justifyContent="space-around">
          <Text>Score: {score}</Text>
          <Text>Flips: {flips}</Text>
          <Text>Timer: {timer}</Text>
        </Flex>
      </CardHeader>
      <CardBody>
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(5, 1fr)"
          templateRows="repeat(2, 1fr)"
        >
          <Card content="Content 1" />
          <Card content="Content 2" />
          <Card content="Content 3" />
          <Card content="Content 4" />
          <Card content="Content 5" />
          <Card content="Content 6" />
          <Card content="Content 7" />
          <Card content="Content 8" />
          <Card content="Content 9" />
          <Card content="Content 10" />
        </SimpleGrid>
      </CardBody>
    </ChakraCard>
  );
};

export default Board;
