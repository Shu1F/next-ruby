"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from "../../../styles/Home.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Post } from "@/types";

type Props = {
  post: Post;
};

const EditPostForm = ({ post }: Props) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // API叩く
    try {
      const res = await axios.put(
        `http://127.0.0.1:3001/api/v1/posts/${post.id}`,
        { title, content }
      );
      if (res.status === 200) {
        router.push("/");
        router.refresh();
      } else {
        alert("Error Edit Post");
      }
    } catch (err) {
      console.error(err);
      alert("編集に失敗しました");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ブログの編集</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>タイトル</label>
        <input
          type="text"
          className={styles.input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          value={title}
        />
        <label className={styles.label}>本文</label>
        <textarea
          className={styles.textarea}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
          value={content}
        />
        <button type="submit" className={styles.button}>
          投稿
        </button>
      </form>
    </div>
  );
};

export default EditPostForm;
