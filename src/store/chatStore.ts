import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { ChatBackup, ChatBackupStats, DeviceStats } from '../types/chat';

interface ChatStore {
  chatBackups: ChatBackup[];
  stats: ChatBackupStats | null;
  deviceStats: DeviceStats[];
  loading: boolean;
  error: string | null;
  selectedBackup: ChatBackup | null;
  sortBy: 'backup_timestamp' | 'conversation_count' | 'device_name';
  sortOrder: 'asc' | 'desc';
  
  fetchChatBackups: () => Promise<void>;
  fetchStats: () => Promise<void>;
  fetchDeviceStats: () => Promise<void>;
  selectBackup: (backup: ChatBackup | null) => void;
  searchBackups: (query: string) => Promise<void>;
  filterBackups: (filters: {
    status?: string;
    device_name?: string;
    date_from?: string;
    date_to?: string;
  }) => Promise<void>;
  setSorting: (sortBy: 'backup_timestamp' | 'conversation_count' | 'device_name', sortOrder: 'asc' | 'desc') => void;
  clearError: () => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  chatBackups: [],
  stats: null,
  deviceStats: [],
  loading: false,
  error: null,
  selectedBackup: null,
  sortBy: 'backup_timestamp',
  sortOrder: 'desc',

  fetchChatBackups: async () => {
    set({ loading: true, error: null });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        set({ error: 'User not authenticated', loading: false });
        return;
      }

      const { sortBy, sortOrder } = get();
      const { data, error } = await supabase
        .from('chat_backups')
        .select('*')
        .eq('user_id', user.id)
        .order(sortBy, { ascending: sortOrder === 'asc' });

      if (error) throw error;

      set({ chatBackups: data || [], loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch chat backups',
        loading: false 
      });
    }
  },

  fetchStats: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('chat_backups')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      const backups = data || [];
      const stats: ChatBackupStats = {
        totalBackups: backups.length,
        totalConversations: backups.reduce((sum, backup) => sum + (backup.conversation_count || 0), 0),
        totalSize: backups.reduce((sum, backup) => sum + (backup.backup_size || 0), 0),
        activeBackups: backups.filter(b => b.status === 'active').length,
        archivedBackups: backups.filter(b => b.status === 'archived').length,
        deletedBackups: backups.filter(b => b.status === 'deleted').length,
        deviceCount: new Set(backups.map(b => b.device_name).filter(Boolean)).size,
        averageConversationsPerBackup: backups.length > 0 
          ? backups.reduce((sum, backup) => sum + (backup.conversation_count || 0), 0) / backups.length 
          : 0
      };

      set({ stats });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  },

  fetchDeviceStats: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('chat_backups')
        .select('device_name, conversation_count, backup_size, backup_timestamp')
        .eq('user_id', user.id)
        .not('device_name', 'is', null);

      if (error) throw error;

      const deviceMap = new Map<string, DeviceStats>();
      
      (data || []).forEach(backup => {
        const deviceName = backup.device_name!;
        const existing = deviceMap.get(deviceName);
        
        if (existing) {
          existing.backup_count += 1;
          existing.total_conversations += backup.conversation_count || 0;
          existing.total_size += backup.backup_size || 0;
          if (new Date(backup.backup_timestamp) > new Date(existing.last_backup)) {
            existing.last_backup = backup.backup_timestamp;
          }
        } else {
          deviceMap.set(deviceName, {
            device_name: deviceName,
            backup_count: 1,
            total_conversations: backup.conversation_count || 0,
            total_size: backup.backup_size || 0,
            last_backup: backup.backup_timestamp
          });
        }
      });

      set({ deviceStats: Array.from(deviceMap.values()) });
    } catch (error) {
      console.error('Failed to fetch device stats:', error);
    }
  },

  selectBackup: (backup) => {
    set({ selectedBackup: backup });
  },

  searchBackups: async (query) => {
    set({ loading: true, error: null });
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        set({ error: 'User not authenticated', loading: false });
        return;
      }

      let queryBuilder = supabase
        .from('chat_backups')
        .select('*')
        .eq('user_id', user.id);

      if (query.trim()) {
        queryBuilder = queryBuilder.or(`device_name.ilike.%${query}%,license_key.ilike.%${query}%`);
      }

      const { data, error } = await queryBuilder
        .order('backup_timestamp', { ascending: false });

      if (error) throw error;

      set({ chatBackups: data || [], loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to search chat backups',
        loading: false 
      });
    }
  },

  filterBackups: async (filters) => {
    set({ loading: true, error: null });
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        set({ error: 'User not authenticated', loading: false });
        return;
      }

      let queryBuilder = supabase
        .from('chat_backups')
        .select('*')
        .eq('user_id', user.id);

      if (filters.status) {
        queryBuilder = queryBuilder.eq('status', filters.status);
      }

      if (filters.device_name) {
        queryBuilder = queryBuilder.eq('device_name', filters.device_name);
      }

      if (filters.date_from) {
        queryBuilder = queryBuilder.gte('backup_timestamp', filters.date_from);
      }

      if (filters.date_to) {
        queryBuilder = queryBuilder.lte('backup_timestamp', filters.date_to);
      }

      const { data, error } = await queryBuilder
        .order('backup_timestamp', { ascending: false });

      if (error) throw error;

      set({ chatBackups: data || [], loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to filter chat backups',
        loading: false 
      });
    }
  },

  setSorting: (sortBy, sortOrder) => {
    set({ sortBy, sortOrder });
    // Automatically refetch data with new sorting
    get().fetchChatBackups();
  },

  clearError: () => {
    set({ error: null });
  }
}));