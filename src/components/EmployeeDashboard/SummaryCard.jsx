import React from 'react';
import { FaUserTie } from 'react-icons/fa';
import { UseAuth } from '../../context/authcontext';

const SummaryCard = () => {
  const { user } = UseAuth();
  const name = user?.name || 'Employee';

  // Time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Motivational quotes
  const quotes = [
    "Believe in yourself. You are braver than you think.",
    "Success is the sum of small efforts repeated every day.",
    "Your potential is endless—keep pushing forward.",
    "Progress, not perfection. One step at a time.",
    "Today is a perfect day to grow and shine!"
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  // Current date
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 flex flex-col md:flex-row items-center justify-between mb-6 animate-fade-in">
      <div className="flex items-center mb-4 md:mb-0">
        <div className="bg-blue-600 p-4 rounded-full text-white text-3xl shadow-md">
          <FaUserTie />
        </div>
        <div className="ml-5">
          <h2 className="text-xl font-bold text-gray-800">{getGreeting()}, {name} 👋</h2>
          <p className="text-sm text-gray-500">{today}</p>
        </div>
      </div>
      <div className="text-center md:text-right mt-2 md:mt-0 max-w-md">
        <p className="text-md italic text-gray-700 font-medium">“{randomQuote}”</p>
      </div>
    </div>
  );
};

export default SummaryCard;
