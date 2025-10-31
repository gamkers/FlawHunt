export interface ChatBackup {
  id: string;
  user_id: string;
  license_key: string | null;
  device_name: string | null;
  mac_address: string | null;
  backup_timestamp: string;
  chat_data: any; // JSONB data
  metadata: any | null; // JSONB data
  backup_size: number | null;
  conversation_count: number | null;
  status: 'active' | 'archived' | 'deleted';
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  metadata?: any;
}

export interface ChatConversation {
  id: string;
  title?: string;
  messages: ChatMessage[];
  created_at: string;
  updated_at: string;
}

export interface ChatBackupStats {
  totalBackups: number;
  totalConversations: number;
  totalSize: number;
  activeBackups: number;
  archivedBackups: number;
  deletedBackups: number;
  deviceCount: number;
  averageConversationsPerBackup: number;
}

export interface DeviceStats {
  device_name: string;
  backup_count: number;
  total_conversations: number;
  total_size: number;
  last_backup: string;
}