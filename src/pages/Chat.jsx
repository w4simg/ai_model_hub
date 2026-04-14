import { useState, useEffect, useRef } from 'react';
import { Send, Key, AlertCircle, Loader2, Bot, User, Trash2 } from 'lucide-react';

const MODEL = 'llama-3.1-8b-instant';
// In development, it uses the local Vite env key. In production, it securely hits the Vercel Backend.
const DevApiKey = import.meta.env.VITE_GROQ_API_KEY || '';

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I'm powered by Groq's blazing fast inference. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const clearChat = () => {
    setMessages([
      { role: 'assistant', content: "Chat cleared. What's next?" }
    ]);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    setError('');

    try {
      const IS_PROD = import.meta.env.PROD;
      const API_URL = IS_PROD ? '/api/chat' : 'https://api.groq.com/openai/v1/chat/completions';
      
      const headers = {
        'Content-Type': 'application/json',
      };
      
      // Only inject the API key directly on the frontend during LOCAL host development debugging
      if (!IS_PROD) {
        headers['Authorization'] = `Bearer ${DevApiKey}`;
      }

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          model: MODEL,
          messages: newMessages.map(({ role, content }) => ({ role, content })),
          temperature: 0.7,
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to fetch response from Groq API');
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.choices[0]?.message?.content || "No response generated."
      }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="h-[calc(100vh-4rem)] bg-dark-900 flex flex-col">
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 mb-2">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[85%] sm:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                
                {/* Avatar */}
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-brand-600 ml-3' : 'bg-dark-700 border border-dark-600 mr-3'}`}>
                  {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-brand-400" />}
                </div>

                {/* Message Bubble */}
                <div className={`px-5 py-3.5 rounded-2xl ${msg.role === 'user' 
                    ? 'bg-brand-600 text-white rounded-tr-sm' 
                    : 'bg-dark-800 border border-dark-700 text-gray-200 rounded-tl-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">
                    {msg.content}
                  </p>
                </div>

              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
               <div className="flex max-w-[85%] sm:max-w-[75%] flex-row">
                 <div className="shrink-0 w-8 h-8 rounded-full bg-dark-700 border border-dark-600 mr-3 flex items-center justify-center">
                   <Bot className="w-4 h-4 text-brand-400" />
                 </div>
                 <div className="px-5 py-3.5 rounded-2xl bg-dark-800 border border-dark-700 text-gray-400 rounded-tl-sm flex items-center gap-2">
                   <Loader2 className="w-4 h-4 animate-spin text-brand-400" />
                   Generating...
                 </div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="shrink-0 bg-dark-900/80 backdrop-blur-md border-t border-dark-700 p-4">
        <div className="max-w-3xl mx-auto flex flex-col gap-2">
          {error && (
            <div className="flex items-center text-red-500 text-sm mb-2">
              <AlertCircle className="w-4 h-4 mr-2" />
              {error}
            </div>
          )}
          
          <form onSubmit={sendMessage} className="relative flex items-end w-full">
            <textarea
              rows={Math.min(Math.max(input.split('\n').length, 1), 5)}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(e);
                }
              }}
              placeholder="Message..."
              className="w-full bg-dark-800 border border-dark-700 text-white rounded-2xl pl-5 pr-14 py-4 focus:outline-none focus:ring-1 focus:ring-brand-500/50 resize-none overflow-hidden"
              style={{ minHeight: '56px' }}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 bottom-2 p-2 rounded-xl bg-brand-600 text-white hover:bg-brand-500 disabled:opacity-50 disabled:hover:bg-brand-600 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>

          <div className="flex justify-between items-center text-xs text-gray-500 px-2 mt-1">
            <span>Powered by Groq</span>
            <div className="flex gap-4">
              <button onClick={clearChat} className="hover:text-gray-300 transition-colors flex items-center gap-1">
                <Trash2 className="w-3 h-3" /> Clear Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
