'use client';

import {
  Eye,
  MessageCircle,
  Minus,
  Send,
  X,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { nextjsApiFetch } from '@/lib/api';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function LivePreview({ formData }: { formData: any }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      // console.log('Messages updated:', formData, messages);
    }, [input]);

  // Add welcome_message message on mount or when welcome_message changes
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome_message',
          role: 'assistant',
          content: formData.welcome_message || 'Hi 👋, how can I help you today?',
          timestamp: new Date(),
        },
      ]);
    }
  }, [formData.welcome_message]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await nextjsApiFetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          config: {
            voice_model: formData.voice_model || 'gpt-4o-mini',
            chatbot_name: formData.chatbot_name,
            allow_slang: formData.allow_slang,
            preferred_language: formData.preferred_language,
            temperature: formData.temperature || 0.7,
            max_tokens: formData.max_tokens || 500,
          },
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:formData.fallback_message || 'Sorry, something went wrong. Please try again later.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: 'welcome_message',
        role: 'assistant',
        content: formData.welcome_message || 'Hi 👋, how can I help you today??',
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center text-lg font-semibold text-card-foreground">
          <Eye className="mr-2 h-5 w-5" />
          Live Preview
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-muted-foreground hover:text-foreground"
          title={isExpanded ? 'Minimize' : 'Expand'}
        >
          {isExpanded ? (
            <Minimize2 className="h-4 w-4" />
          ) : (
            <Maximize2 className="h-4 w-4" />
          )}
        </button>
      </div>

      <div className="space-y-4">
        {/* Chat widget mockup with live functionality */}
        <div
          className={`rounded-lg border-2 border-dashed border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-500/10 dark:to-indigo-500/10 transition-all ${
            isExpanded ? 'p-6' : 'p-4'
          }`}
        >
          {/* Chat header */}
          <div className="mb-3 flex items-center space-x-3">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-white overflow-hidden bg-white border"
              style={{
                backgroundColor: '#007BFF',
              }}
            >
              {formData.bot_icon ? (
                <img src={formData.bot_icon} alt="Bot Icon" className="h-8 w-8 object-cover rounded-full" />
              ) : (
                <MessageCircle className="h-4 w-4 text-blue-600" />
              )}
            </div>
            <div className="flex-1">
              <span className="font-medium text-foreground">
                {formData.chatbot_name || 'Myraa Bot'}
              </span>
              {formData.botIdentity?.role && (
                <p className="text-xs text-muted-foreground">
                  {formData.chatbot_role || 'Assistant'}
                </p>
              )}
            </div>
            <button
              onClick={resetChat}
              className="text-muted-foreground hover:text-foreground"
              title="Reset chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages container */}
          <div
            className={`mb-3 space-y-3 overflow-y-auto ${
              isExpanded ? 'max-h-96' : 'max-h-85'
            }`}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 shadow-sm ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white dark:bg-blue-500'
                      : 'bg-background text-foreground'
                  }`}
                  style={
                    message.role === 'user'
                      ? { backgroundColor: formData.primary_color || '#0EA5E9' }
                      : {}
                  }
                >
                  <p className="text-sm whitespace-pre-wrap break-words">
                    {message.content}
                  </p>
                  <span
                    className={`mt-1 block text-xs ${
                      message.role === 'user'
                        ? 'text-blue-100'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-lg bg-background p-3 shadow-sm">
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
                    <div
                      className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                      style={{ animationDelay: '0.2s' }}
                    />
                    <div
                      className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                      style={{ animationDelay: '0.4s' }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="flex items-center space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              style={{
                backgroundColor:
                  input.trim() && !isLoading
                    ? formData.primary_color || '#0EA5E9'
                    : '#9CA3AF',
              }}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Config preview */}
        <div className="space-y-2 text-sm hidden">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Theme Color:</span>
            <div className="flex items-center gap-2">
              <div
                className="h-4 w-4 rounded border border-border"
                style={{
                  backgroundColor: formData.primary_color || '#0EA5E9',
                }}
              />
              <span className="font-mono text-foreground">
                {formData.primary_color || '#0EA5E9'}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Position:</span>
            <span className="font-medium capitalize text-foreground">
              {formData.chat_position || 'bottom-right'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">AI Model:</span>
            <span className="font-medium text-foreground">
              {formData.voice_model || 'gpt-4o-mini'}
            </span>
          </div>
          {formData.allow_slang && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Preferred Language:</span>
              <span className="font-medium capitalize text-foreground">
                {formData.preferred_language || 'minimal'}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Messages:</span>
            <span className="font-medium text-foreground">
              {messages.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}