"use client";

import { useState } from "react";

interface BookingWidgetProps {
  resortName: string;
  resortPrice: string;
  resortImage: string;
  destinationName: string;
}

export default function BookingWidget({ resortName, resortPrice, resortImage, destinationName }: BookingWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.checkIn && formData.checkOut) {
      setIsConfirmed(true);
    }
  };

  if (!isOpen) {
    return (
      <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center rounded-2xl">
        <button 
          onClick={() => setIsOpen(true)}
          className="px-8 py-4 bg-pink-500 text-white font-black rounded-full shadow-[0_0_20px_rgba(236,72,153,0.8)] hover:scale-110 transition-transform duration-300 cursor-pointer z-20"
        >
          Book This Resort
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-indigo-950/60 backdrop-blur-sm animate-fade-in cursor-default">
      <div className="relative w-full max-w-lg overflow-hidden bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_-10px_rgba(236,72,153,0.3)] border border-white/60 animate-fade-in-up">
        
        {/* Close Button */}
        <button 
          onClick={() => { setIsOpen(false); setIsConfirmed(false); }}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/50 text-indigo-900 hover:bg-pink-100 hover:text-pink-600 transition-colors z-50 cursor-pointer"
        >
          ✕
        </button>

        {!isConfirmed ? (
          // Booking Form
          <div className="p-8">
            <h2 className="text-3xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500">
              Book Your Stay
            </h2>
            <p className="text-indigo-900/70 font-medium mb-6">
              {resortName} • {resortPrice}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-indigo-900 mb-1">Full Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/60 border border-purple-200 focus:outline-none focus:ring-2 focus:ring-pink-400 text-indigo-950"
                  placeholder="John Doe"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-indigo-900 mb-1">Check-in</label>
                  <input 
                    required
                    type="date" 
                    value={formData.checkIn}
                    onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-white/60 border border-purple-200 focus:outline-none focus:ring-2 focus:ring-pink-400 text-indigo-950"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-indigo-900 mb-1">Check-out</label>
                  <input 
                    required
                    type="date" 
                    value={formData.checkOut}
                    onChange={(e) => setFormData({...formData, checkOut: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-white/60 border border-purple-200 focus:outline-none focus:ring-2 focus:ring-pink-400 text-indigo-950"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-indigo-900 mb-1">Guests</label>
                <select 
                  value={formData.guests}
                  onChange={(e) => setFormData({...formData, guests: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/60 border border-purple-200 focus:outline-none focus:ring-2 focus:ring-pink-400 text-indigo-950"
                >
                  <option value="1">1 Adult</option>
                  <option value="2">2 Adults</option>
                  <option value="3">3 Adults</option>
                  <option value="4">4 Adults</option>
                  <option value="family">Family (2A + 2C)</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full mt-6 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black rounded-xl shadow-lg hover:shadow-pink-500/50 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        ) : (
          // VIP Ticket Confirmation
          <div className="relative overflow-hidden">
            {/* Ticket Header Image */}
            <div className="h-48 relative">
              <img src={resortImage} alt={resortName} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/90 to-transparent flex flex-col justify-end p-6">
                <span className="inline-block px-3 py-1 rounded-full bg-pink-500/80 text-white text-xs font-bold w-fit mb-2 border border-pink-400/50">
                  CONFIRMED
                </span>
                <h3 className="text-2xl font-black text-white leading-tight">{resortName}</h3>
                <p className="text-white/80 text-sm flex items-center gap-1">📍 {destinationName}</p>
              </div>
            </div>

            {/* Ticket Body */}
            <div className="p-8 relative bg-white">
              {/* Ticket cutouts */}
              <div className="absolute -left-4 -top-4 w-8 h-8 rounded-full bg-indigo-950/60 shadow-inner"></div>
              <div className="absolute -right-4 -top-4 w-8 h-8 rounded-full bg-indigo-950/60 shadow-inner"></div>
              
              {/* Dotted line */}
              <div className="absolute top-0 left-6 right-6 border-t-2 border-dashed border-gray-300"></div>

              <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8 pt-4">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Guest</p>
                  <p className="text-lg font-black text-indigo-950">{formData.name}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Guests</p>
                  <p className="text-lg font-black text-indigo-950">{formData.guests}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Check In</p>
                  <p className="text-lg font-black text-indigo-950">{formData.checkIn}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Check Out</p>
                  <p className="text-lg font-black text-indigo-950">{formData.checkOut}</p>
                </div>
              </div>

              {/* Fake Barcode */}
              <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex gap-1 h-12 w-full justify-center opacity-60">
                  {[...Array(30)].map((_, i) => (
                    <div key={i} className={`bg-indigo-950 ${Math.random() > 0.5 ? 'w-1' : 'w-2'} ${Math.random() > 0.8 ? 'w-3' : ''}`}></div>
                  ))}
                </div>
                <p className="text-xs font-mono text-gray-400 mt-2 tracking-widest">
                  TKT-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                </p>
              </div>

              <p className="text-center text-sm font-bold text-pink-500 mt-6 animate-pulse">
                Have a great trip! 🌴
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
