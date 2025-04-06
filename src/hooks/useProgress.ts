import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export const useProgress = () => {
  const { user } = useAuth();
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [currentTopicId, setCurrentTopicId] = useState<string>('basic-tags');

  // Load saved progress on initial load
  useEffect(() => {
    if (user) {
      const savedTopics = localStorage.getItem('completedTopics');
      const savedCurrentTopic = localStorage.getItem('currentTopic');
      
      if (savedTopics) {
        setCompletedTopics(JSON.parse(savedTopics));
      }
      
      if (savedCurrentTopic) {
        setCurrentTopicId(savedCurrentTopic);
      }
    }
  }, [user]);

  // Save progress when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('completedTopics', JSON.stringify(completedTopics));
      localStorage.setItem('currentTopic', currentTopicId);
    }
  }, [completedTopics, currentTopicId, user]);

  const markTopicComplete = (topicId: string) => {
    if (!completedTopics.includes(topicId)) {
      setCompletedTopics([...completedTopics, topicId]);
    }
  };

  const resetAllProgress = () => {
    setCompletedTopics([]);
    setCurrentTopicId('basic-tags');
  };

  const resetCurrentChallenge = () => {
    setCompletedTopics(completedTopics.filter(id => id !== currentTopicId));
  };

  return {
    completedTopics,
    currentTopicId,
    setCurrentTopicId,
    markTopicComplete,
    resetAllProgress,
    resetCurrentChallenge
  };
};
