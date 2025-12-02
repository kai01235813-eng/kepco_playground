export interface IdeaPost {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  upvotes?: number;
  downvotes?: number;
  net_score?: number;
}

export interface IdeaComment {
  id: string;
  postId: string;
  content: string;
  createdAt: number;
}

export { API_BASE } from '../../config/api';




