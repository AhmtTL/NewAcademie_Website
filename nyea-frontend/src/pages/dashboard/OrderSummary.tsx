import React from 'react';
import { CreditCard, MapPin, Calendar, Clock } from 'lucide-react';

interface Program {
  id: string | number;
  title: string;
  image: string;
  category: string;
  duration: string;
  price: number;
  features: string[];
  description?: string;
}

interface WorkshopSession {
  id: string;
  location: string;
  date: string;
  time: string;
  availableSpots: number;
  price?: number;
}

interface CartItem {
  program: Program;
  quantity: number;
  selectedSession?: WorkshopSession;
}

interface OrderSummaryProps {
  items: CartItem[];
  getTotalItems: () => number;
  getTotalPrice: () => number;
  children?: React.ReactNode;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items, getTotalItems, getTotalPrice, children }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 h-fit">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <CreditCard className="h-6 w-6 mr-3 text-blue-600" />
        Order Summary
      </h2>
      <div className="space-y-6 mb-8">
        {items.map((item) => (
          <div key={item.program.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
            <img
              src={item.program.image}
              alt={item.program.title}
              className="w-20 h-20 object-cover rounded-lg shadow-md"
              style={{ aspectRatio: '4/3' }}
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 mb-1">{item.program.title}</h3>
              <div className="flex items-center space-x-4 mb-2">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold">
                  {item.program.category}
                </span>
                <span className="text-gray-500 text-sm flex items-center">
                  {item.program.duration}
                </span>
              </div>
              
              {/* Workshop Session Info */}
              {item.selectedSession && (
                <div className="space-y-1 mb-2">
                  <div className="flex items-center text-xs text-gray-600">
                    <MapPin className="h-3 w-3 mr-1" />
                    {item.selectedSession.location}
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(item.selectedSession.date).toLocaleDateString('en-US', { 
                      weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' 
                    })}
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <Clock className="h-3 w-3 mr-1" />
                    {item.selectedSession.time}
                  </div>
                </div>
              )}
              
              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-blue-600">
                ${((item.selectedSession?.price || item.program.price) * item.quantity).toLocaleString()}
              </div>
              {item.quantity > 1 && (
                <div className="text-sm text-gray-500">
                  ${(item.selectedSession?.price || item.program.price).toLocaleString()} each
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-4 border-t border-gray-200 pt-6">
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-600">Items ({getTotalItems()})</span>
          <span className="font-semibold text-gray-900">${getTotalPrice().toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-600">Processing Fee</span>
          <span className="text-green-600 font-semibold">Included</span>
        </div>
        <div className="flex justify-between items-center py-3 border-t border-gray-200">
          <span className="text-xl font-bold text-gray-900">Total</span>
          <span className="text-2xl font-bold text-blue-600">${getTotalPrice().toLocaleString()}</span>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">
            All fees included • Secure payment processing
          </p>
        </div>
      </div>
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
};

export default OrderSummary; 