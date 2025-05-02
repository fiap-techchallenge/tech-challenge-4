import { useState, useEffect } from 'react';

interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
}

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      // Simulated API response
      const mockPosts = [
        {
          id: '1',
          title: 'Introduction to React Native',
          content: 'Learn the basics of React Native development...',
          authorId: '1',
          authorName: 'Admin Teacher',
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Advanced JavaScript Concepts',
          content: 'Deep dive into JavaScript concepts...',
          authorId: '1',
          authorName: 'Admin Teacher',
          createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        },
        {
          id: '3',
          title: 'Web Development Fundamentals',
          content: 'Understanding the basics of web development...',
          authorId: '2',
          authorName: 'Demo Student',
          createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        },
      ];
      
      setPosts(mockPosts);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to fetch posts');
      setIsLoading(false);
    }
  };

  const deletePost = async (postId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPosts(current => current.filter(post => post.id !== postId));
    } catch (err) {
      setError('Failed to delete post');
      throw err;
    }
  };

  return { posts, isLoading, error, deletePost };
}

export function useCreatePost() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPost = async (post: Omit<Post, 'id' | 'createdAt' | 'authorName'>) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
    } catch (err) {
      setError('Failed to create post');
      setIsLoading(false);
      throw err;
    }
  };

  return { createPost, isLoading, error };
}