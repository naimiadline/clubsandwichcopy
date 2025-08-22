import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Calendar, 
  MapPin, 
  Award, 
  Settings, 
  Edit3, 
  Save, 
  X,
  Bell,
  Shield,
  Eye,
  Trophy,
  Users,
  MessageCircle,
  Star
} from 'lucide-react';
import { UserProfile, UserPoints, Club, Event } from '../types';

interface ProfileSectionProps {
  userProfile: UserProfile;
  userPoints: UserPoints;
  clubs: Club[];
  events: Event[];
  onUpdateProfile: (profile: UserProfile) => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  userProfile,
  userPoints,
  clubs,
  events,
  onUpdateProfile
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(userProfile);
  const [activeSettingsTab, setActiveSettingsTab] = useState('notifications');

  const joinedClubs = clubs.filter(club => club.isJoined);
  const attendedEvents = events.filter(event => event.isCheckedIn);
  const upcomingEvents = events.filter(event => event.isAttending && !event.isCheckedIn);

  const getPointsLevel = (points: number) => {
    if (points >= 500) return { level: 'Gold', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    if (points >= 250) return { level: 'Silver', color: 'text-gray-600', bgColor: 'bg-gray-100' };
    if (points >= 100) return { level: 'Bronze', color: 'text-orange-600', bgColor: 'bg-orange-100' };
    return { level: 'Starter', color: 'text-green-600', bgColor: 'bg-green-100' };
  };

  const currentLevel = getPointsLevel(userPoints.totalPoints);

  const handleSaveProfile = () => {
    onUpdateProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedProfile(userProfile);
    setIsEditing(false);
  };

  const updatePreference = (key: keyof typeof userProfile.preferences, value: boolean | string) => {
    setEditedProfile({
      ...editedProfile,
      preferences: {
        ...editedProfile.preferences,
        [key]: value
      }
    });
  };

  const addInterest = (interest: string) => {
    if (interest && !editedProfile.interests.includes(interest)) {
      setEditedProfile({
        ...editedProfile,
        interests: [...editedProfile.interests, interest]
      });
    }
  };

  const removeInterest = (interest: string) => {
    setEditedProfile({
      ...editedProfile,
      interests: editedProfile.interests.filter(i => i !== interest)
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-8 text-white">
              <div className="text-center">
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
                />
                <h2 className="text-2xl font-bold mb-1">{userProfile.name}</h2>
                <p className="text-green-100 mb-2">{userProfile.major}</p>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${currentLevel.bgColor} ${currentLevel.color}`}>
                  <Trophy className="w-4 h-4 mr-1" />
                  {currentLevel.level} Member
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="p-6">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                      value={editedProfile.bio}
                      onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Major</label>
                    <input
                      type="text"
                      value={editedProfile.major}
                      onChange={(e) => setEditedProfile({...editedProfile, major: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
                    <input
                      type="number"
                      value={editedProfile.graduationYear}
                      onChange={(e) => setEditedProfile({...editedProfile, graduationYear: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSaveProfile}
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-1"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors flex items-center justify-center space-x-1"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-gray-600 mb-4">{userProfile.bio}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-4 h-4 mr-3" />
                      <span className="text-sm">{userProfile.email}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-3" />
                      <span className="text-sm">Class of {userProfile.graduationYear}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-3" />
                      <span className="text-sm">Joined {new Date(userProfile.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-1"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{userPoints.totalPoints}</div>
                <div className="text-sm text-gray-500">Total Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{joinedClubs.length}</div>
                <div className="text-sm text-gray-500">Clubs Joined</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{attendedEvents.length}</div>
                <div className="text-sm text-gray-500">Events Attended</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{upcomingEvents.length}</div>
                <div className="text-sm text-gray-500">Upcoming Events</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Interests */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {userProfile.interests.map((interest, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1"
                >
                  <span>{interest}</span>
                  {isEditing && (
                    <button
                      onClick={() => removeInterest(interest)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))}
              {isEditing && (
                <button
                  onClick={() => {
                    const interest = prompt('Add new interest:');
                    if (interest) addInterest(interest);
                  }}
                  className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  + Add Interest
                </button>
              )}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2 text-yellow-500" />
              Achievements
            </h3>
            {userProfile.achievements.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userProfile.achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <div className="font-medium text-gray-900">{achievement.title}</div>
                      <div className="text-sm text-gray-600">{achievement.description}</div>
                      <div className="text-xs text-gray-500">
                        Unlocked {new Date(achievement.unlockedDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Award className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>No achievements yet. Keep participating to unlock achievements!</p>
              </div>
            )}
          </div>

          {/* Settings */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              Settings
            </h3>

            {/* Settings Tabs */}
            <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
              {[
                { id: 'notifications', label: 'Notifications', icon: Bell },
                { id: 'privacy', label: 'Privacy', icon: Shield },
                { id: 'preferences', label: 'Preferences', icon: User }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSettingsTab(tab.id)}
                    className={`flex-1 py-2 px-3 rounded-md flex items-center justify-center space-x-1 text-sm font-medium transition-colors ${
                      activeSettingsTab === tab.id
                        ? 'bg-white text-green-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Settings Content */}
            <div className="space-y-4">
              {activeSettingsTab === 'notifications' && (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">Email Notifications</div>
                      <div className="text-sm text-gray-500">Receive updates via email</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editedProfile.preferences.emailNotifications}
                        onChange={(e) => updatePreference('emailNotifications', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">Event Reminders</div>
                      <div className="text-sm text-gray-500">Get reminded about upcoming events</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editedProfile.preferences.eventReminders}
                        onChange={(e) => updatePreference('eventReminders', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">Chat Notifications</div>
                      <div className="text-sm text-gray-500">Notifications for new messages</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editedProfile.preferences.chatNotifications}
                        onChange={(e) => updatePreference('chatNotifications', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                </>
              )}

              {activeSettingsTab === 'privacy' && (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">Profile Visibility</div>
                      <div className="text-sm text-gray-500">Who can see your profile</div>
                    </div>
                    <select
                      value={editedProfile.preferences.profileVisibility}
                      onChange={(e) => updatePreference('profileVisibility', e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="public">Public</option>
                      <option value="clubs">Club Members Only</option>
                      <option value="private">Private</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">Anonymous Mode</div>
                      <div className="text-sm text-gray-500">Default to anonymous in chats</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editedProfile.preferences.anonymousMode}
                        onChange={(e) => updatePreference('anonymousMode', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                </>
              )}

              {activeSettingsTab === 'preferences' && (
                <div className="space-y-4">
                  <div className="text-center py-4 text-gray-500">
                    <Settings className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p>Additional preferences coming soon!</p>
                  </div>
                </div>
              )}
            </div>

            {/* Save Settings Button */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={handleSaveProfile}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-1"
              >
                <Save className="w-4 h-4" />
                <span>Save Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
