import React from "react";
import { IPost } from "../types/Posts";

type Props = {
  post: IPost
}

const Card = ({ post }: Props) => {
  const { title } = post

  return (
    <div className="Card">
      <h1>{title}</h1>
    </div>
  )
}

export default Card