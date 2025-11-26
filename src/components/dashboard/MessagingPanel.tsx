import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, AlertTriangle, Check, CheckCheck } from 'lucide-react';
import { Message } from '../../types/ems';

interface MessagingPanelProps {
  messages: Message[];
  compact?: boolean;
}

function formatTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
  return date.toLocaleDateString();
}

export default function MessagingPanel({ messages, compact = false }: MessagingPanelProps) {
  const [newMessage, setNewMessage] = useState('');
  const unreadCount = messages.filter((m) => !m.read).length;

  const handleSend = () => {
    if (!newMessage.trim()) return;
    console.log('Sending:', newMessage);
    setNewMessage('');
  };

  if (compact) {
    return (
      <div className="space-y-2">
        {messages.slice(0, 3).map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`p-3 rounded-xl border transition-colors ${
              !message.read
                ? 'bg-primary/5 border-primary/20'
                : 'bg-card border-border'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-foreground">{message.from}</span>
              <span className="text-[10px] text-muted-foreground">{formatTime(message.timestamp)}</span>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">{message.content}</p>
          </motion.div>
        ))}
        {messages.length > 3 && (
          <button className="w-full text-center text-xs text-primary hover:text-primary/80 py-2 font-medium">
            View all {messages.length} messages
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Messages</h3>
        {unreadCount > 0 && (
          <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium">
            {unreadCount} new
          </span>
        )}
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto py-4 space-y-3 min-h-0">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: index * 0.03 }}
              className={`p-4 rounded-xl border transition-all ${
                message.priority === 'urgent'
                  ? 'bg-destructive/5 border-destructive/20'
                  : !message.read
                  ? 'bg-primary/5 border-primary/20'
                  : 'bg-card border-border hover:border-primary/20'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {message.priority === 'urgent' && (
                    <AlertTriangle size={14} className="text-destructive" />
                  )}
                  <span className="font-medium text-foreground">{message.from}</span>
                  <span className="text-xs text-muted-foreground px-1.5 py-0.5 bg-muted rounded">
                    {message.fromUnit}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
                  {message.read ? (
                    <CheckCheck size={14} className="text-primary" />
                  ) : (
                    <Check size={14} className="text-muted-foreground" />
                  )}
                </div>
              </div>

              {/* Content */}
              <p className="text-sm text-foreground/70 leading-relaxed">{message.content}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Compose */}
      <div className="pt-4 border-t border-border">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
          />
          <button
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className="px-4 py-3 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground text-primary-foreground rounded-xl transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
