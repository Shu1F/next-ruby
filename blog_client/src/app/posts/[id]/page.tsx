import type { Post } from "@/types";
import React from "react";

type Props = {
  post: Post;
};

export async function DetailPage({ params }: { params: { id: string } }) {
  const res = await fetch(`http://127.0.0.1:3001/api/v1/posts/${params.id}`);
  const post = await res.json();
  return {};
}

const Post = ({ post }: Props) => {
  return <div>詳細ページです</div>;
};

export default Post;
