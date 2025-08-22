import React from 'react';
import { Calendar, MessageCircle, Home, Trophy, User, Sandwich } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'points', label: 'Points', icon: Trophy },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg transform rotate-12">
              <Sandwich className="w-6 h-6 text-white transform -rotate-12" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                ClubSandwich
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Stack your interests</p>
            </div>
          </div>
          
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
