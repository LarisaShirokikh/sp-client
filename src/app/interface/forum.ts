import { Dispatch, SetStateAction } from 'react';
import { Category, CreateReplyData, CreateTopicData, Reply, Topic } from './topic';

// Interface for category colors mapping
interface CategoryColors {
  [key: string]: string;
  default: string;
}

// Interface for loading states
interface LoadingState {
  topics: boolean;
  topic: boolean;
  categories: boolean;
  replies: boolean;
}

// Interface for error states
interface ErrorState {
  topics: string | null;
  topic: string | null;
  categories: string | null;
  replies: string | null;
  createTopic: string | null;
  createReply: string | null;
}

// Interface for forum context
export interface ForumContextType {
  // Data
  topics: Topic[];
  processedTopics: Topic[];
  currentTopic: Topic | null;
  categories: Category[];
  replies: Reply[];
  categoryColors: CategoryColors;

  // State
  loading: LoadingState;
  error: ErrorState;

  // Filters and pagination
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  categoryFilter: number | null;
  setCategoryFilter: Dispatch<SetStateAction<number | null>>;
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>>;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalPages: number;

  // Actions
  fetchTopics: () => Promise<void>;
  fetchTopic: (id: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchReplies: (topicId: string) => Promise<void>;
  createTopic: (data: CreateTopicData) => Promise<number | null>;
  createReply: (data: CreateReplyData) => Promise<boolean>;
  likeTopic: (topicId: number) => Promise<void>;
  likeReply: (replyId: number) => Promise<void>;

  // Utilities
  formatDate: (dateString: string) => string;
  isHotTopic: (topic: Topic) => boolean;
  clearErrors: () => void;
}