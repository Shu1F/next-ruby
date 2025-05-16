import type { Post } from "@/types";
import EditPostForm from "./EditPostForm";

export const dynamic = "force-dynamic";

type PageProps = {
  params: { id: string };
};

const EditPostPage = async ({ params }: PageProps) => {
  const res = await fetch(`http://127.0.0.1:3001/api/v1/posts/${params.id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("編集に失敗しました");
  }

  const post: Post = await res.json();

  return <EditPostForm post={post} />;
};

export default EditPostPage;
