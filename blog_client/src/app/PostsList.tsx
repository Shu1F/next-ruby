"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "@/styles/Home.module.css";
import { Post } from "@/types";

type Props = {
  posts: Post[];
};

const PostsList = ({ posts }: Props) => {
  const router = useRouter();

  // 削除ボタン用
  const handleDelete = async (postId: string) => {
    try {
      await axios.delete(`http://127.0.0.1:3001/api/v1/posts/${postId}`);
      router.refresh(); // 一覧だけ最新化
    } catch {
      alert("削除に失敗しました");
    }
  };

  /* ▼▼▼ ここから下はご指定どおり一切変更なし ▼▼▼ */
  return (
    <div className={styles.homeContainer}>
      <h2>Rails &amp; Next.js Blog</h2>
      <Link href="/create-post" className={styles.createButton}>
        Create new Post
      </Link>
      {posts.map((post: Post) => (
        <div key={post.id} className={styles.postCard}>
          <Link href={`posts/${post.id}`} className={styles.postCardBox}>
            <h2>{post.title}</h2>
          </Link>
          <p>{post.content}</p>
          <Link href={`/edit-post/${post.id}`}>
            <button className={styles.editButton}>Edit</button>
          </Link>
          <button
            className={styles.deleteButton}
            onClick={() => handleDelete(post.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default PostsList;
