import React, { useState } from 'react';
import { Search, MoreVertical, CheckCheck, Phone, Video, ArrowLeft, MessageSquare } from 'lucide-react';


const mockChats = [
  { id: 1, name: 'Suresh Transport', message: 'I can come pick up the Bananas at 5 PM tomorrow.', time: '10:30 AM', unread: 2, item: 'Farm-fresh Bananas', type: 'selling', image: './images/banana_fruit.jpg' },
  { id: 2, name: 'Ravi Kumar (Buyer)', message: 'Can you reduce the price to ₹40/kg for bulk?', time: 'Yesterday', unread: 0, item: 'Premium Watermelon', type: 'selling', image: './images/watermelon.jpg' },
  { id: 3, name: 'Agri Inputs Store', message: 'Yes, seeds are in stock.', time: 'Oct 1', unread: 0, item: 'Organic Tomato Seeds', type: 'buying', image: './images/tomato.png' }
];

const Chats: React.FC = () => {
  const [tab, setTab] = useState<'all' | 'buying' | 'selling'>('all');
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  
  
  const filteredChats = tab === 'all' ? mockChats : mockChats.filter(chat => chat.type === tab);
  const activeChat = mockChats.find(c => c.id === selectedChat);

  return (
    <div className="flex bg-[#f4f8f4] h-[calc(100vh-64px)] overflow-hidden font-sans text-gray-900 w-full max-w-7xl mx-auto border-x border-gray-200 shadow-sm">
      
      {/* Sidebar - Chat List */}
      <div className={`w-full md:w-[380px] bg-white border-r border-gray-200 flex flex-col ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
        <div className="bg-[#15803d] p-4 font-bold text-white flex justify-between items-center shadow-sm z-10">
          <h1 className="text-xl tracking-wide">Chats</h1>
          <MoreVertical size={20} className="cursor-pointer" />
        </div>
        
        {/* Search */}
        <div className="p-3 border-b border-gray-100 bg-gray-50">
          <div className="flex bg-white rounded-lg px-3 py-2 border border-gray-200 focus-within:border-green-500 shadow-sm transition-colors">
            <Search size={18} className="text-gray-400 mr-2 mt-0.5" />
            <input type="text" placeholder="Search chats..." className="bg-transparent flex-1 outline-none text-sm font-medium" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-white">
          <button 
            className={`flex-1 py-3 text-sm font-bold border-b-[3px] transition-colors ${tab === 'all' ? 'border-green-600 text-green-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setTab('all')}
          >
            ALL
          </button>
          <button 
            className={`flex-1 py-3 text-sm font-bold border-b-[3px] transition-colors ${tab === 'buying' ? 'border-green-600 text-green-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setTab('buying')}
          >
            BUYING
          </button>
          <button 
            className={`flex-1 py-3 text-sm font-bold border-b-[3px] transition-colors ${tab === 'selling' ? 'border-green-600 text-green-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setTab('selling')}
          >
            SELLING
          </button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {filteredChats.map((chat) => (
            <div 
              key={chat.id} 
              className={`flex p-4 border-b border-gray-100 cursor-pointer hover:bg-green-50 transition-colors ${selectedChat === chat.id ? 'bg-green-50' : ''}`}
              onClick={() => setSelectedChat(chat.id)}
            >
              <div className="relative mr-4">
                <div className="w-14 h-14 bg-gray-200 rounded-full overflow-hidden border border-gray-300">
                  <img src={chat.image} alt={chat.item} className="w-full h-full object-cover" />
                </div>
                {chat.unread > 0 && (
                  <div className="absolute -top-1 -right-1 bg-green-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                    {chat.unread}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-900 text-base truncate">{chat.name}</h3>
                  <span className={`text-xs font-semibold ${chat.unread > 0 ? 'text-green-600' : 'text-gray-400'}`}>{chat.time}</span>
                </div>
                <div className="flex items-center text-sm">
                  {chat.unread === 0 && <CheckCheck size={14} className="text-blue-500 mr-1 flex-shrink-0" />}
                  <p className={`truncate ${chat.unread > 0 ? 'text-gray-800 font-bold' : 'text-gray-500'}`}>{chat.message}</p>
                </div>
                <p className="text-[10px] text-green-700 bg-green-100 border border-green-200 px-2 py-0.5 rounded uppercase font-bold self-start mt-1.5 inline-block">
                  {chat.item}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={`flex-1 bg-[#efeae2] flex-col ${selectedChat ? 'flex' : 'hidden md:flex'}`}>
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="bg-white p-3 border-b border-gray-200 flex justify-between items-center shadow-sm z-10">
              <div className="flex items-center">
                <button onClick={() => setSelectedChat(null)} className="md:hidden mr-3 text-gray-600 hover:text-gray-900">
                  <ArrowLeft size={24} />
                </button>
                <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden mr-3 border border-gray-300">
                  <img src={activeChat.image} alt={activeChat.item} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 text-lg leading-tight">{activeChat.name}</h2>
                  <p className="text-xs text-green-600 font-bold">Online</p>
                </div>
              </div>
              <div className="flex space-x-4 text-gray-600">
                <Video size={22} className="cursor-pointer hover:text-green-600 transition-colors" />
                <Phone size={22} className="cursor-pointer hover:text-green-600 transition-colors" />
                <MoreVertical size={22} className="cursor-pointer hover:text-green-600 transition-colors" />
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ backgroundImage: "url('https://web.whatsapp.com/img/bg-chat-tile-dark_a4be512e7195b6b733d9110b408f075d.png')", backgroundSize: 'contain', opacity: 0.9 }}>
              <div className="flex justify-center">
                <span className="bg-[#e1f0e5] text-gray-600 text-xs font-bold px-3 py-1 rounded-lg border border-green-200 shadow-sm">TODAY</span>
              </div>
              
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 p-3 rounded-lg rounded-tl-none max-w-[75%] shadow-sm border border-gray-200 relative">
                  <p className="text-sm font-medium">Hello, is the {activeChat.item} still available?</p>
                  <span className="text-[10px] text-gray-400 mt-1 block text-right">10:00 AM</span>
                </div>
              </div>
              
              <div className="flex justify-end">
                <div className="bg-[#dcf8c6] text-gray-900 p-3 rounded-lg rounded-tr-none max-w-[75%] shadow-sm border border-green-200 relative">
                  <p className="text-sm font-medium">Yes, it is available! How much quantity do you need?</p>
                  <div className="flex justify-end items-center space-x-1 mt-1">
                    <span className="text-[10px] text-green-700">10:05 AM</span>
                    <CheckCheck size={12} className="text-blue-500" />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 p-3 rounded-lg rounded-tl-none max-w-[75%] shadow-sm border border-gray-200 relative">
                  <p className="text-sm font-medium">{activeChat.message}</p>
                  <span className="text-[10px] text-gray-400 mt-1 block text-right">10:30 AM</span>
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <div className="bg-[#f0f2f5] p-3 flex items-center border-t border-gray-200">
              <button className="text-gray-500 p-2 hover:bg-gray-200 rounded-full transition-colors mr-2">
                <span className="text-xl">😊</span>
              </button>
              <input 
                type="text" 
                placeholder="Type a message" 
                className="flex-1 py-2.5 px-4 rounded-full border border-gray-300 outline-none focus:border-green-500 shadow-sm text-sm"
              />
              <button className="bg-green-600 text-white p-2.5 rounded-full ml-3 hover:bg-green-700 transition-colors shadow-md">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path></svg>
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-[#f8f9fa] border-l border-gray-200">
            <div className="w-48 h-48 bg-green-50 rounded-full flex items-center justify-center mb-6">
              <MessageSquare size={80} className="text-green-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-700">Select a chat to start messaging</h2>
            <p className="text-gray-500 mt-2 font-medium">Communicate securely with verified buyers and sellers.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chats;
