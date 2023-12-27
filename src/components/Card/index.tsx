import { FC } from "react";
import { Box } from "@chakra-ui/react";

import { Card as CardInterface } from "@/store/types";

type CardProps = CardInterface & {
  onClick: () => void;
};

const Card: FC<CardProps> = ({ content, flipped, disabled, onClick }) => {
  const canShowImage = flipped && !disabled;
  const canBeClicked = !disabled;

  return (
    <Box
      style={{
        width: "100px",
        height: "100px",
        backgroundImage: canShowImage ? `url(${content})` : undefined,
        backgroundSize: "contain",
        backgroundColor: canBeClicked ? "rgba(255,255,255,0.5)" : "transparent",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        cursor: canBeClicked ? "pointer" : "initial",
      }}
      onClick={canBeClicked ? onClick : undefined}
    />
  );
};

export default Card;
