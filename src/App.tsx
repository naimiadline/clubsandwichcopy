import React, { useState, useMemo } from 'react';
import Navigation from './components/Navigation';
import EventCard from './components/EventCard';
import ClubCard from './components/ClubCard';
import ClubProfile from './components/ClubProfile';
import ChatList from './components/ChatList';
import ChatRoom from './components/ChatRoom';
import Calendar from './components/Calendar';
import PointsSection from './components/PointsSection';
import ProfileSection from './components/ProfileSection';
import { clubs as initialClubs, events as initialEvents, chatRooms as initialChatRooms, chatMessages } from './data/mockData';
import { Message, UserPoints, UserProfile } from './types';
import { Search, Filter } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [clubs, setClubs] = useState(initialClubs);
  const [events, setEvents] = useState(initialEvents);
  const [messages, setMessages] = useState<Record<string, Message[]>>(chatMessages);
  const [selectedChatRoom, setSelectedChatRoom] = useState<string | null>(null);
  const [selectedClub, setSelectedClub] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [userPoints, setUserPoints] = useState<UserPoints>({
    totalPoints: 0,
    checkedInEvents: []
  });
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@university.edu',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    bio: 'Computer Science major passionate about technology and community building. Love connecting with like-minded students and exploring new opportunities.',
    major: 'Computer Science',
    graduationYear: 2026,
    joinedDate: '2024-09-01',
    interests: ['Technology', 'Photography', 'Debate', 'Environmental Action', 'AI/ML'],
    achievements: [
      {
        id: '1',
        title: 'First Check-in',
        description: 'Checked in to your first event',
        icon: '🎯',
        unlockedDate: '2024-09-15',
        category: 'events'
      },
      {
        id: '2',
        title: 'Social Butterfly',
        description: 'Joined 3 different clubs',
        icon: '🦋',
        unlockedDate: '2024-10-01',
        category: 'clubs'
      }
    ],
    preferences: {
      emailNotifications: true,
      pushNotifications: true,
      eventReminders: true,
      chatNotifications: true,
      anonymousMode: false,
      profileVisibility: 'clubs'
    }
  });

  // Filter chat rooms based on club membership
  const availableChatRooms = initialChatRooms.filter(chatRoom => {
    const club = clubs.find(club => club.id === chatRoom.clubId);
    return club?.isJoined;
  });

  // Filter events to show only events from joined clubs
  const joinedClubEvents = useMemo(() => {
    const joinedClubIds = clubs.filter(club => club.isJoined).map(club => club.id);
    return events.filter(event => joinedClubIds.includes(event.clubId));
  }, [clubs, events]);

  // Separate clubs into joined and available
  const joinedClubs = clubs.filter(club => club.isJoined);
  const availableClubs = clubs.filter(club => !club.isJoined);

  // Get unique categories from all clubs
  const categories = useMemo(() => {
    const allCategories = clubs.map(club => club.category);
    return ['All', ...Array.from(new Set(allCategories))];
  }, [clubs]);

  // Filter available clubs based on search and category
  const filteredAvailableClubs = useMemo(() => {
    return availableClubs.filter(club => {
      const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           club.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || club.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [availableClubs, searchQuery, selectedCategory]);

  const handleToggleAttendance = (eventId: string) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { 
            ...event, 
            isAttending: !event.isAttending,
            attendeeCount: event.isAttending ? event.attendeeCount - 1 : event.attendeeCount + 1
          }
        : event
    ));
  };

  const handleToggleMembership = (clubId: string) => {
    setClubs(clubs.map(club => 
      club.id === clubId 
        ? { 
            ...club, 
            isJoined: !club.isJoined,
            memberCount: club.isJoined ? club.memberCount - 1 : club.memberCount + 1
          }
        : club
    ));
  };

  const handleCheckIn = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (!event || userPoints.checkedInEvents.includes(eventId)) return;

    // Update event as checked in
    setEvents(events.map(e => 
      e.id === eventId 
        ? { ...e, isCheckedIn: true }
        : e
    ));

    // Update user points
    setUserPoints(prev => ({
      totalPoints: prev.totalPoints + (event.points || 0),
      checkedInEvents: [...prev.checkedInEvents, eventId]
    }));
  };

  const handleUpdateProfile = (updatedProfile: UserProfile) => {
    setUserProfile(updatedProfile);
  };

  const handleSelectChatRoom = (roomId: string) => {
    setSelectedChatRoom(roomId);
  };

  const handleBackToChats = () => {
    setSelectedChatRoom(null);
  };

  const handleViewClubProfile = (clubId: string) => {
    setSelectedClub(clubId);
  };

  const handleBackToClubs = () => {
    setSelectedClub(null);
  };

  const handleJoinChatFromClub = (clubId: string) => {
    const chatRoom = availableChatRooms.find(room => room.clubId === clubId);
    if (chatRoom) {
      setActiveTab('chat');
      setSelectedChatRoom(chatRoom.id);
      setSelectedClub(null);
    }
  };

  const handleSendMessage = (message: string, isAnonymous: boolean) => {
    if (!selectedChatRoom) return;

    const currentMessages = messages[selectedChatRoom] || [];
    const newMessage = {
      id: `${selectedChatRoom}-${currentMessages.length + 1}`,
      content: message,
      sender: isAnonymous ? 'Anonymous' : 'You',
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }),
      avatar: isAnonymous 
        ? '' // Empty string for anonymous users - will be handled by the icon
        : userProfile.avatar
    };
    
    setMessages({
      ...messages,
      [selectedChatRoom]: [...currentMessages, newMessage]
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        if (selectedClub) {
          const club = clubs.find(c => c.id === selectedClub);
          if (club) {
            return (
              <ClubProfile
                club={club}
                events={events}
                onBack={handleBackToClubs}
                onToggleMembership={handleToggleMembership}
                onJoinChat={handleJoinChatFromClub}
              />
            );
          }
        }

        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Your Clubs Section */}
            {joinedClubs.length > 0 && (
              <div className="mb-12">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Clubs</h2>
                  <p className="text-gray-600">The perfect layers of your club sandwich - your current memberships</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {joinedClubs.map(club => (
                    <ClubCard 
                      key={club.id} 
                      club={club} 
                      onToggleMembership={handleToggleMembership}
                      onViewProfile={handleViewClubProfile}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Explore Section */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {joinedClubs.length > 0 ? 'Explore More Clubs' : 'Student Clubs'}
                </h2>
                <p className="text-gray-600">
                  {joinedClubs.length > 0 
                    ? 'Add more delicious layers to your club sandwich - discover new flavors and communities' 
                    : 'Build your perfect club sandwich - find communities that match your taste'
                  }
                </p>
              </div>

              {/* Search and Filter Controls */}
              {availableClubs.length > 0 && (
                <div className="mb-8 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:space-x-4">
                  {/* Search Bar */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search clubs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white shadow-sm"
                    />
                  </div>

                  {/* Category Filter */}
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white shadow-sm appearance-none cursor-pointer min-w-[140px]"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Results Count */}
                  <div className="text-sm text-gray-600 whitespace-nowrap">
                    {filteredAvailableClubs.length} of {availableClubs.length} clubs
                  </div>
                </div>
              )}

              {/* Clubs Grid */}
              {availableClubs.length > 0 ? (
                filteredAvailableClubs.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAvailableClubs.map(club => (
                      <ClubCard 
                        key={club.id} 
                        club={club} 
                        onToggleMembership={handleToggleMembership}
                        onViewProfile={handleViewClubProfile}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                    <div className="text-gray-400 mb-4">
                      <Search className="w-16 h-16 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No clubs found</h3>
                    <p className="text-gray-600 mb-4">
                      Try adjusting your search terms or category filter to find more clubs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                      <button
                        onClick={() => setSearchQuery('')}
                        className="px-4 py-2 text-green-600 hover:text-green-700 font-medium"
                      >
                        Clear search
                      </button>
                      <button
                        onClick={() => setSelectedCategory('All')}
                        className="px-4 py-2 text-green-600 hover:text-green-700 font-medium"
                      >
                        Show all categories
                      </button>
                    </div>
                  </div>
                )
              ) : (
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">You've Joined All Available Clubs!</h3>
                  <p className="text-gray-600">Great job exploring all the clubs. Check back later for new clubs or events.</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'events':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Upcoming Events</h2>
              <p className="text-gray-600">Fresh ingredients for your club sandwich - exciting events from your communities</p>
            </div>
            
            {joinedClubEvents.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
                <div className="lg:col-span-1">
                  <Calendar events={joinedClubEvents} />
                </div>
                <div className="lg:col-span-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {joinedClubEvents.map(event => (
                      <EventCard 
                        key={event.id} 
                        event={event} 
                        onToggleAttendance={handleToggleAttendance}
                        onCheckIn={handleCheckIn}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h2a2 2 0 012 2v1m-6 0h6m-6 0l-.5 3.5A2 2 0 0010.24 13H13.76a2 2 0 001.74-1.5L16 8m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Events Available</h3>
                <p className="text-gray-600 mb-4">
                  Join clubs to see their upcoming events and start participating in activities.
                </p>
                <button
                  onClick={() => setActiveTab('home')}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Browse Clubs
                </button>
              </div>
            )}
          </div>
        );

      case 'chat':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {selectedChatRoom ? (
              <div className="h-[600px]">
                <ChatRoom
                  roomName={availableChatRooms.find(room => room.id === selectedChatRoom)?.name || ''}
                  messages={messages[selectedChatRoom] || []}
                  onBack={handleBackToChats}
                  onSendMessage={handleSendMessage}
                />
              </div>
            ) : (
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Group Chats</h2>
                  <p className="text-gray-600">The secret sauce that brings your club sandwich together - connect with your communities</p>
                </div>
                {availableChatRooms.length > 0 ? (
                  <ChatList 
                    chatRooms={availableChatRooms} 
                    onSelectRoom={handleSelectChatRoom}
                  />
                ) : (
                  <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                    <div className="text-gray-400 mb-4">
                      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Group Chats Available</h3>
                    <p className="text-gray-600 mb-4">Join clubs to access their group chats and connect with members.</p>
                    <button
                      onClick={() => setActiveTab('home')}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Browse Clubs
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case 'points':
        return <PointsSection userPoints={userPoints} events={joinedClubEvents} />;

      case 'profile':
        return (
          <ProfileSection
            userProfile={userProfile}
            userPoints={userPoints}
            clubs={clubs}
            events={events}
            onUpdateProfile={handleUpdateProfile}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </div>
  );
}

export default App;
