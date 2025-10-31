import React, { useState, useEffect } from 'react';
import { Key, Plus, Trash2, Shield, Crown, CreditCard, Copy, Check, AlertCircle, Lock } from 'lucide-react';
import { useLicenseStore } from '../store/licenseStore';
import PaymentModal from './PaymentModal';
import { LicenseKey, PLAN_LIMITS } from '../types/license';

const LicenseKeyManager: React.FC = () => {
  const {
    licenses,
    userPlan,
    loading,
    error,
    generateLicenseKey,
    revokeLicenseKey,
    upgradeToPremium,
    fetchUserLicenses,
    fetchUserPlan
  } = useLicenseStore();

  const [deviceName, setDeviceName] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    fetchUserPlan();
    fetchUserLicenses();
  }, [fetchUserPlan, fetchUserLicenses]);

  const handleGenerateKey = async () => {
    const success = await generateLicenseKey(deviceName || undefined);
    if (success) {
      setDeviceName('');
    }
  };

  const handleRevokeKey = async (licenseId: string) => {
    if (window.confirm('Are you sure you want to revoke this license key?')) {
      await revokeLicenseKey(licenseId);
    }
  };

  const handleUpgrade = async () => {
    const success = await upgradeToPremium();
    if (success) {
      setShowPaymentModal(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(text);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isExpired = (expiresAt: string) => {
    return new Date(expiresAt) < new Date();
  };

  const activeLicenses = licenses.filter(license => license.is_active);
  const canCreateMore = userPlan ? activeLicenses.length < userPlan.max_licenses : false;

  return (
    <div className="space-y-6">
      {/* Plan Status */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {userPlan?.plan_type === 'premium' ? (
              <Crown className="w-6 h-6 text-yellow-500" />
            ) : (
              <Shield className="w-6 h-6 text-blue-500" />
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                {userPlan?.plan_type || 'Basic'} Plan
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {activeLicenses.length} of {userPlan?.max_licenses || 0} licenses used
              </p>
            </div>
          </div>
          
          {userPlan?.plan_type === 'basic' && (
            <button
              onClick={() => setShowPaymentModal(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-4 py-2 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200"
            >
              <Crown className="w-4 h-4" />
              <span>Upgrade to Premium</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
            <div className="text-gray-600 dark:text-gray-400">Max Licenses</div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {userPlan?.max_licenses || 0}
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
            <div className="text-gray-600 dark:text-gray-400">License Duration</div>
            <div className="font-semibold text-gray-900 dark:text-white">30 days</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
            <div className="text-gray-600 dark:text-gray-400">Plan Price</div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {userPlan?.plan_type === 'premium' ? '$29.99/year' : 'Free'}
            </div>
          </div>
        </div>
      </div>

      {/* Generate New License */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Generate New License Key</span>
        </h3>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Device name (optional)"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
          <button
            onClick={handleGenerateKey}
            disabled={!canCreateMore || loading}
            className="flex items-center space-x-2 bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <Key className="w-4 h-4" />
            <span>{loading ? 'Generating...' : 'Generate Key'}</span>
          </button>
        </div>
        
        {!canCreateMore && userPlan && (
          <p className="mt-2 text-sm text-amber-600 dark:text-amber-400 flex items-center space-x-1">
            <AlertCircle className="w-4 h-4" />
            <span>You've reached the maximum number of licenses for your plan</span>
          </p>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center space-x-2 text-red-800 dark:text-red-400">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* License Keys List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Your License Keys</h3>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {licenses.length === 0 ? (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              No license keys generated yet. Create your first license key above.
            </div>
          ) : (
            licenses.map((license) => (
              <div key={license.id} className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <code className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded text-sm font-mono">
                        {license.key || license.license_key || 'No key available'}
                      </code>
                      <button
                        onClick={() => copyToClipboard(license.key || license.license_key || '')}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        {copiedKey === (license.key || license.license_key) ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        license.plan_type === 'premium'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}>
                        {license.plan_type}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        license.is_active && !isExpired(license.expires_at)
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {license.is_active && !isExpired(license.expires_at) ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div>
                        <span className="font-medium">MAC Address:</span> {license.mac_address || 'Not bound'}
                      </div>
                      <div>
                        <span className="font-medium">Expires:</span> {formatDate(license.expires_at)}
                      </div>
                    </div>
                  </div>
                  
                  {license.is_active && (
                    <button
                      onClick={() => handleRevokeKey(license.id)}
                      className="flex items-center space-x-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Revoke</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Upgrade to Premium
              </h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Crown className="w-6 h-6 text-yellow-600" />
                  <span className="font-semibold text-yellow-800 dark:text-yellow-200">Premium Plan</span>
                </div>
                <ul className="space-y-2 text-sm text-yellow-700 dark:text-yellow-300">
                  <li>• Up to 5 license keys (optimized for quality)</li>
                  <li>• 30-day license duration</li>
                  <li>• Priority support</li>
                  <li>• Advanced features</li>
                </ul>
                <div className="mt-3 text-2xl font-bold text-yellow-800 dark:text-yellow-200">
                  $29.99/year
                </div>
              </div>
              
              {/* Admin Contact Section */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 dark:text-blue-200 mb-2 flex items-center">
                  <Lock className="w-4 h-4 mr-2" />
                  Contact Admin for Subscription
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                  To upgrade to Premium, please contact the administrator for assistance with your subscription.
                </p>
                <div className="bg-white dark:bg-gray-800 rounded p-3 border border-blue-200 dark:border-blue-700">
                  <p className="text-xs font-medium text-gray-900 dark:text-white mb-1">
                    Contact Information:
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    📧 gamkersofficial@gmail.com
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    💬 Contact your system administrator
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Close
                </button>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  <span>Got it</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LicenseKeyManager;