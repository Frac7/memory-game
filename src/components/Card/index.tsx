import { FC } from "react";
import { Box, useToken } from "@chakra-ui/react";

import { Card as CardInterface } from "@/store/types";

import "./index.css";

type CardProps = CardInterface & {
  onClick: () => void;
};

const Card: FC<CardProps> = ({ content, flipped, disabled, onClick }) => {
  const canShowImage = flipped && !disabled;
  const canBeClicked = !disabled;

  const [gray500] = useToken("colors", ["gray.500"]);

  return (
    <Box
      className={["card", flipped ? "card--flipped" : "card"].join(" ")}
      width="100px"
      height="100px"
      cursor={canBeClicked ? "pointer" : "initial"}
      onClick={canBeClicked ? onClick : undefined}
      position="relative"
    >
      <Box
        borderRadius="lg"
        width="100%"
        height="100%"
        backgroundColor={canBeClicked ? gray500 : "transparent"}
        position="absolute"
      />
      <Box
        className="card__inner"
        borderRadius="lg"
        width="100%"
        height="100%"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="contain"
        backgroundImage={canShowImage ? `url(${content})` : undefined}
        position="absolute"
        opacity={flipped ? 1 : 0}
      />
    </Box>
  );
};

export default Card;
