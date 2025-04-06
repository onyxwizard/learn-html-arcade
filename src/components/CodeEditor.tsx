import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Lightbulb, Code, Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface CodeEditorProps {
  challenge: {
    id: string;
    title: string;
    description: string;
    initialCode: string;
    solution: string;
    hints: string[];
  };
  onComplete: () => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ challenge, onComplete }) => {
  const [code, setCode] = useState(challenge.initialCode);
  const [preview, setPreview] = useState('');
  const [hintIndex, setHintIndex] = useState(-1);
  const [showSolution, setShowSolution] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Adjust textarea height when content changes
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [code]);

  // Reset state when challenge changes
  useEffect(() => {
    setCode(challenge.initialCode);
    setPreview('');
    setHintIndex(-1);
    setShowSolution(false);
    setIsCorrect(false);
  }, [challenge]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  // Parse HTML string into DOM and normalize it for comparison
  const normalizeHtml = (htmlString: string): Document => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    return doc;
  };

  // Compare two HTML documents semantically
  const areDocsEquivalent = (userDoc: Document, solutionDoc: Document): boolean => {
    try {
      // Compare basic structure (ignoring whitespace, case differences, etc.)
      const userHtml = userDoc.documentElement;
      const solutionHtml = solutionDoc.documentElement;

      // Check for required elements from solution
      const checkNodeEquivalence = (solutionNode: Element, userNode: Element): boolean => {
        // If solution node is not found in user's code, it's not equivalent
        if (!userNode) return false;

        // Check tag name (case insensitive)
        if (solutionNode.tagName.toLowerCase() !== userNode.tagName.toLowerCase()) {
          return false;
        }

        // Check required attributes from solution
        const solutionAttrs = solutionNode.attributes;
        for (let i = 0; i < solutionAttrs.length; i++) {
          const attr = solutionAttrs[i];
          // Skip data-* attributes and event handlers that might be added by the browser
          if (attr.name.startsWith('data-') || attr.name.startsWith('on')) continue;
          
          // Get the equivalent attribute from user's element
          const userAttr = userNode.getAttribute(attr.name);
          
          // If required attribute is missing or different, it's not equivalent
          if (userAttr === null || userAttr.trim() !== attr.value.trim()) {
            return false;
          }
        }

        // Check all required child elements from solution
        const solutionChildElements = Array.from(solutionNode.children);
        const userChildElements = Array.from(userNode.children);
        
        if (solutionChildElements.length > 0) {
          let foundAllRequired = true;
          
          for (const solutionChild of solutionChildElements) {
            // Find a matching child in user's code
            const matchingUserChild = Array.from(userChildElements).find(userChild => 
              userChild.tagName.toLowerCase() === solutionChild.tagName.toLowerCase()
            );
            
            if (!matchingUserChild || !checkNodeEquivalence(solutionChild, matchingUserChild)) {
              foundAllRequired = false;
              break;
            }
          }
          
          if (!foundAllRequired) return false;
        }

        // Check required text content for leaf nodes (nodes without children)
        if (solutionChildElements.length === 0 && solutionNode.textContent) {
          const solutionText = solutionNode.textContent.trim();
          const userText = userNode.textContent?.trim() || '';
          
          if (solutionText && solutionText !== userText) {
            return false;
          }
        }

        return true;
      };

      // Start comparison from the body element to avoid meta differences
      const solutionBody = solutionHtml.querySelector('body');
      const userBody = userHtml.querySelector('body');
      
      if (!solutionBody || !userBody) {
        return false;
      }
      
      return checkNodeEquivalence(solutionBody, userBody);
    } catch (error) {
      console.error("Error comparing HTML documents:", error);
      return false;
    }
  };

  const checkSolution = () => {
    try {
      // Parse and normalize both the user's code and the solution
      const userDoc = normalizeHtml(code);
      const solutionDoc = normalizeHtml(challenge.solution);
      
      // Check if they are semantically equivalent
      const isEquivalent = areDocsEquivalent(userDoc, solutionDoc);
      
      // If semantic check passes, consider it correct
      if (isEquivalent) {
        setIsCorrect(true);
        toast({
          title: "Correct Solution!",
          description: "You've completed this challenge successfully.",
          variant: "default",
        });
        onComplete();
      } else {
        // Try a more lenient fallback comparison if the strict one fails
        const normalizedUserCode = code.replace(/\s+/g, ' ').trim().toLowerCase();
        const normalizedSolution = challenge.solution.replace(/\s+/g, ' ').trim().toLowerCase();
        
        if (normalizedUserCode === normalizedSolution) {
          setIsCorrect(true);
          toast({
            title: "Correct Solution!",
            description: "You've completed this challenge successfully.",
            variant: "default",
          });
          onComplete();
        } else {
          toast({
            title: "Not quite right",
            description: "Your solution doesn't match the expected output. Try again!",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("Error validating solution:", error);
      toast({
        title: "Error checking solution",
        description: "There was a problem validating your code. Please try again.",
        variant: "destructive",
      });
    }
  };

  const showNextHint = () => {
    if (hintIndex < challenge.hints.length - 1) {
      setHintIndex(prev => prev + 1);
    } else {
      toast({
        title: "No more hints available",
        description: "You've seen all available hints for this challenge.",
      });
    }
  };

  const renderPreview = () => {
    setPreview(code);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="cyber-heading text-xl">{challenge.title}</h3>
        <p className="text-gray-300">{challenge.description}</p>
        
        {hintIndex >= 0 && (
          <div className="bg-cyber-blue/10 border border-cyber-blue/30 p-3 rounded-md">
            <h4 className="font-bold text-cyber-blue flex items-center gap-1 mb-1">
              <Lightbulb size={16} /> 
              Hint {hintIndex + 1}:
            </h4>
            <p className="text-gray-300">{challenge.hints[hintIndex]}</p>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-gray-400 text-sm font-mono mb-1">
          Your Code: <span className="text-cyber-cyan">&lt;/&gt;</span>
        </label>
        <textarea
          ref={textareaRef}
          value={code}
          onChange={handleCodeChange}
          className="cyber-input min-h-[150px]"
          placeholder="Write your HTML here..."
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button 
          onClick={renderPreview}
          className="cyber-btn"
          variant="outline"
        >
          <Eye size={16} className="mr-1" /> Preview
        </Button>
        
        <Button 
          onClick={showNextHint}
          className="cyber-btn"
          variant="outline"
        >
          <Lightbulb size={16} className="mr-1" /> Hint
        </Button>
        
        <Button 
          onClick={() => setShowSolution(!showSolution)}
          className="cyber-btn"
          variant="outline"
        >
          <Code size={16} className="mr-1" /> {showSolution ? 'Hide' : 'Show'} Solution
        </Button>
        
        <Button 
          onClick={checkSolution}
          className={`cyber-btn ${isCorrect ? 'border-cyber-green text-cyber-green' : ''}`}
          variant="outline"
        >
          {isCorrect ? (
            <>
              <Check size={16} className="mr-1" /> Completed!
            </>
          ) : (
            <>
              <ArrowRight size={16} className="mr-1" /> Check Solution
            </>
          )}
        </Button>
      </div>

      {showSolution && (
        <div className="space-y-2">
          <label className="block text-gray-400 text-sm font-mono">Solution:</label>
          <pre className="code-editor overflow-x-auto p-4">{challenge.solution}</pre>
        </div>
      )}

      {preview && (
        <div className="space-y-2">
          <label className="block text-gray-400 text-sm font-mono">Preview:</label>
          <div className="code-preview">
            <div dangerouslySetInnerHTML={{ __html: preview }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;