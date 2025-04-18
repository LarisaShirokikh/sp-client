// src/lib/hooks/useForum.ts
import { useState, useEffect, useCallback } from 'react';
import { ForumApiService } from '@/services/forumApiService';
import { TopicApiService } from '@/services/topicApiService';
import { Category, Topic } from '../interface/topic';

interface ForumState {
  topics: Topic[];
  categories: Category[];
  loading: {
    topics: boolean;
    categories: boolean;
  };
  error: {
    topics: string | null;
    categories: string | null;
  };
}

export const useForum = () => {
  const [state, setState] = useState<ForumState>({
    topics: [],
    categories: [],
    loading: {
      topics: true,
      categories: true
    },
    error: {
      topics: null,
      categories: null
    }
  });

  const fetchCategories = useCallback(async () => {
    try {
      setState(prev => ({
        ...prev,
        loading: { ...prev.loading, categories: true },
        error: { ...prev.error, categories: null }
      }));

      const categories = await ForumApiService.getCategories();

      setState(prev => ({
        ...prev,
        categories,
        loading: { ...prev.loading, categories: false }
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setState(prev => ({
        ...prev,
        loading: { ...prev.loading, categories: false },
        error: { ...prev.error, categories: errorMessage }
      }));
    }
  }, []);

  const fetchTopics = useCallback(async () => {
    try {
      setState(prev => ({
        ...prev,
        loading: { ...prev.loading, topics: true },
        error: { ...prev.error, topics: null }
      }));

      const topics = await TopicApiService.getAllTopics();



      setState(prev => ({
        ...prev,
        topics,
        loading: { ...prev.loading, topics: false }
      }));
    } catch (error) {
      console.error("Failed to fetch topics:", error);
      setState(prev => ({
        ...prev,
        loading: { ...prev.loading, topics: false },
        error: {
          ...prev.error,
          topics: error instanceof Error ? error.message : 'Unknown error fetching topics'
        }
      }));
    }
  }, []);

  const createTopic = useCallback(async (
    formData: FormData
  ) => {
    try {
      const newTopic = await TopicApiService.createTopic(formData);

      setState(prev => ({
        ...prev,
        topics: [...prev.topics, newTopic]
      }));

      return newTopic;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(errorMessage);
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchCategories();
    fetchTopics();
  }, [fetchCategories, fetchTopics]);

  return {
    ...state,
    fetchCategories,
    fetchTopics,
    createTopic
  };
};