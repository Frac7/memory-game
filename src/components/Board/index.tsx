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
import useGameStore, {
  gameControllerSelector,
} from "@/store/useGameStore";
import useCardsStore, {
  cardsSelector,
} from "@/store/useCardsStore";

import Timer from "../Timer";

const Board = () => {
  const { score, flips, handleFlip } = useGameStore(
    useShallow(gameControllerSelector)
  );
  const cards = useCardsStore(useShallow(cardsSelector));

  return (
    <ChakraCard variant="filled">
      <CardHeader>
        <Flex justifyContent="space-around">
          <Text>Score: {score}</Text>
          <Text>Flips: {flips}</Text>
          <Timer />
        </Flex>
      </CardHeader>
      <CardBody>
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(5, 1fr)"
          templateRows="repeat(2, 1fr)"
        >
          {cards.map((card, i) => (
            <Card key={i} onClick={() => handleFlip(i)} {...card} />
          ))}
        </SimpleGrid>
      </CardBody>
    </ChakraCard>
  );
};

export default Board;
