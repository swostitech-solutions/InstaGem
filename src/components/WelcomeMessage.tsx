import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const WelcomeMessage = () => {
  const { user } = useAuth();
  const [show, setShow] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if we should show the welcome message
    const welcomeShown = localStorage.getItem(`welcome_shown_${user?._id}`);
    
    if (!welcomeShown && user) {
      setShow(true);
      setHasShown(true);
      localStorage.setItem(`welcome_shown_${user._id}`, 'true');
      
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setShow(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [user]);

  const getAgeGroup = (age: number) => {
    if (age >= 1 && age <= 4) return { group: 'Little Explorer', emoji: '🌟', color: 'from-yellow-400 to-orange-400' };
    if (age >= 5 && age <= 8) return { group: 'Young Learner', emoji: '🎨', color: 'from-blue-400 to-purple-400' };
    if (age >= 9 && age <= 12) return { group: 'Smart Scholar', emoji: '🚀', color: 'from-green-400 to-teal-400' };
    return { group: 'Teen Genius', emoji: '🧠', color: 'from-pink-400 to-purple-500' };
  };

  if (!show || !user || !user.childAge) return null;

  const ageInfo = getAgeGroup(user.childAge);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md mx-4 p-8 transform animate-scaleIn">
        <div className="text-center">
          {/* Animated emoji */}
          <div className="text-7xl mb-4 animate-bounce">
            {ageInfo.emoji}
          </div>
          
          {/* Gradient text */}
          <h2 className={`text-3xl font-bold mb-3 bg-gradient-to-r ${ageInfo.color} bg-clip-text text-transparent`}>
            Welcome, {user.fullName || user.username}! 🎉
          </h2>
          
          {/* Age group badge */}
          <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${ageInfo.color} text-white font-semibold mb-4`}>
            {ageInfo.group} ({user.childAge} years old)
          </div>
          
          {/* Message */}
          <p className="text-gray-700 text-lg mb-2">
            Your feed is now optimized! 🎯
          </p>
          <p className="text-gray-600 mb-6">
            We've handpicked {user.childAge >= 13 ? 'amazing educational content' : 'fun learning videos'} just for you!
          </p>
          
          {/* Fun facts based on age */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-700">
              {user.childAge <= 4 && "🎈 Get ready to explore colors, shapes, and stories!"}
              {user.childAge >= 5 && user.childAge <= 8 && "📚 Time to learn science, math, and amazing facts!"}
              {user.childAge >= 9 && user.childAge <= 12 && "🔬 Dive into experiments, history, and cool discoveries!"}
              {user.childAge >= 13 && "🎓 Explore advanced topics, projects, and inspiring ideas!"}
            </p>
          </div>
          
          {/* Close button */}
          <button
            onClick={() => setShow(false)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Let's Start Learning! 🚀
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
