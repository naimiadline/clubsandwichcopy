import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Users, 
  Calendar, 
  MapPin, 
  Mail, 
  Globe, 
  Instagram, 
  Twitter,
  MessageCircle,
  Star,
  Award,
  Clock
} from 'lucide-react';
import { Club, Event } from '../types';

interface ClubProfileProps {
  club: Club;
  events: Event[];
  onBack: () => void;
  onToggleMembership: (clubId: string) => void;
  onJoinChat?: (clubId: string) => void;
}

const ClubProfile: React.FC<ClubProfileProps> = ({ 
  club, 
  events, 
  onBack, 
  onToggleMembership,
  onJoinChat 
}) => {
  const [activeTab, setActiveTab] = useState('about');
  
  const clubEvents = events.filter(event => event.clubId === club.id);
  const upcomingEvents = clubEvents.filter(event => new Date(event.date) > new Date());
  const pastEvents = clubEvents.filter(event => new Date(event.date) <= new Date());

  // Mock additional club data
  const clubDetails = {
    founded: '2019',
    meetingTime: 'Wednesdays 7:00 PM',
    location: 'Student Union Room 204',
    email: `contact@${club.name.toLowerCase().replace(/\s+/g, '')}.org`,
    website: `https://${club.name.toLowerCase().replace(/\s+/g, '')}.org`,
    instagram: `@${club.name.toLowerCase().replace(/\s+/g, '')}`,
    twitter: `@${club.name.toLowerCase().replace(/\s+/g, '')}`,
    officers: [
      { name: 'Sarah Chen', role: 'President', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop' },
      { name: 'Marcus Johnson', role: 'Vice President', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
      { name: 'Emily Rodriguez', role: 'Secretary', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' }
    ],
    achievements: [
      { title: 'Best New Club 2020', icon: '🏆' },
      { title: 'Community Service Award', icon: '🌟' },
      { title: '500+ Members', icon: '👥' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=300&h=200&fit=crop'
    ]
  };

  const tabs = [
    { id: 'about', label: 'About', icon: Users },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'gallery', label: 'Gallery', icon: Star }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Clubs
        </button>
      </div>

      {/* Club Hero Section */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="relative h-64 md:h-80">
          <img
            src={club.image}
            alt={club.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop';
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
            <div className="p-8 text-white">
              <div className="flex items-center mb-2">
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium mr-3">
                  {club.category}
                </span>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span className="text-sm">{club.memberCount} members</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-2">{club.name}</h1>
              <p className="text-lg text-gray-200 max-w-2xl">{club.description}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 bg-gray-50 border-t">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => onToggleMembership(club.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                club.isJoined
                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {club.isJoined ? 'Leave Club' : 'Join Club'}
            </button>
            
            {club.isJoined && (
              <button
                onClick={() => onJoinChat && onJoinChat(club.id)}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Join Chat</span>
              </button>
            )}
            
            <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>Contact</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex space-x-1 p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center space-x-2 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          {/* About Tab */}
          {activeTab === 'about' && (
            <div className="space-y-8">
              {/* Club Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Basic Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Club Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                      <div>
                        <div className="font-medium">Founded</div>
                        <div className="text-sm">{clubDetails.founded}</div>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-5 h-5 mr-3 text-gray-400" />
                      <div>
                        <div className="font-medium">Meeting Time</div>
                        <div className="text-sm">{clubDetails.meetingTime}</div>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-5 h-5 mr-3 text-gray-400" />
                      <div>
                        <div className="font-medium">Location</div>
                        <div className="text-sm">{clubDetails.location}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Get in Touch</h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-5 h-5 mr-3 text-gray-400" />
                      <div>
                        <div className="font-medium">Email</div>
                        <div className="text-sm text-blue-600">{clubDetails.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Globe className="w-5 h-5 mr-3 text-gray-400" />
                      <div>
                        <div className="font-medium">Website</div>
                        <div className="text-sm text-blue-600">{clubDetails.website}</div>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Instagram className="w-5 h-5 mr-3 text-gray-400" />
                      <div>
                        <div className="font-medium">Instagram</div>
                        <div className="text-sm text-blue-600">{clubDetails.instagram}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Officers */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Club Officers</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {clubDetails.officers.map((officer, index) => (
                    <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                      <img
                        src={officer.avatar}
                        alt={officer.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{officer.name}</div>
                        <div className="text-sm text-gray-600">{officer.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {clubDetails.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="font-medium text-gray-900">{achievement.title}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Events Tab */}
          {activeTab === 'events' && (
            <div className="space-y-6">
              {/* Upcoming Events */}
              {upcomingEvents.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start space-x-3">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 mb-1">{event.title}</h4>
                            <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                            <div className="flex items-center text-xs text-gray-500 space-x-4">
                              <span>{event.date}</span>
                              <span>{event.time}</span>
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Past Events */}
              {pastEvents.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Past Events</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pastEvents.slice(0, 4).map((event) => (
                      <div key={event.id} className="border border-gray-200 rounded-lg p-4 opacity-75">
                        <div className="flex items-start space-x-3">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 mb-1">{event.title}</h4>
                            <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                            <div className="flex items-center text-xs text-gray-500 space-x-4">
                              <span>{event.date}</span>
                              <span>{event.attendeeCount} attended</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {clubEvents.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>No events scheduled yet. Check back soon!</p>
                </div>
              )}
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Photo Gallery</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {clubDetails.gallery.map((image, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <img
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClubProfile;
