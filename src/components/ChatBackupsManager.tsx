import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Database, 
  Smartphone, 
  Calendar, 
  Search, 
  Filter, 
  Eye, 
  Download,
  BarChart3,
  PieChart,
  TrendingUp,
  HardDrive,
  Clock,
  Users,
  Activity,
  Archive,
  Trash2,
  X,
  ChevronDown,
  ChevronUp,
  Send,
  Bot,
  User
} from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import { ChatBackup } from '../types/chat';

interface ConversationThread {
  session_id: string;
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
  }>;
  model: string;
  start_time: string;
  preview: string;
}

const ChatBackupsManager: React.FC = () => {
  const { 
    chatBackups, 
    stats, 
    deviceStats, 
    loading, 
    error, 
    selectedBackup,
    sortBy,
    sortOrder,
    fetchChatBackups, 
    fetchStats, 
    fetchDeviceStats, 
    selectBackup, 
    searchBackups, 
    filterBackups,
    setSorting,
    clearError 
  } = useChatStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<ConversationThread | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<string>('');
  const [conversationThreads, setConversationThreads] = useState<ConversationThread[]>([]);

  useEffect(() => {
    fetchChatBackups();
    fetchStats();
    fetchDeviceStats();
  }, []);

  useEffect(() => {
    if (chatBackups.length > 0) {
      processConversationThreads();
    }
  }, [chatBackups, selectedDevice]);

  const processConversationThreads = () => {
    const filteredBackups = selectedDevice 
      ? chatBackups.filter(backup => backup.device_name === selectedDevice)
      : chatBackups;

    const allThreads: ConversationThread[] = [];

    filteredBackups.forEach(backup => {
      if (backup.chat_data?.conversations) {
        const sessionGroups: { [key: string]: any[] } = {};
        
        backup.chat_data.conversations.forEach((conv: any) => {
          const sessionId = conv.session_id || 'default';
          if (!sessionGroups[sessionId]) {
            sessionGroups[sessionId] = [];
          }
          sessionGroups[sessionId].push(conv);
        });

        Object.entries(sessionGroups).forEach(([sessionId, conversations]) => {
          const sortedConversations = conversations.sort((a, b) => 
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          );

          const messages: Array<{
            role: 'user' | 'assistant';
            content: string;
            timestamp: string;
          }> = [];

          sortedConversations.forEach(conv => {
            if (conv.user_input) {
              messages.push({
                role: 'user',
                content: conv.user_input,
                timestamp: conv.timestamp
              });
            }
            if (conv.ai_response) {
              messages.push({
                role: 'assistant',
                content: conv.ai_response,
                timestamp: conv.timestamp
              });
            }
          });

          const firstMessage = messages.find(m => m.role === 'user')?.content || 'No messages';
          const preview = firstMessage.length > 60 ? firstMessage.substring(0, 60) + '...' : firstMessage;

          allThreads.push({
            session_id: sessionId,
            messages,
            model: sortedConversations[0]?.model || 'Unknown',
            start_time: sortedConversations[0]?.timestamp || '',
            preview
          });
        });
      }
    });

    setConversationThreads(allThreads.sort((a, b) => 
      new Date(b.start_time).getTime() - new Date(a.start_time).getTime()
    ));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const filtered = conversationThreads.filter(thread =>
        thread.preview.toLowerCase().includes(query.toLowerCase()) ||
        thread.messages.some(msg => msg.content.toLowerCase().includes(query.toLowerCase()))
      );
      setConversationThreads(filtered);
    } else {
      processConversationThreads();
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const openConversationModal = (thread: ConversationThread) => {
    setSelectedConversation(thread);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedConversation(null);
  };

  const uniqueDevices = [...new Set(chatBackups.map(backup => backup.device_name).filter((name): name is string => name !== null))];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg h-[85vh] flex">
      {/* Left Sidebar - Conversation History */}
      <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Chat History</h2>
          </div>
          
          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Device Filter */}
          <select
             value={selectedDevice || ''}
             onChange={(e) => setSelectedDevice(e.target.value)}
             className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
           >
            <option value="">All Devices</option>
            {uniqueDevices.map((device: string) => (
              <option key={device} value={device}>{device}</option>
            ))}
          </select>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {conversationThreads.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No conversations found</p>
            </div>
          ) : (
            <div className="space-y-1 p-2">
              {conversationThreads.map((thread, index) => (
                <div
                  key={`${thread.session_id}-${index}`}
                  onClick={() => setSelectedConversation(thread)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${
                    selectedConversation?.session_id === thread.session_id 
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500' 
                      : 'border-l-4 border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {thread.preview}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(thread.start_time)}
                        </span>
                        <span className="text-xs text-gray-400 dark:text-gray-500">•</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {thread.messages.length} messages
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 truncate">
                        {thread.model}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Side - Chat Preview */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Conversation Preview
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(selectedConversation.start_time)} • {selectedConversation.messages.length} messages
                  </p>
                </div>
                <button
                  onClick={() => openConversationModal(selectedConversation)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Eye className="h-4 w-4" />
                  View Full Chat
                </button>
              </div>
            </div>

            {/* Chat Messages Preview */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedConversation.messages.slice(0, 6).map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                  )}
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.role === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                  {message.role === 'user' && (
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </div>
                  )}
                </div>
              ))}
              {selectedConversation.messages.length > 6 && (
                <div className="text-center">
                  <button
                    onClick={() => openConversationModal(selectedConversation)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View {selectedConversation.messages.length - 6} more messages...
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-center">
            <div>
              <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Select a conversation
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Choose a conversation from the sidebar to view its messages
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Full Conversation Modal */}
      {isModalOpen && selectedConversation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 shadow-xl w-full h-screen flex flex-col">
            {/* Modal Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Full Conversation
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(selectedConversation.start_time)} • {selectedConversation.model}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedConversation.messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                  )}
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.role === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                  {message.role === 'user' && (
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBackupsManager;