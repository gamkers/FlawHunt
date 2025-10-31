import React, { useState, useEffect, useMemo } from 'react';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  MessageSquare, 
  Bot, 
  Calendar,
  Clock,
  Activity,
  Users,
  Smartphone
} from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import { ChatBackup } from '../types/chat';

interface ChatAnalytics {
  totalChats: number;
  totalMessages: number;
  modelUsage: Record<string, number>;
  deviceUsage: Record<string, number>;
  dailyActivity: Record<string, number>;
  averageMessagesPerChat: number;
  mostActiveDay: string;
  mostUsedModel: string;
  mostUsedDevice: string;
}

const AnalyticsPage: React.FC = () => {
  const { chatBackups, loading, fetchChatBackups } = useChatStore();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');

  useEffect(() => {
    fetchChatBackups();
  }, [fetchChatBackups]);

  const analytics = useMemo((): ChatAnalytics => {
    if (!chatBackups.length) {
      return {
        totalChats: 0,
        totalMessages: 0,
        modelUsage: {},
        deviceUsage: {},
        dailyActivity: {},
        averageMessagesPerChat: 0,
        mostActiveDay: '',
        mostUsedModel: '',
        mostUsedDevice: ''
      };
    }

    // Filter by time range
    const now = new Date();
    const cutoffDate = new Date();
    
    switch (timeRange) {
      case '7d':
        cutoffDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        cutoffDate.setDate(now.getDate() - 30);
        break;
      case '90d':
        cutoffDate.setDate(now.getDate() - 90);
        break;
      case 'all':
      default:
        cutoffDate.setFullYear(2000); // Far in the past
        break;
    }

    const filteredBackups = chatBackups.filter(backup => 
      new Date(backup.created_at) >= cutoffDate
    );

    // Group conversations by session_id from chat_data
    const conversationThreads = new Map<string, ChatBackup[]>();
    filteredBackups.forEach(backup => {
      // Extract session_id from chat_data or use backup id as fallback
      const sessionId = backup.chat_data?.session_id || backup.id;
      if (!conversationThreads.has(sessionId)) {
        conversationThreads.set(sessionId, []);
      }
      conversationThreads.get(sessionId)!.push(backup);
    });

    const modelUsage: Record<string, number> = {};
    const deviceUsage: Record<string, number> = {};
    const dailyActivity: Record<string, number> = {};
    let totalMessages = 0;

    conversationThreads.forEach((thread) => {
      // Sort by timestamp
      thread.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
      
      // Count messages in this thread - check if chat_data has conversations array
      let threadMessages = 0;
      if (thread[0]?.chat_data?.conversations) {
        threadMessages = thread[0].chat_data.conversations.length * 2; // user_input + ai_response
      } else {
        threadMessages = thread.length * 2; // fallback
      }
      totalMessages += threadMessages;

      // Model usage - extract from conversations metadata first, then fallback to chat_data or metadata
      let model = 'Unknown';
      
      // Try to get model from conversations array first
      if (thread[0]?.chat_data?.conversations && Array.isArray(thread[0].chat_data.conversations)) {
        const firstConversation = thread[0].chat_data.conversations[0];
        if (firstConversation?.metadata?.model) {
          model = firstConversation.metadata.model;
        }
      }
      
      // Fallback to chat_data or metadata
      if (model === 'Unknown') {
        model = thread[0]?.chat_data?.model || thread[0]?.metadata?.model || 'Unknown';
      }
      
      modelUsage[model] = (modelUsage[model] || 0) + threadMessages;

      // Device usage
      const device = thread[0]?.device_name || 'Unknown';
      deviceUsage[device] = (deviceUsage[device] || 0) + threadMessages;

      // Daily activity
      thread.forEach(backup => {
        const date = new Date(backup.created_at).toISOString().split('T')[0];
        dailyActivity[date] = (dailyActivity[date] || 0) + 2; // user + ai message
      });
    });

    const totalChats = conversationThreads.size;
    const averageMessagesPerChat = totalChats > 0 ? Math.round(totalMessages / totalChats) : 0;

    // Find most active day
    const mostActiveDay = Object.entries(dailyActivity).reduce((a, b) => 
      dailyActivity[a[0]] > dailyActivity[b[0]] ? a : b, ['', 0]
    )[0];

    // Find most used model and device
    const mostUsedModel = Object.entries(modelUsage).reduce((a, b) => 
      modelUsage[a[0]] > modelUsage[b[0]] ? a : b, ['', 0]
    )[0];

    const mostUsedDevice = Object.entries(deviceUsage).reduce((a, b) => 
      deviceUsage[a[0]] > deviceUsage[b[0]] ? a : b, ['', 0]
    )[0];

    return {
      totalChats,
      totalMessages,
      modelUsage,
      deviceUsage,
      dailyActivity,
      averageMessagesPerChat,
      mostActiveDay,
      mostUsedModel,
      mostUsedDevice
    };
  }, [chatBackups, timeRange]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
          <p className="text-gray-400 mt-1">Insights into your chat usage and patterns</p>
        </div>
        
        {/* Time Range Selector */}
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value as any)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="all">All time</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <MessageSquare className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{analytics.totalChats}</p>
              <p className="text-sm text-gray-400">Total Conversations</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Activity className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{analytics.totalMessages}</p>
              <p className="text-sm text-gray-400">Total Messages</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{analytics.averageMessagesPerChat}</p>
              <p className="text-sm text-gray-400">Avg Messages/Chat</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <Bot className="h-6 w-6 text-orange-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-white truncate">{analytics.mostUsedModel || 'N/A'}</p>
              <p className="text-sm text-gray-400">Most Used Model</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Model Usage Chart */}
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Bot className="h-5 w-5 text-emerald-400" />
            <h3 className="text-lg font-semibold text-white">Model Usage</h3>
          </div>
          
          <div className="space-y-4">
            {Object.entries(analytics.modelUsage).map(([model, count]) => {
              const percentage = analytics.totalMessages > 0 ? (count / analytics.totalMessages) * 100 : 0;
              return (
                <div key={model} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300 truncate">{model}</span>
                    <span className="text-gray-400">{count} messages ({percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
            {Object.keys(analytics.modelUsage).length === 0 && (
              <p className="text-gray-400 text-center py-8">No data available</p>
            )}
          </div>
        </div>

        {/* Device Usage Chart */}
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Smartphone className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Device Usage</h3>
          </div>
          
          <div className="space-y-4">
            {Object.entries(analytics.deviceUsage).map(([device, count]) => {
              const percentage = analytics.totalMessages > 0 ? (count / analytics.totalMessages) * 100 : 0;
              return (
                <div key={device} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300 truncate">{device}</span>
                    <span className="text-gray-400">{count} messages ({percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
            {Object.keys(analytics.deviceUsage).length === 0 && (
              <p className="text-gray-400 text-center py-8">No data available</p>
            )}
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="h-5 w-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">Daily Activity</h3>
        </div>
        
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {Object.entries(analytics.dailyActivity)
            .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
            .slice(0, 10)
            .map(([date, count]) => (
              <div key={date} className="flex items-center justify-between py-2 px-3 bg-gray-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-300">{new Date(date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">{count} messages</span>
                  <div className="w-16 bg-gray-700 rounded-full h-1">
                    <div 
                      className="bg-purple-500 h-1 rounded-full"
                      style={{ 
                        width: `${Math.max(10, (count / Math.max(...Object.values(analytics.dailyActivity))) * 100)}%` 
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          {Object.keys(analytics.dailyActivity).length === 0 && (
            <p className="text-gray-400 text-center py-8">No activity data available</p>
          )}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800 p-6">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="h-5 w-5 text-orange-400" />
          <h3 className="text-lg font-semibold text-white">Summary</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-400">{analytics.mostActiveDay ? new Date(analytics.mostActiveDay).toLocaleDateString() : 'N/A'}</p>
            <p className="text-sm text-gray-400">Most Active Day</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400 truncate">{analytics.mostUsedDevice || 'N/A'}</p>
            <p className="text-sm text-gray-400">Primary Device</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-400">{Object.keys(analytics.modelUsage).length}</p>
            <p className="text-sm text-gray-400">Models Used</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;