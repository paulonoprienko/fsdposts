import { Typography } from "@mui/material";
import { ReactElement } from "react";
import { type Post } from "../../model/types";
import css from "./PostListItem.module.css";

type Props = {
  linkSlot?: ReactElement;
} & Post;

export const PostListItem = ({ id, title, body, linkSlot }: Props) => {
  return (
    <div className={css.row}>
      <div className={css.itemDesc}>
        <Typography component="span">
          {id}. <b>{title}</b> <i>{body}</i>
        </Typography>
      </div>
      {linkSlot}
    </div>
  );
};
