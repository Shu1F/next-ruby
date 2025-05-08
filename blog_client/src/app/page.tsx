import Image from "next/image";
import styles from "./page.module.css";

// app/posts/page.tsx
export default async function PostsPage() {
  const res = await fetch("http://127.0.0.1:3001/api/v1/posts", {
    next: { revalidate: 60 },
  });

  const posts = await res.json();

  return (
    <div>
      {posts.map((p: any) => (
        <div key={p.id}>
          <div>{p.title}</div>
          <div>{p.content}</div>
        </div>
      ))}
    </div>
  );
}
