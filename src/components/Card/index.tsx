import { FC } from "react";
import { CardBody, Card as ChakraCard } from "@chakra-ui/react";

import { Card as CardInterface } from "@/store/types";

interface CardProps extends CardInterface {}

const Card: FC<CardProps> = ({ content }) => {
  return (
    <ChakraCard>
      <CardBody>{content}</CardBody>
    </ChakraCard>
  );
};

export default Card;
