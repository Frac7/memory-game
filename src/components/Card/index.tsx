import { Card as ChakraCard, CardBody } from "@chakra-ui/react";
import { FC } from "react";

interface CardProps {
  content: string;
}

const Card: FC<CardProps> = ({ content }) => {
  return (
    <ChakraCard>
      <CardBody>{content}</CardBody>
    </ChakraCard>
  );
};

export default Card;
