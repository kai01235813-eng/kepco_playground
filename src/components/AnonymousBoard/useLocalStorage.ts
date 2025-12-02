import { useCallback, useEffect, useState } from 'react';
import { API_BASE } from '../../config/api';

export type PostCategory = 'suggestion' | 'proposal';

export interface Post {
  id: string;
  category: PostCategory;
  content: string;
  password: string;
  createdAt: number;
}

export const useLocalStoragePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/anonymous-posts`);
      if (!res.ok) throw new Error('Failed to load posts');
      const data = (await res.json()) as Post[];
      setPosts(data);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchPosts();
  }, [fetchPosts]);

  const addPost = async (
    category: PostCategory,
    content: string,
    password: string
  ) => {
    try {
      // 로그인한 사용자 정보 가져오기
      let employeeId: string | undefined;
      try {
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          employeeId = user.employeeId;
        }
      } catch {
        // 로그인 정보가 없으면 무시
      }
      
      const res = await fetch(`${API_BASE}/anonymous-posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, content, password, employeeId })
      });
      if (!res.ok) throw new Error('Failed to create post');
      const created = (await res.json()) as Post;
      setPosts((prev) => [created, ...prev]);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  const updatePost = async (id: string, newContent: string) => {
    const target = posts.find((p) => p.id === id);
    if (!target) return;
    try {
      const res = await fetch(`${API_BASE}/anonymous-posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newContent, password: target.password })
      });
      if (!res.ok) throw new Error('Failed to update post');
      setPosts((prev) =>
        prev.map((post) => (post.id === id ? { ...post, content: newContent } : post))
      );
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  const deletePost = async (id: string) => {
    const target = posts.find((p) => p.id === id);
    if (!target) return;
    try {
      const res = await fetch(`${API_BASE}/anonymous-posts/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: target.password })
      });
      if (!res.ok) throw new Error('Failed to delete post');
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  const checkPassword = (id: string, password: string): boolean => {
    const post = posts.find((p) => p.id === id);
    if (!post) return false;
    return post.password === password;
  };

  return {
    posts,
    loading,
    addPost,
    updatePost,
    deletePost,
    checkPassword
  };
};

