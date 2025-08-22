import React, { useState } from 'react';
import { X, QrCode, Hash, CheckCircle, AlertCircle } from 'lucide-react';

interface CheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  eventPoints: number;
  correctCode: string;
  onCheckIn: () => void;
}

const CheckInModal: React.FC<CheckInModalProps> = ({
  isOpen,
  onClose,
  eventTitle,
  eventPoints,
  correctCode,
  onCheckIn
}) => {
  const [checkInMethod, setCheckInMethod] = useState<'code' | 'qr'>('code');
  const [enteredCode, setEnteredCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCodeSubmit = () => {
    if (enteredCode.toUpperCase() === correctCode) {
      setSuccess(true);
      setError('');
      setTimeout(() => {
        onCheckIn();
        onClose();
        setSuccess(false);
        setEnteredCode('');
      }, 1500);
    } else {
      setError('Invalid check-in code. Please try again.');
      setEnteredCode('');
    }
  };

  const handleQRScan = () => {
    setIsScanning(true);
    // Simulate QR scanning process
    setTimeout(() => {
      setIsScanning(false);
      setSuccess(true);
      setTimeout(() => {
        onCheckIn();
        onClose();
        setSuccess(false);
      }, 1500);
    }, 2000);
  };

  const handleClose = () => {
    setEnteredCode('');
    setError('');
    setSuccess(false);
    setIsScanning(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Check In to Event</h3>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Event Info */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-gray-900 mb-1">{eventTitle}</h4>
            <div className="flex items-center text-blue-600">
              <span className="text-sm font-medium">Earn {eventPoints} points</span>
            </div>
          </div>

          {/* Success State */}
          {success && (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Check-in Successful!</h4>
              <p className="text-gray-600">You've earned {eventPoints} points</p>
            </div>
          )}

          {/* Check-in Methods */}
          {!success && (
            <>
              {/* Method Selection */}
              <div className="flex space-x-2 mb-6">
                <button
                  onClick={() => setCheckInMethod('code')}
                  className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors ${
                    checkInMethod === 'code'
                      ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                      : 'bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100'
                  }`}
                >
                  <Hash className="w-5 h-5" />
                  <span className="font-medium">Enter Code</span>
                </button>
                <button
                  onClick={() => setCheckInMethod('qr')}
                  className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors ${
                    checkInMethod === 'qr'
                      ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                      : 'bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100'
                  }`}
                >
                  <QrCode className="w-5 h-5" />
                  <span className="font-medium">Scan QR</span>
                </button>
              </div>

              {/* Code Entry Method */}
              {checkInMethod === 'code' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter Check-in Code
                    </label>
                    <input
                      type="text"
                      value={enteredCode}
                      onChange={(e) => {
                        setEnteredCode(e.target.value.toUpperCase());
                        setError('');
                      }}
                      placeholder="Enter code here..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg font-mono tracking-wider"
                      maxLength={20}
                    />
                  </div>
                  
                  {error && (
                    <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                      <AlertCircle className="w-5 h-5" />
                      <span className="text-sm">{error}</span>
                    </div>
                  )}

                  <button
                    onClick={handleCodeSubmit}
                    disabled={!enteredCode.trim()}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Check In
                  </button>
                </div>
              )}

              {/* QR Scanning Method */}
              {checkInMethod === 'qr' && (
                <div className="text-center space-y-4">
                  {!isScanning ? (
                    <>
                      <div className="bg-gray-100 rounded-lg p-8 mb-4">
                        <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Tap to scan QR code</p>
                      </div>
                      <button
                        onClick={handleQRScan}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                      >
                        Start QR Scanner
                      </button>
                    </>
                  ) : (
                    <div className="bg-blue-50 rounded-lg p-8">
                      <div className="animate-pulse">
                        <QrCode className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                        <p className="text-blue-700 font-medium">Scanning QR code...</p>
                        <div className="mt-4 flex justify-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* Hint for demo */}
          {!success && checkInMethod === 'code' && (
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
              <p className="text-xs text-yellow-700">
                <strong>Demo hint:</strong> Try entering "{correctCode}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckInModal;
