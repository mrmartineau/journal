export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      checklist_entries: {
        Row: {
          checklist_id: number;
          count: number | null;
          id: number;
          journal_entry_id: number;
          note: string | null;
          owner: string | null;
          status: Database['public']['Enums']['status'];
        };
        Insert: {
          checklist_id: number;
          count?: number | null;
          id?: number;
          journal_entry_id: number;
          note?: string | null;
          owner?: string | null;
          status?: Database['public']['Enums']['status'];
        };
        Update: {
          checklist_id?: number;
          count?: number | null;
          id?: number;
          journal_entry_id?: number;
          note?: string | null;
          owner?: string | null;
          status?: Database['public']['Enums']['status'];
        };
      };
      checklists: {
        Row: {
          id: number;
          name: string;
          owner: string | null;
          status: Database['public']['Enums']['status'];
        };
        Insert: {
          id?: number;
          name: string;
          owner?: string | null;
          status?: Database['public']['Enums']['status'];
        };
        Update: {
          id?: number;
          name?: string;
          owner?: string | null;
          status?: Database['public']['Enums']['status'];
        };
      };
      journal_entries: {
        Row: {
          created_at: string | null;
          date: string | null;
          end_date: string | null;
          entry: string | null;
          id: number;
          journal: number | null;
          owner: string | null;
          status: Database['public']['Enums']['status'];
          time: string | null;
        };
        Insert: {
          created_at?: string | null;
          date?: string | null;
          end_date?: string | null;
          entry?: string | null;
          id?: number;
          journal?: number | null;
          owner?: string | null;
          status?: Database['public']['Enums']['status'];
          time?: string | null;
        };
        Update: {
          created_at?: string | null;
          date?: string | null;
          end_date?: string | null;
          entry?: string | null;
          id?: number;
          journal?: number | null;
          owner?: string | null;
          status?: Database['public']['Enums']['status'];
          time?: string | null;
        };
      };
      journals: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: number;
          name: string;
          owner: string | null;
          status: Database['public']['Enums']['status'];
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: number;
          name: string;
          owner?: string | null;
          status?: Database['public']['Enums']['status'];
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: number;
          name?: string;
          owner?: string | null;
          status?: Database['public']['Enums']['status'];
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      status: 'active' | 'inactive' | 'deleted' | 'archived' | 'draft';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
