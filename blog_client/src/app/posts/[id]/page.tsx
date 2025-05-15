import type { Post } from "@/types";
import React from "react";
import styles from "../../../styles/Post.module.css";

export async function generateStaticParams() {
  const res = await fetch(`http://127.0.0.1:3001/api/v1/posts`);
  const posts = (await res.json()) as Post[];
  return posts.map((post) => ({ id: post.id.toString() }));
}

const DetailPage = async ({ params }: { params: { id: string } }) => {
  const res = await fetch(`http://127.0.0.1:3001/api/v1/posts/${params.id}`, {
    next: { revalidate: 60 },
  });
  const post = (await res.json()) as Post;
  console.log(post);

  return (
    <div className={styles.container}>
      <div className={styles.title}>{post.title}</div>
      <div className={styles.date}>{post.created_at}</div>
      <div className={styles.content}>{post.content}</div>
    </div>
  );
};

export default DetailPage;
