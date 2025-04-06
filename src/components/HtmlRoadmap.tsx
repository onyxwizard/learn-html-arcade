import React from 'react';
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Define the structure of our HTML course topics
export interface TopicCategory {
  name: string;
  topics: Topic[];
}

export interface Topic {
  id: string;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completed?: boolean;
  current?: boolean;
}

const HtmlRoadmap: React.FC<{
  categories: TopicCategory[];
  currentTopicId: string;
  onSelectTopic: (topicId: string) => void;
}> = ({ categories, currentTopicId, onSelectTopic }) => {
  return (
    <div className="cyber-card w-full max-h-[600px] overflow-y-auto pr-2">
      <h2 className="cyber-heading text-xl mb-4">HTML ROADMAP</h2>
      
      <div className="space-y-6">
        {categories.map((category, index) => (
          <div key={index} className="space-y-2">
            <h3 className="text-cyber-purple font-title text-lg">{category.name}</h3>
            <Separator className="bg-cyber-purple/30 my-2" />
            
            <div className="grid grid-cols-1 gap-2">
              {category.topics.map((topic) => {
                const isCurrent = topic.id === currentTopicId;
                
                return (
                  <button
                    key={topic.id}
                    onClick={() => onSelectTopic(topic.id)}
                    className={`text-left p-2 rounded border transition-all duration-300 ${
                      isCurrent 
                        ? 'cyber-border animate-pulse-border font-bold' 
                        : topic.completed 
                          ? 'border-cyber-green/40 bg-cyber-green/10 text-white/90' 
                          : 'border-gray-700 bg-gray-800/50 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{topic.title}</span>
                      <div className="flex space-x-1">
                        {topic.completed && (
                          <Badge className="bg-cyber-green/70 text-xs">DONE</Badge>
                        )}
                        {isCurrent && (
                          <Badge className="bg-cyber-cyan text-xs animate-pulse">CURRENT</Badge>
                        )}
                        <Badge 
                          className={`text-xs ${
                            topic.difficulty === 'beginner' 
                              ? 'bg-green-800/50' 
                              : topic.difficulty === 'intermediate' 
                                ? 'bg-amber-700/50' 
                                : 'bg-red-800/50'
                          }`}
                        >
                          {topic.difficulty.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HtmlRoadmap;