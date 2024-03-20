import { Button, styled } from "@mui/material";
import { type MouseEventHandler, ReactNode } from "react";
import { useLinkClickHandler } from "react-router-dom";

export const ButtonLink = ({ to, children, ...rest }: { to: string; children: ReactNode }) => {
  const handleClick = useLinkClickHandler(to) as MouseEventHandler<HTMLButtonElement>;
  const UnsetWidthButton = styled(Button)({
    minWidth: "unset",
  });
  return (
    <UnsetWidthButton onClick={handleClick} variant="outlined" size="small" {...rest}>
      {children}
    </UnsetWidthButton>
  );
};
