import React, { useState } from 'react';
import { X, CreditCard, Lock, Check } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    email: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData(prev => ({
      ...prev,
      cardNumber: formatted
    }));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setFormData(prev => ({
      ...prev,
      expiryDate: formatted
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock successful payment
    setIsProcessing(false);
    onSuccess();
    onClose();
    
    // Reset form
    setFormData({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: '',
      email: '',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Upgrade to Premium
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Demo Payment Portal
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Plan Details */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Premium Plan
              </h3>
              <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                $29.99
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                Create up to 5 license keys
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                Advanced security features
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                Priority support
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                Extended license validity
              </div>
            </div>
          </div>
        </div>

        {/* Admin Contact Information */}
        <div className="p-6">
          <div className="text-center space-y-6">
            {/* Contact Admin Message */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6">
              <div className="flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Contact Admin for Premium Subscription
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                To upgrade to our Premium plan, please contact the administrator for assistance with your subscription.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Contact Information:
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  📧 Email: admin@flawhunt.com
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  💬 Support: Contact your system administrator
                </p>
              </div>
            </div>

            {/* Premium Features Reminder */}
            <div className="text-left">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                Premium Plan Benefits:
              </h4>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Create up to 5 license keys
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Advanced security features
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Priority support
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Extended license validity
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;