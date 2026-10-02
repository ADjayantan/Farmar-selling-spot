import React, { useState } from 'react';
import { Search, MoreVertical, CheckCheck } from 'lucide-react';

const mockChats = [
  { id: 1, name: 'Suresh Transport', message: 'Tractor ready at 5 PM tomorrow.', time: '10:30 AM', unread: 2, item: 'Mahindra Tractor 575 DI', type: 'selling', image: 'https://images.unsplash.com/photo-1592837965902-1249b67362d2?w=100&q=80' },
  { id: 2, name: 'Ravi Kumar (Buyer)', message: 'Can you reduce the price to ₹1,00,000?', time: 'Yesterday', unread: 0, item: 'Premium Ponni Rice - 50 Q', type: 'selling', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100&q=80' },
  { id: 3, name: 'Agri Inputs Store', message: 'Yes, seeds are in stock.', time: 'Oct 1', unread: 0, item: 'Organic Tomato Seeds', type: 'buying', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=100&q=80' }
];

const Chats: React.FC = () => {
  const [tab, setTab] = useState<'selling' | 'buying'>('selling');
  
  const filteredChats = mockChats.filter(chat => chat.type === tab);

  return (
    <div className="flex flex-col min-h-screen bg-[#121212] text-white">
      {/* Header */}
      <div className="bg-[#121212] p-4 font-bold border-b border-gray-800 sticky top-0 z-10 flex justify-between items-center">
        <h1 className="text-xl tracking-wide">INBOX</h1>
        <div className="flex space-x-4">
          <Search size={22} className="text-white" />
          <MoreVertical size={22} className="text-white" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#121212] border-b border-gray-800">
        <button 
          className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider ${tab === 'selling' ? 'border-b-4 border-[#1a56db] text-white' : 'text-gray-500 border-b-4 border-transparent'}`}
          onClick={() => setTab('selling')}
        >
          Selling
        </button>
        <button 
          className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider ${tab === 'buying' ? 'border-b-4 border-[#1a56db] text-white' : 'text-gray-500 border-b-4 border-transparent'}`}
          onClick={() => setTab('buying')}
        >
          Buying
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-20">
        {filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center px-4">
            <div className="text-6xl mb-4 opacity-50">🕵️</div>
            <h2 className="text-lg font-bold text-gray-200">No chats here yet</h2>
            <p className="text-sm text-gray-500 mt-2">When buyers contact you, messages will appear here.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-800">
            {filteredChats.map(chat => (
              <div key={chat.id} onClick={() => alert('Chat interface coming soon!')} className="flex p-4 bg-[#1e1e1e] hover:bg-[#2a2a2a] cursor-pointer transition">
                <div className="relative w-14 h-14 bg-gray-800 rounded-full mr-4 flex-shrink-0 overflow-hidden border border-gray-700">
                   <div className="w-full h-full flex items-center justify-center text-xl bg-gradient-to-br from-blue-900 to-black text-white font-bold">
                     {chat.name.charAt(0)}
                   </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-sm font-bold text-gray-200 truncate pr-2">{chat.name}</h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap">{chat.time}</span>
                  </div>
                  <p className="text-sm text-gray-400 truncate mb-1">{chat.item}</p>
                  <div className="flex items-center">
                    {chat.unread === 0 && <CheckCheck size={14} className="text-blue-500 mr-1" />}
                    <p className={`text-sm truncate ${chat.unread > 0 ? 'text-white font-bold' : 'text-gray-500'}`}>
                      {chat.message}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-between items-end ml-2 flex-shrink-0">
                  <div className="w-10 h-10 rounded overflow-hidden">
                    <img src={chat.image} className="w-full h-full object-cover" />
                  </div>
                  {chat.unread > 0 && (
                    <div className="bg-[#ccff00] text-black text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center mt-1">
                      {chat.unread}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chats;
