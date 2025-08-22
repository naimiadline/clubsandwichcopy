import React from 'react';
import { MessageCircle, Users, Clock, ChevronRight } from 'lucide-react';
import { ChatRoom } from '../types';

interface ChatListProps {
  chatRooms: ChatRoom[];
  onSelectRoom: (roomId: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ chatRooms, onSelectRoom }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center">
              <MessageCircle className="w-7 h-7 mr-3" />
              Group Chats
            </h2>
            <p className="text-green-100 mt-1">Connect with your club communities</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="text-white font-medium">{chatRooms.length} active</span>
          </div>
        </div>
      </div>
      
      {/* Chat Rooms List */}
      <div className="divide-y divide-gray-100">
        {chatRooms.map((room, index) => (
          <button
            key={room.id}
            onClick={() => onSelectRoom(room.id)}
            className="w-full p-6 text-left hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300 group relative overflow-hidden"
          >
            {/* Hover Effect Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative flex items-center space-x-4">
              {/* Avatar with Online Indicator */}
              <div className="relative">
                <img
                  src={room.avatar}
                  alt={room.name}
                  className="w-16 h-16 rounded-2xl object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=100&h=100&fit=crop';
                  }}
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full shadow-sm" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900 truncate text-lg group-hover:text-green-600 transition-colors">
                    {room.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {room.lastMessageTime}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-green-500 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
                
                <p className="text-gray-600 truncate mb-3 group-hover:text-gray-700 transition-colors">
                  {room.lastMessage}
                </p>
                
                {/* Room Stats */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-gray-500">
                      <Users className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">Active now</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">Last active</span>
                    </div>
                  </div>
                  
                  {room.unreadCount > 0 && (
                    <div className="relative">
                      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                        {room.unreadCount}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-ping opacity-20" />
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Animated Border */}
            <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 w-0 group-hover:w-full transition-all duration-500" />
          </button>
        ))}
      </div>
      
      {/* Footer */}
      <div className="bg-gray-50 p-4 text-center">
        <p className="text-sm text-gray-600">
          💬 Join more clubs to unlock additional chat rooms
        </p>
      </div>
    </div>
  );
};

export default ChatList;
