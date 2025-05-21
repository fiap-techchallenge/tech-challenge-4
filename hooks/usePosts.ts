import { useEffect, useState } from "react";
import axios from "axios";
import {
  createPosts,
  deletePosts,
  getPosts,
  updatePosts,
} from "@/app/api/index";

interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author: string;
  createdAt: string;
}

// Create a shared fetchPosts function
const fetchPosts = async () => {
  return await getPosts();
};

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   getPosts();
  // }, []);

  const getPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchPosts();
      setPosts(data);
    } catch (err) {
      setError("Failed to fetch posts");
    } finally {
      setIsLoading(false);
    }
  };

  const updatePost = async (post: Post, postId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedPost = await updatePosts(post, postId);
      setPosts((prevPosts) =>
        prevPosts.map((p) => (p.id === postId ? updatedPost.data : p))
      );
    } catch (err) {
      setError("Failed to update post");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deletePost = async (postId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      deletePosts(postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (err) {
      setError("Failed to delete post");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    posts,
    isLoading,
    error,
    deletePost,
    refetch: getPosts,
    updatePost,
  };
}

export function useCreatePost() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPost = async (post: Omit<Post, "id" | "createdAt">) => {
    try {
      setIsLoading(true);
      setError(null);

      await createPosts(post);

      await fetchPosts();
    } catch (err) {
      setError("Failed to create post");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { createPost, isLoading, error };
}
