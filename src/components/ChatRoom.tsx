import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft, UserX, User, Smile, Paperclip, MoreVertical } from 'lucide-react';
import { Message } from '../types';

interface ChatRoomProps {
  roomName: string;
  messages: Message[];
  onBack: () => void;
  onSendMessage: (message: string, isAnonymous: boolean) => void;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ roomName, messages, onBack, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage, isAnonymous);
      setNewMessage('');
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  const renderAvatar = (message: Message) => {
    if (message.sender === 'Anonymous') {
      return (
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center shadow-md">
          <UserX className="w-5 h-5 text-gray-600" />
        </div>
      );
    }
    return (
      <img
        src={message.avatar}
        alt={message.sender}
        className="w-10 h-10 rounded-full object-cover shadow-md ring-2 ring-white"
      />
    );
  };

  const renderMessage = (message: Message, index: number) => {
    const isOwn = message.sender === 'You';
    const isAnonymousMsg = message.sender === 'Anonymous';
    
    return (
      <div
        key={message.id}
        className={`flex items-start space-x-3 mb-6 ${isOwn ? 'flex-row-reverse space-x-reverse' : ''} animate-fadeIn`}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        {!isOwn && renderAvatar(message)}
        
        <div className={`flex-1 max-w-xs sm:max-w-md ${isOwn ? 'flex flex-col items-end' : ''}`}>
          {!isOwn && (
            <div className="flex items-center space-x-2 mb-2">
              <span className={`font-semibold ${isAnonymousMsg ? 'text-purple-600' : 'text-gray-900'}`}>
                {message.sender}
              </span>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {message.timestamp}
              </span>
              {isAnonymousMsg && (
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
                  Anonymous
                </span>
              )}
            </div>
          )}
          
          <div
            className={`relative px-4 py-3 rounded-2xl shadow-sm ${
              isOwn
                ? isAnonymous
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                : isAnonymousMsg
                ? 'bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200'
                : 'bg-white border border-gray-200'
            }`}
          >
            <p className={`text-sm leading-relaxed ${isOwn ? 'text-white' : 'text-gray-800'}`}>
              {message.content}
            </p>
            
            {/* Message tail */}
            <div
              className={`absolute top-3 w-3 h-3 transform rotate-45 ${
                isOwn
                  ? isAnonymous
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500 -right-1'
                    : 'bg-gradient-to-br from-green-500 to-emerald-500 -right-1'
                  : isAnonymousMsg
                  ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-r border-b border-purple-200 -left-1'
                  : 'bg-white border-r border-b border-gray-200 -left-1'
              }`}
            />
          </div>
          
          {isOwn && (
            <span className="text-xs text-gray-500 mt-1 mr-2">
              {message.timestamp}
            </span>
          )}
        </div>
        
        {isOwn && (
          <img
            src={message.avatar}
            alt="You"
            className="w-10 h-10 rounded-full object-cover shadow-md ring-2 ring-white"
          />
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-4 p-2 hover:bg-white/20 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h2 className="text-xl font-bold text-white">{roomName}</h2>
              <p className="text-green-100 text-sm">
                {messages.length} messages • Active now
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Anonymous Mode Toggle */}
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-2">
              <span className="text-sm text-white font-medium">Anonymous</span>
              <button
                onClick={() => setIsAnonymous(!isAnonymous)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isAnonymous ? 'bg-purple-500' : 'bg-white/30'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
                    isAnonymous ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              {isAnonymous ? (
                <UserX className="w-4 h-4 text-purple-200" />
              ) : (
                <User className="w-4 h-4 text-white" />
              )}
            </div>
            
            <button className="p-2 hover:bg-white/20 rounded-xl transition-colors">
              <MoreVertical className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="space-y-1">
          {messages.map((message, index) => renderMessage(message, index))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center space-x-2 text-gray-500 animate-pulse">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
              <span className="text-sm">Someone is typing...</span>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-6 bg-white border-t border-gray-100">
        {/* Anonymous Mode Indicator */}
        {isAnonymous && (
          <div className="mb-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl">
            <div className="flex items-center space-x-2">
              <UserX className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-purple-700 font-medium">
                🎭 Anonymous mode enabled - your identity will be hidden
              </span>
            </div>
          </div>
        )}
        
        <div className="flex items-center space-x-3">
          {/* Attachment Button */}
          <button className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
            <Paperclip className="w-5 h-5" />
          </button>
          
          {/* Message Input */}
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder={isAnonymous ? "Send anonymous message..." : "Type your message..."}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors"
            />
            
            {/* Emoji Button */}
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors">
              <Smile className="w-5 h-5" />
            </button>
          </div>
          
          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className={`p-3 text-white rounded-2xl transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
              isAnonymous 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:shadow-xl hover:scale-105' 
                : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 hover:shadow-xl hover:scale-105'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        
        {/* Quick Actions */}
        <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
          <span>Press Enter to send, Shift + Enter for new line</span>
          <div className="flex items-center space-x-2">
            <span>💬 {messages.length} messages</span>
            <span>•</span>
            <span>🟢 Online</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
