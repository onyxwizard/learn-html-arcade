import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Code, LogIn } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    
    if (success) {
      toast({
        title: "Login successful",
        description: `Welcome back, ${username}!`,
      });
      navigate('/');
    } else {
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cyber-black">
      {/* Header */}
      <header className="bg-cyber-black/90 border-b border-cyber-cyan/30 p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Code className="text-cyber-cyan" size={24} />
            <h1 className="text-2xl font-title text-cyber-cyan animate-glow">
              CYBERPUNK HTML ARCADE
            </h1>
          </div>
        </div>
      </header>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center">
        <div className="cyber-card w-full max-w-md p-8">
          <h2 className="text-2xl text-cyber-cyan mb-6 font-title text-center">LOGIN ACCESS</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-gray-400 text-sm">USERNAME</label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="cyber-input"
                placeholder="Enter username"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-gray-400 text-sm">PASSWORD</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="cyber-input"
                placeholder="Enter password"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full cyber-btn"
            >
              <LogIn size={18} className="mr-2" />
              ACCESS SYSTEM
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Available Users:</p>
            <p className="text-cyber-cyan">admin / admin</p>
            <p className="text-cyber-cyan">onyx / onyx</p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-cyber-black/90 border-t border-cyber-cyan/30 py-4 text-center text-gray-500">
        <p className="text-sm">
          <span className="text-cyber-cyan">CYBERPUNK HTML ARCADE</span> - Master HTML in the cybernetic realm
        </p>
      </footer>
    </div>
  );
};

export default Login;