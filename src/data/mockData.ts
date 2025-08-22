import { Club, Event, Message, ChatRoom } from '../types';

export const clubs: Club[] = [
  {
    id: '1',
    name: 'Photography Club',
    description: 'Capture moments, create memories. Join us for photo walks, workshops, and exhibitions.',
    category: 'Arts',
    memberCount: 156,
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop',
    isJoined: true
  },
  {
    id: '2',
    name: 'Debate Society',
    description: 'Sharpen your argumentative skills and engage in intellectual discourse.',
    category: 'Academic',
    memberCount: 89,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    isJoined: true
  },
  {
    id: '3',
    name: 'Environmental Action',
    description: 'Making our campus and community more sustainable, one project at a time.',
    category: 'Service',
    memberCount: 234,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop',
    isJoined: false
  },
  {
    id: '4',
    name: 'Tech Innovation Lab',
    description: 'Building the future through code, hardware, and creative problem-solving.',
    category: 'Technology',
    memberCount: 312,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
    isJoined: true
  },
  {
    id: '5',
    name: 'Cultural Exchange',
    description: 'Celebrating diversity through food, music, and traditions from around the world.',
    category: 'Cultural',
    memberCount: 198,
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop',
    isJoined: false
  }
];

// Sort events by date (earliest first)
export const events: Event[] = [
  {
    id: '1',
    title: 'Golden Hour Photography Workshop',
    description: 'Learn the secrets of capturing stunning golden hour photos. Bring your camera and join us at the campus lake.',
    date: '2025-08-28',
    time: '17:30',
    location: 'Campus Lake',
    clubId: '1',
    clubName: 'Photography Club',
    attendeeCount: 24,
    isAttending: true,
    image: 'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=400&h=300&fit=crop',
    checkInCode: 'PHOTO2025',
    points: 50,
    isCheckedIn: false
  },
  {
    id: '2',
    title: 'Climate Change Debate',
    description: 'A structured debate on climate policy solutions. Open to all skill levels.',
    date: '2025-09-05',
    time: '19:00',
    location: 'Student Union Hall',
    clubId: '2',
    clubName: 'Debate Society',
    attendeeCount: 45,
    isAttending: false,
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=300&fit=crop',
    checkInCode: 'DEBATE2025',
    points: 75,
    isCheckedIn: false
  },
  {
    id: '3',
    title: 'Campus Cleanup Drive',
    description: 'Join us for our monthly campus beautification project. Gloves and supplies provided.',
    date: '2025-09-12',
    time: '09:00',
    location: 'Main Quad',
    clubId: '3',
    clubName: 'Environmental Action',
    attendeeCount: 67,
    isAttending: true,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    checkInCode: 'CLEAN2025',
    points: 100,
    isCheckedIn: false
  },
  {
    id: '4',
    title: 'AI Workshop: Building Chatbots',
    description: 'Hands-on workshop on creating intelligent chatbots using modern AI frameworks.',
    date: '2025-09-18',
    time: '14:00',
    location: 'Computer Lab 3',
    clubId: '4',
    clubName: 'Tech Innovation Lab',
    attendeeCount: 38,
    isAttending: true,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
    checkInCode: 'AITECH2025',
    points: 125,
    isCheckedIn: false
  },
  {
    id: '5',
    title: 'International Food Festival',
    description: 'Taste authentic dishes from around the world prepared by our international students.',
    date: '2025-09-25',
    time: '18:00',
    location: 'Student Center Plaza',
    clubId: '5',
    clubName: 'Cultural Exchange',
    attendeeCount: 156,
    isAttending: false,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
    checkInCode: 'CULTURE2025',
    points: 80,
    isCheckedIn: false
  }
].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

export const chatRooms: ChatRoom[] = [
  {
    id: '1',
    name: 'Photography Club General',
    clubId: '1',
    lastMessage: 'Great shots from yesterday\'s workshop!',
    lastMessageTime: '2 min ago',
    unreadCount: 3,
    avatar: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=100&h=100&fit=crop'
  },
  {
    id: '2',
    name: 'Debate Society',
    clubId: '2',
    lastMessage: 'Next topic: Universal Basic Income',
    lastMessageTime: '15 min ago',
    unreadCount: 0,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
  },
  {
    id: '3',
    name: 'Tech Innovation Lab',
    clubId: '4',
    lastMessage: 'Check out this new React library!',
    lastMessageTime: '1 hour ago',
    unreadCount: 7,
    avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop'
  },
  {
    id: '4',
    name: 'Environmental Action Chat',
    clubId: '3',
    lastMessage: 'Planning next cleanup location',
    lastMessageTime: '3 hours ago',
    unreadCount: 2,
    avatar: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=100&h=100&fit=crop'
  },
  {
    id: '5',
    name: 'Cultural Exchange Hub',
    clubId: '5',
    lastMessage: 'Food festival prep meeting tomorrow',
    lastMessageTime: '1 day ago',
    unreadCount: 5,
    avatar: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=100&h=100&fit=crop'
  }
];

// Mock messages for each chat room - exactly 3 messages per group
export const chatMessages: Record<string, Message[]> = {
  '1': [ // Photography Club General
    {
      id: '1-1',
      content: 'Hey everyone! Just uploaded the photos from yesterday\'s golden hour session. Check them out!',
      sender: 'Alex Chen',
      timestamp: '10:30 AM',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
    },
    {
      id: '1-2',
      content: 'Amazing work Alex! The lighting in photo #3 is incredible 📸',
      sender: 'Sarah Johnson',
      timestamp: '10:32 AM',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
    },
    {
      id: '1-3',
      content: 'Great shots from yesterday\'s workshop!',
      sender: 'Mike Rodriguez',
      timestamp: '10:35 AM',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
    }
  ],
  '2': [ // Debate Society
    {
      id: '2-1',
      content: 'Welcome everyone to our weekly debate prep session!',
      sender: 'Dr. Martinez',
      timestamp: '2:00 PM',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
    },
    {
      id: '2-2',
      content: 'This week\'s topic is Universal Basic Income. Who wants to argue for the proposition?',
      sender: 'Dr. Martinez',
      timestamp: '2:01 PM',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
    },
    {
      id: '2-3',
      content: 'Next topic: Universal Basic Income',
      sender: 'Jessica Park',
      timestamp: '2:03 PM',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop'
    }
  ],
  '3': [ // Tech Innovation Lab
    {
      id: '3-1',
      content: 'Just discovered this amazing new React library for animations! 🚀',
      sender: 'Alex Thompson',
      timestamp: '11:15 AM',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
    },
    {
      id: '3-2',
      content: 'Which one? I\'ve been looking for something better than Framer Motion.',
      sender: 'Maya Patel',
      timestamp: '11:17 AM',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'
    },
    {
      id: '3-3',
      content: 'Check out this new React library!',
      sender: 'Jordan Lee',
      timestamp: '11:18 AM',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
    }
  ],
  '4': [ // Environmental Action Chat
    {
      id: '4-1',
      content: 'Great turnout for last week\'s campus cleanup! We collected over 50 bags of trash.',
      sender: 'Emma Green',
      timestamp: '9:00 AM',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
    },
    {
      id: '4-2',
      content: 'That\'s amazing! Where should we focus our efforts next?',
      sender: 'Carlos Rivera',
      timestamp: '9:15 AM',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
    },
    {
      id: '4-3',
      content: 'Planning next cleanup location',
      sender: 'Anonymous',
      timestamp: '9:30 AM',
      avatar: '' // Empty for anonymous - will show faceless icon
    }
  ],
  '5': [ // Cultural Exchange Hub
    {
      id: '5-1',
      content: 'Excited for the International Food Festival! I\'m bringing homemade dumplings 🥟',
      sender: 'Li Wei',
      timestamp: '3:00 PM',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
    },
    {
      id: '5-2',
      content: 'Perfect! I\'m making authentic tacos. Can\'t wait to share my grandmother\'s recipe!',
      sender: 'Maria Santos',
      timestamp: '3:15 PM',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
    },
    {
      id: '5-3',
      content: 'Food festival prep meeting tomorrow',
      sender: 'Ahmed Hassan',
      timestamp: '3:30 PM',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
    }
  ]
};

// Legacy export for backward compatibility - now returns empty array
export const messages: Message[] = [];
