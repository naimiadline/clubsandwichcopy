export interface Club {
  id: string;
  name: string;
  description: string;
  category: string;
  memberCount: number;
  image: string;
  isJoined: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  clubId: string;
  clubName: string;
  attendeeCount: number;
  isAttending: boolean;
  image: string;
  checkInCode?: string;
  isCheckedIn?: boolean;
  points?: number;
}

export interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
  avatar: string;
}

export interface ChatRoom {
  id: string;
  name: string;
  clubId: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  avatar: string;
}

export interface UserPoints {
  totalPoints: number;
  checkedInEvents: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  major: string;
  graduationYear: number;
  joinedDate: string;
  interests: string[];
  achievements: Achievement[];
  preferences: UserPreferences;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedDate: string;
  category: 'events' | 'social' | 'clubs' | 'points';
}

export interface UserPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  eventReminders: boolean;
  chatNotifications: boolean;
  anonymousMode: boolean;
  profileVisibility: 'public' | 'clubs' | 'private';
}
