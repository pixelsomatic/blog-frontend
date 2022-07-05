import React from "react";
import { IPost } from "../types/Posts";
import Card from '@mui/material/Card';
import { Typography } from "@mui/material";

type Props = {
  post: IPost
}

const PostCard = ({ post }: Props) => {
  const { title, body } = post

  return (
    <Card sx={{ minWidth: 275, height: 150 }}>
      <Typography variant="h5" component="div">
        {title}
      </Typography>
      <Typography variant="body1" component="div">
        {body}
      </Typography>
    </Card>
  )
}

export default PostCard