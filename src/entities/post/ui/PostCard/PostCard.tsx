import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { ReactElement } from "react";
import { useParams } from "react-router-dom";
import { LoadingProgress } from "@/shared/ui/LoadingProgress/LoadingProgress";
import { useGetSinglePostQuery } from "../..";

type Props = {
  actionSlot: ReactElement;
};

export const PostCard = ({ actionSlot }: Props) => {
  const { postId } = useParams();
  const { data: post = null, isLoading } = useGetSinglePostQuery(
    { postId },
    { refetchOnReconnect: true },
  );
  return (
    <Card sx={{ maxWidth: "100%", background: "#eff4ff" }}>
      <CardActions>{actionSlot}</CardActions>
      <CardContent>
        {isLoading ? (
          <LoadingProgress />
        ) : (
          <>
            <Typography gutterBottom variant="h5" component="div">
              {post?.title}
            </Typography>
            <Typography color="text.secondary">{post?.body}</Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};
