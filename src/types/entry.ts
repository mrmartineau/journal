import type { Database } from './supabase';

export type Entry = Database['public']['Tables']['journal_entries']['Row'];
export type Journal = Database['public']['Tables']['journals']['Row'];

export type EntryWithJournals = Entry & {
  journals: Journal;
};
