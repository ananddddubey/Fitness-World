import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, AlertCircle } from 'lucide-react';
import { Message } from '../types';

interface AIChatProps {
  exerciseContext?: string; // Optional context like 'Barbell Squat' or 'Deadlift'
}

export default function AIChat({ exerciseContext }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Ready to grind, champion? I'm your AI Personal Trainer. Ask me anything about exercise form, nutrition plans, recovery routines, or plateaus. Let's crush your goals today!",
      timestamp: new Date()
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "How do I prevent lower back pain during squats?",
    "Should I do cardio before or after weights?",
    "Give me quick tips for muscle building.",
    "What are perfect pre-workout meals?"
  ];

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: `m-${Date.now()}-user`,
      role: 'user',
      content: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputVal('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/trainer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question: textToSend,
          context: exerciseContext || 'General Fitness and Workouts Coaching'
        })
      });

      if (!response.ok) {
        throw new Error("Server communication failed.");
      }

      const data = await response.json();
      const botMessage: Message = {
        id: `m-${Date.now()}-bot`,
        role: 'assistant',
        content: data.answer,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      console.error(err);
      const errMessage: Message = {
        id: `m-${Date.now()}-err`,
        role: 'assistant',
        content: "Power levels disconnected! Ensure your internet is robust, or load up a valid GEMINI_API_KEY in secrets. Rest assured, your form is key: stand tall, brace hard, and push high!",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="ai-chat-box" className="glass-card border-white/5 rounded-2xl shadow-xl overflow-hidden flex flex-col h-[400px]">
      {/* Header */}
      <div className="bg-white/[0.03] backdrop-blur-md px-5 py-3 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-[#E24B4A]/10 text-[#E24B4A]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-white tracking-wide text-xs flex items-center gap-1.5 font-mono">
              FITNESS WORLD AI COACH
            </h3>
            <p className="text-[9px] text-white/40 font-mono tracking-wider">
              {exerciseContext ? `FOCUSING ON: ${exerciseContext.toUpperCase()}` : 'COACH DEPLOYED'}
            </p>
          </div>
        </div>
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E24B4A] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E24B4A] accent-glow"></span>
        </span>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-sm">
        {messages.map((m) => {
          const isBot = m.role === 'assistant';
          return (
            <div
              id={`chat-msg-${m.id}`}
              key={m.id}
              className={`flex flex-col max-w-[85%] transition duration-300 ${
                isBot 
                  ? 'mr-auto self-start border-l-3 border-[#E24B4A] bg-white/[0.04] pl-3.5 py-2.5 pr-4 rounded-r-xl rounded-b-xl border border-white/5' 
                  : 'ml-auto self-end red-gradient text-white p-3 rounded-l-xl rounded-b-xl accent-glow'
              }`}
            >
              <span className={`text-[9px] uppercase font-mono tracking-widest mb-1 ${isBot ? 'text-white/45' : 'text-white/70'}`}>
                {isBot ? 'AI Coach' : 'You'} &bull; {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              <p className="leading-relaxed whitespace-pre-line text-sm break-words select-all">
                {m.content}
              </p>
            </div>
          );
        })}

        {isLoading && (
          <div className="mr-auto self-start border-l-3 border-white/20 bg-white/[0.03] border border-white/5 pl-3.5 py-3 pr-4 rounded-r-xl rounded-b-xl animate-pulse text-white/50 text-xs flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce delay-75"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce delay-150"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce delay-300"></span>
            <span>AI Coach is analyzing form...</span>
          </div>
        )}

        {messages.length === 1 && (
          <div className="space-y-2 pt-2">
            <span className="text-[10px] font-mono tracking-wider text-white/35">TOUCH TO ASK QUICKLY:</span>
            <div className="grid grid-cols-1 gap-1.5">
              {suggestedPrompts.map((prompt, idx) => (
                <button
                  id={`suggested-prompt-${idx}`}
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="text-left bg-neutral-800/60 hover:bg-neutral-800/90 text-xs text-white/80 hover:text-[#E24B4A] px-3 py-2 rounded-xl transition duration-200 border border-white/5 leading-snug cursor-pointer font-medium"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input section */}
      <form
        id="chat-send-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(inputVal);
        }}
        className="p-3 border-t border-white/5 bg-white/[0.02] flex gap-2 items-center"
      >
        <input
          id="chat-input"
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder={exerciseContext ? `Ask about ${exerciseContext}...` : "Ask your personal trainer..."}
          className="flex-1 text-sm bg-neutral-900 border border-white/5 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-[#E24B4A] transition-colors"
          disabled={isLoading}
        />
        <button
          id="chat-submit-btn"
          type="submit"
          disabled={isLoading || !inputVal.trim()}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#E24B4A] text-white hover:bg-red-600 active:scale-95 disabled:bg-gray-800 disabled:text-gray-500 transition-all cursor-pointer shadow hover:shadow-[#E24B4A]/20"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
