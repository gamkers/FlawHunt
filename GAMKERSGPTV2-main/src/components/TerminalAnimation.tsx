import { useState, useEffect } from 'react';

const TerminalAnimation = () => {
  const [text, setText] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  
  const lines = [
    '> GamkersGPT initialized',
    '> Scanning for vulnerabilities...',
    '> CVE-2023-1234 identified',
    '> Generating security report',
    '> Threat assessment complete',
    '> Recommended actions ready'
  ];
  
  useEffect(() => {
    if (currentLine >= lines.length) {
      setIsTyping(false);
      return;
    }
    
    const currentText = lines[currentLine];
    let charIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (charIndex <= currentText.length) {
        setText(lines.slice(0, currentLine).join('\n') + 
               (currentLine > 0 ? '\n' : '') + 
               currentText.substring(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setCurrentLine(currentLine + 1);
        }, 500);
      }
    }, 50);
    
    return () => clearInterval(typingInterval);
  }, [currentLine]);
  
  return (
    <div className="font-mono text-sm sm:text-base text-green-400 min-h-[300px]">
      {text}
      {isTyping && <span className="animate-pulse ml-0.5">_</span>}
    </div>
  );
};

export default TerminalAnimation;