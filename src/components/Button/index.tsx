import React from "react";

import { ButtonRounded } from "./Button.styles";

const Button = ({ onClick, text }: { onClick: any; text: string }) => {
  return <ButtonRounded onClick={onClick}>{text}</ButtonRounded>;
};

export default Button;
