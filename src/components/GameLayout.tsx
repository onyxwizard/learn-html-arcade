import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HtmlRoadmap, { TopicCategory } from './HtmlRoadmap';
import CodeEditor from './CodeEditor';
import { Button } from "@/components/ui/button";
import { Menu, X, MapPin, Code, Info, Github, LogOut, RefreshCw, RotateCcw } from 'lucide-react';
import { challengeData } from '@/data/challenges';
import { htmlRoadmap } from '@/data/roadmap';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from '@/context/AuthContext';
import { useProgress } from '@/hooks/useProgress';
import { toast } from '@/hooks/use-toast';

const GameLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const { 
    currentTopicId, 
    setCurrentTopicId, 
    completedTopics, 
    markTopicComplete,
    resetAllProgress,
    resetCurrentChallenge
  } = useProgress();
  const [currentTab, setCurrentTab] = React.useState('challenge');

  // Find the current challenge
  const currentChallenge = challengeData.find(c => c.id === currentTopicId) || challengeData[0];

  // Create a modified roadmap with completion status
  const roadmapWithStatus: TopicCategory[] = htmlRoadmap.map(category => ({
    ...category,
    topics: category.topics.map(topic => ({
      ...topic,
      completed: completedTopics.includes(topic.id),
      current: topic.id === currentTopicId
    }))
  }));

  const handleTopicSelect = (topicId: string) => {
    setCurrentTopicId(topicId);
    setCurrentTab('challenge');
  };

  const handleChallengeComplete = () => {
    markTopicComplete(currentTopicId);
    toast({
      title: "Challenge Completed!",
      description: "Your progress has been saved.",
    });
  };

  const handleResetAll = () => {
    if (confirm("Are you sure you want to reset all progress? This cannot be undone.")) {
      resetAllProgress();
      toast({
        title: "Progress Reset",
        description: "All progress has been reset to beginning.",
      });
    }
  };

  const handleResetChallenge = () => {
    resetCurrentChallenge();
    toast({
      title: "Challenge Reset",
      description: `The "${currentChallenge.title}" challenge has been reset.`,
    });
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-cyber-black/90 border-b border-cyber-cyan/30 p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Code className="text-cyber-cyan" size={24} />
            <h1 className="text-2xl font-title text-cyber-cyan animate-glow">
              CYBERPUNK HTML ARCADE
            </h1>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <span className="text-cyber-cyan/70 text-sm">
              User: <span className="text-cyber-cyan">{user?.username}</span>
            </span>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleResetChallenge}
              className="text-white hover:text-cyber-cyan hover:bg-cyber-black"
            >
              <RotateCcw size={16} className="mr-1" /> Reset Challenge
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleResetAll}
              className="text-white hover:text-cyber-cyan hover:bg-cyber-black"
            >
              <RefreshCw size={16} className="mr-1" /> Reset All
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleLogout}
              className="text-white hover:text-cyber-cyan hover:bg-cyber-black"
            >
              <LogOut size={16} className="mr-1" /> Logout
            </Button>
          </div>
          
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-cyber-cyan">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent className="border-cyber-cyan/30 bg-cyber-black/95 backdrop-blur-md">
              <div className="flex flex-col gap-4 pt-8">
                <div className="text-cyber-cyan mb-4 pb-2 border-b border-cyber-cyan/30">
                  User: <span className="font-bold">{user?.username}</span>
                </div>
                
                <Button 
                  variant="ghost" 
                  className="justify-start text-white hover:text-cyber-cyan hover:bg-cyber-black"
                  onClick={handleResetChallenge}
                >
                  <RotateCcw size={18} className="mr-2" /> Reset Challenge
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="justify-start text-white hover:text-cyber-cyan hover:bg-cyber-black"
                  onClick={handleResetAll}
                >
                  <RefreshCw size={18} className="mr-2" /> Reset All Progress
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="justify-start text-white hover:text-cyber-cyan hover:bg-cyber-black"
                  onClick={handleLogout}
                >
                  <LogOut size={18} className="mr-2" /> Logout
                </Button>
                
                <div className="border-t border-cyber-cyan/30 mt-2 pt-4">
                  <Button variant="ghost" className="justify-start text-white hover:text-cyber-cyan hover:bg-cyber-black">
                    <Info size={18} className="mr-2" /> About
                  </Button>
                  <Button variant="ghost" className="justify-start text-white hover:text-cyber-cyan hover:bg-cyber-black">
                    <Github size={18} className="mr-2" /> GitHub
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Sidebar Roadmap - Hidden on mobile */}
          <div className="hidden md:block md:col-span-4 lg:col-span-3">
            <HtmlRoadmap 
              categories={roadmapWithStatus} 
              currentTopicId={currentTopicId}
              onSelectTopic={handleTopicSelect}
            />
          </div>
          
          {/* Main Game Area */}
          <div className="col-span-1 md:col-span-8 lg:col-span-9">
            <Tabs value={currentTab} onValueChange={setCurrentTab}>
              <div className="flex justify-between items-center mb-4">
                <TabsList className="bg-cyber-black border border-cyber-cyan/30">
                  <TabsTrigger value="challenge" className="data-[state=active]:bg-cyber-cyan/20">Challenge</TabsTrigger>
                  <TabsTrigger value="roadmap" className="data-[state=active]:bg-cyber-cyan/20 md:hidden">Roadmap</TabsTrigger>
                </TabsList>
                
                <div className="text-cyber-cyan/70 flex items-center gap-1 text-sm">
                  <MapPin size={14} /> 
                  Current: <span className="text-cyber-cyan font-mono">{currentChallenge.title}</span>
                </div>
              </div>
            
              <TabsContent value="challenge" className="cyber-card">
                <CodeEditor 
                  challenge={currentChallenge} 
                  onComplete={handleChallengeComplete}
                />
              </TabsContent>
              
              <TabsContent value="roadmap" className="md:hidden">
                <HtmlRoadmap 
                  categories={roadmapWithStatus} 
                  currentTopicId={currentTopicId} 
                  onSelectTopic={handleTopicSelect}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-cyber-black/90 border-t border-cyber-cyan/30 py-4 text-center text-gray-500">
        <p className="text-sm">
          <span className="text-cyber-cyan">CYBERPUNK HTML ARCADE</span> - Master HTML in the cybernetic realm
        </p>
      </footer>
    </div>
  );
};

export default GameLayout;