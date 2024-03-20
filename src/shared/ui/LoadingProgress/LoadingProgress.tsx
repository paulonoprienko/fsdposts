import { CircularProgress } from "@mui/material";
import React from "react";
import css from "./LoadingProgress.module.css";

export const LoadingProgress = React.forwardRef<HTMLDivElement | null>((_, ref) => {
  return (
    <div className={css.progressWrap} ref={ref}>
      <CircularProgress />
    </div>
  );
});
