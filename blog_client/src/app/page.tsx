import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { Post } from "@/types";

type Props = {
  posts: Post[];
};

// app/posts/page.tsx
export default async function PostsPage() {
  const res = await fetch("http://127.0.0.1:3001/api/v1/posts", {
    next: { revalidate: 60 },
  });

  const posts = await res.json();

  return (
    <div className={styles.homeContainer}>
      <h2>Rails & Next.js Blog</h2>
      <Link href="/create-post" className={styles.createButton}>
        Create new Post
      </Link>
      {posts.map((post: Post) => (
        <div key={post.id} className={styles.postCard}>
          <Link href={`posts/${post.id}`} className={styles.postCardBox}>
            <h2>{post.title}</h2>
          </Link>
          <p>{post.content}</p>
          <button className={styles.editButton}>Edit</button>
          <button className={styles.deleteButton}>Delete</button>
        </div>
      ))}
    </div>
  );
}
