import { useState, useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { ChatInput } from './ChatInput';
import type { Message } from '../../types/chat';
import { sendMessage } from '../../services/gemini';
import { addMessage, subscribeToMessages, type ChatMessage } from '../../services/firebase';

export const ChatContainer = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    const unsubscribe = subscribeToMessages((firebaseMessages: ChatMessage[]) => {
      const formattedMessages: Message[] = firebaseMessages.map(msg => ({
        id: msg.id || '',
        content: msg.content,
        sender: msg.sender,
        timestamp: msg.timestamp.toDate()
      }));
      setMessages(formattedMessages);
    });

    return () => unsubscribe();
  }, []);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    setError(null);
    setIsLoading(true);

    try {
      await addMessage({
        content,
        sender: 'user'
      });

      const aiResponse = await sendMessage(content);

      await addMessage({
        content: aiResponse,
        sender: 'ai'
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <h3 className="text-lg font-medium mb-2">Welcome to AI Chat</h3>
            <p>Start a conversation with Gemini AI!</p>
          </div>
        )}
        
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {isLoading && <TypingIndicator />}
        
        {error && (
          <div className="text-center text-red-500 bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </div>
  );
};