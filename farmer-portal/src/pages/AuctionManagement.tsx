import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Trophy } from 'lucide-react';
import api from '../services/api';
import socket from '../services/socket';

const AuctionManagement: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [listing, setListing] = useState<any>(null);
  const [bids, setBids] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuctionData = async () => {
      try {
        const [listingRes, bidsRes] = await Promise.all([
          api.get(`/listings/${id}`),
          api.get(`/auctions/${id}/bids`)
        ]);
        setListing(listingRes.data);
        setBids(bidsRes.data);
      } catch (err) {
        console.error('Failed to fetch auction data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctionData();

    socket.connect();
    socket.emit('join-auction', id);

    socket.on('bid-updated', (data: any) => {
      if (data.listingId === id) {
        setListing((prev: any) => ({ ...prev, highestBid: data.amount }));
        setBids((prev) => [{
          id: data.bidId || Date.now().toString(),
          bidder: { name: 'Bidder' },
          amount: data.amount,
          createdAt: new Date().toISOString()
        }, ...prev]);
      }
    });

    socket.on('auction-closed', (data: any) => {
      if (data.listingId === id) {
        setListing((prev: any) => ({ ...prev, status: 'CLOSED' }));
      }
    });

    return () => {
      socket.off('bid-updated');
      socket.off('auction-closed');
      socket.disconnect();
    };
  }, [id]);

  const endAuction = async () => {
    if (window.confirm('Are you sure you want to end this auction now?')) {
      try {
        await api.post(`/auctions/${id}/close`);
        setListing((prev: any) => ({ ...prev, status: 'CLOSED' }));
        alert('Auction ended successfully.');
      } catch (err: any) {
        alert(err.response?.data?.message || 'Failed to end auction');
      }
    }
  };

  if (loading) return <div className="p-4 text-center">Loading auction...</div>;
  if (!listing) return <div className="p-4 text-center">Auction not found</div>;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-gray-900">
        <ArrowLeft size={20} className="mr-1" /> Back
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-orange-500 text-white p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">{listing.crop} Auction</h2>
            <span className="bg-orange-600 px-2 py-1 rounded text-xs font-bold uppercase">
              {listing.status === 'ACTIVE' ? 'Live Now' : 'Closed'}
            </span>
          </div>
          <p className="opacity-90 text-sm mt-1">{listing.quantity} Quintals</p>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between py-4 border-b border-gray-100">
            <div className="flex items-center text-gray-600">
              <Trophy size={20} className="mr-2 text-yellow-500" />
              <span>Current Highest Bid</span>
            </div>
            <span className="text-2xl font-bold text-green-600">₹{listing.highestBid || listing.basePrice}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 py-4 border-b border-gray-100 text-sm">
            <div>
              <p className="text-gray-500">Base Price</p>
              <p className="font-medium text-gray-900">₹{listing.basePrice}</p>
            </div>
            <div>
              <p className="text-gray-500">Min Increment</p>
              <p className="font-medium text-gray-900">₹{listing.minBidIncrement}</p>
            </div>
            <div className="col-span-2 flex items-center text-gray-600">
              <Clock size={16} className="mr-1" />
              <span>Closes: {new Date(listing.closingTime).toLocaleString()}</span>
            </div>
          </div>

          {listing.status === 'ACTIVE' && (
            <button 
              onClick={endAuction}
              className="w-full mt-4 bg-red-600 text-white py-2 rounded font-medium hover:bg-red-700 transition"
            >
              End Auction Now
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <Users size={18} className="mr-2 text-blue-500" /> Recent Bids
        </h3>
        
        {bids.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4">No bids yet.</p>
        ) : (
          <div className="space-y-3">
            {bids.map((bid, index) => (
              <div key={bid.id || index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium text-gray-900">{bid.bidder?.name || 'Anonymous'}</p>
                  <p className="text-xs text-gray-500">{new Date(bid.createdAt).toLocaleTimeString()}</p>
                </div>
                <span className="font-bold text-green-600">₹{bid.amount}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuctionManagement;
