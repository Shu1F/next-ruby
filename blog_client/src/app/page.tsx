import { Post } from "@/types";
import PostsList from "./PostsList"; // ← ②で示す Client Component

export const dynamic = "force-dynamic"; // いつでも最新を取得したい場合

const PostsPage = async () => {
  const res = await fetch(
    "http://127.0.0.1:3001/api/v1/posts",
    { cache: "no-store" } // ISR キャッシュ無効
  );

  if (!res.ok) throw new Error("記事取得に失敗しました");

  const posts: Post[] = await res.json();

  return <PostsList posts={posts} />; // ②へ丸投げ
};

export default PostsPage;
