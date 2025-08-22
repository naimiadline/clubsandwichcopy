import React from 'react';
import { Users, Heart, Plus } from 'lucide-react';
import { Club } from '../types';

interface ClubCardProps {
  club: Club;
  onToggleMembership: (clubId: string) => void;
  onViewProfile?: (clubId: string) => void;
}

const ClubCard: React.FC<ClubCardProps> = ({ club, onToggleMembership, onViewProfile }) => {
  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger card click if clicking on the membership button
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    
    if (onViewProfile) {
      onViewProfile(club.id);
    }
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      onClick={handleCardClick}
    >
      <div className="relative h-48">
        <img
          src={club.image}
          alt={club.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop';
          }}
        />
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
            {club.category}
          </span>
        </div>
        
        {/* Membership Heart Icon */}
        {club.isJoined && (
          <div className="absolute top-4 left-4">
            <div className="bg-red-500/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
              <Heart className="w-4 h-4 text-white fill-current" />
            </div>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{club.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{club.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-gray-500">
            <Users className="w-4 h-4 mr-1" />
            <span className="text-sm">{club.memberCount} members</span>
          </div>
        </div>
        
        {club.isJoined ? (
          <div className="space-y-3">
            {/* Member Status */}
            <div className="flex items-center justify-center py-2 px-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
              <Heart className="w-4 h-4 text-green-600 fill-current mr-2" />
              <span className="text-green-700 font-medium text-sm">You're a member!</span>
            </div>
            
            {/* Membership Options */}
            <div className="flex space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // This could open a membership management modal in the future
                }}
                className="flex-1 py-2 px-3 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg font-medium transition-colors text-sm"
              >
                View Chats
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleMembership(club.id);
                }}
                className="py-2 px-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-sm"
                title="Manage membership"
              >
                ⚙️
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleMembership(club.id);
            }}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Join Club</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ClubCard;
