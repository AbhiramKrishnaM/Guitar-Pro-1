import { useEffect } from 'react';
import { useGuitar, guitarActions } from '../../contexts/GuitarContext';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

export function Notification() {
  const { state, dispatch } = useGuitar();

  // Auto-hide notification after 3 seconds
  useEffect(() => {
    if (state.notification) {
      const timer = setTimeout(() => {
        dispatch(guitarActions.hideNotification());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [state.notification, dispatch]);

  if (!state.notification) return null;

  const { message, type } = state.notification;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'error':
        return <XCircle className="w-5 h-5" />;
      case 'info':
        return <Info className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'info':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <div className={`${getBgColor()} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in`}>
        {getIcon()}
        <span className="flex-1 text-sm font-medium">{message}</span>
        <button
          onClick={() => dispatch(guitarActions.hideNotification())}
          className="text-white hover:text-gray-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
