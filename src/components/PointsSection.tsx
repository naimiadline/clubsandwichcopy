import React from 'react';
import { Trophy, Star, Calendar, CheckCircle, Award, Target } from 'lucide-react';
import { Event, UserPoints } from '../types';

interface PointsSectionProps {
  userPoints: UserPoints;
  events: Event[];
}

const PointsSection: React.FC<PointsSectionProps> = ({ userPoints, events }) => {
  const checkedInEvents = events.filter(event => event.isCheckedIn);
  const upcomingAttendingEvents = events.filter(event => event.isAttending && !event.isCheckedIn);
  
  const totalPossiblePoints = events
    .filter(event => event.isAttending)
    .reduce((sum, event) => sum + (event.points || 0), 0);

  const getPointsLevel = (points: number) => {
    if (points >= 500) return { level: 'Gold', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    if (points >= 250) return { level: 'Silver', color: 'text-gray-600', bgColor: 'bg-gray-100' };
    if (points >= 100) return { level: 'Bronze', color: 'text-orange-600', bgColor: 'bg-orange-100' };
    return { level: 'Starter', color: 'text-green-600', bgColor: 'bg-green-100' };
  };

  const currentLevel = getPointsLevel(userPoints.totalPoints);
  const nextLevelThreshold = userPoints.totalPoints >= 500 ? 1000 : 
                            userPoints.totalPoints >= 250 ? 500 : 
                            userPoints.totalPoints >= 100 ? 250 : 100;
  const progressPercentage = Math.min((userPoints.totalPoints / nextLevelThreshold) * 100, 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Points & Achievements</h2>
        <p className="text-gray-600">The special rewards for building your perfect club sandwich - earn points and unlock achievements</p>
      </div>

      {/* Points Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Points */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Trophy className="w-8 h-8" />
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${currentLevel.bgColor} ${currentLevel.color}`}>
              {currentLevel.level}
            </span>
          </div>
          <div className="text-3xl font-bold mb-2">{userPoints.totalPoints}</div>
          <div className="text-green-100">Total Points</div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-green-100 mb-1">
              <span>Progress to next level</span>
              <span>{userPoints.totalPoints}/{nextLevelThreshold}</span>
            </div>
            <div className="w-full bg-green-400 bg-opacity-30 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Events Checked In */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{checkedInEvents.length}</div>
              <div className="text-sm text-gray-500">Events Attended</div>
            </div>
          </div>
          <div className="text-gray-600">Keep attending events to earn more points!</div>
        </div>

        {/* Potential Points */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <Target className="w-8 h-8 text-orange-500" />
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{totalPossiblePoints - userPoints.totalPoints}</div>
              <div className="text-sm text-gray-500">Points Available</div>
            </div>
          </div>
          <div className="text-gray-600">From upcoming events you're attending</div>
        </div>
      </div>

      {/* Recent Check-ins */}
      {checkedInEvents.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Award className="w-6 h-6 mr-2 text-green-500" />
            Recent Check-ins
          </h3>
          <div className="space-y-3">
            {checkedInEvents.slice(0, 5).map(event => (
              <div key={event.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <div className="font-medium text-gray-900">{event.title}</div>
                    <div className="text-sm text-gray-500">{event.clubName}</div>
                  </div>
                </div>
                <div className="text-green-600 font-bold">+{event.points} pts</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Opportunities */}
      {upcomingAttendingEvents.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-green-500" />
            Upcoming Check-in Opportunities
          </h3>
          <div className="space-y-3">
            {upcomingAttendingEvents.map(event => (
              <div key={event.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-green-500" />
                  <div>
                    <div className="font-medium text-gray-900">{event.title}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(event.date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })} at {event.time}
                    </div>
                  </div>
                </div>
                <div className="text-green-600 font-bold">{event.points} pts</div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-700">
              <strong>Tip:</strong> Check in at events to earn points and track your engagement!
            </p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {checkedInEvents.length === 0 && upcomingAttendingEvents.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-gray-400 mb-4">
            <Trophy className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Start Earning Points!</h3>
          <p className="text-gray-600 mb-4">
            Attend events and check in to start collecting points and tracking your engagement.
          </p>
          <button
            onClick={() => window.location.hash = '#events'}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Browse Events
          </button>
        </div>
      )}
    </div>
  );
};

export default PointsSection;
