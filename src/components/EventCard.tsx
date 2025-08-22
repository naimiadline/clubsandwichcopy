import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, CheckCircle, QrCode } from 'lucide-react';
import { Event } from '../types';
import CheckInModal from './CheckInModal';

interface EventCardProps {
  event: Event;
  onToggleAttendance: (eventId: string) => void;
  onCheckIn?: (eventId: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onToggleAttendance, onCheckIn }) => {
  const [showCheckInModal, setShowCheckInModal] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleCheckIn = () => {
    if (onCheckIn) {
      onCheckIn(event.id);
    }
    setShowCheckInModal(false);
  };

  const canCheckIn = event.isAttending && !event.isCheckedIn;

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
        <div className="relative">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-48 object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=300&fit=crop';
            }}
          />
          {event.isCheckedIn && (
            <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full flex items-center space-x-1 text-sm font-medium">
              <CheckCircle className="w-4 h-4" />
              <span>Checked In</span>
            </div>
          )}
          {event.points && (
            <div className="absolute top-3 left-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              {event.points} pts
            </div>
          )}
        </div>
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-900 leading-tight">{event.title}</h3>
          </div>
          
          <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-gray-500">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm">{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <Clock className="w-4 h-4 mr-2" />
              <span className="text-sm">{event.time}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="text-sm">{event.location}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <Users className="w-4 h-4 mr-2" />
              <span className="text-sm">{event.attendeeCount} attending</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{event.clubName}</span>
            <div className="flex space-x-2">
              {canCheckIn && (
                <button
                  onClick={() => setShowCheckInModal(true)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-1 text-sm font-medium"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Check In</span>
                </button>
              )}
              <button
                onClick={() => onToggleAttendance(event.id)}
                className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                  event.isAttending
                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {event.isAttending ? 'Attending' : 'Attend'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <CheckInModal
        isOpen={showCheckInModal}
        onClose={() => setShowCheckInModal(false)}
        eventTitle={event.title}
        eventPoints={event.points || 0}
        correctCode={event.checkInCode || ''}
        onCheckIn={handleCheckIn}
      />
    </>
  );
};

export default EventCard;
