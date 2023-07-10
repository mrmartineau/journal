export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
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
        Relationships: [
          {
            foreignKeyName: 'checklist_entries_checklist_id_fkey';
            columns: ['checklist_id'];
            referencedRelation: 'checklists';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'checklist_entries_journal_entry_id_fkey';
            columns: ['journal_entry_id'];
            referencedRelation: 'journal_entries';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'checklist_entries_journal_entry_id_fkey';
            columns: ['journal_entry_id'];
            referencedRelation: 'grouped_journal_entries';
            referencedColumns: ['id'];
          }
        ];
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
        Relationships: [];
      };
      journal_entries: {
        Row: {
          created_at: string | null;
          date: string | null;
          end_date: string | null;
          entry: string | null;
          id: number;
          journal: number | null;
          media: string[] | null;
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
          media?: string[] | null;
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
          media?: string[] | null;
          owner?: string | null;
          status?: Database['public']['Enums']['status'];
          time?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'journal_entries_journal_fkey';
            columns: ['journal'];
            referencedRelation: 'journals';
            referencedColumns: ['id'];
          }
        ];
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
        Relationships: [];
      };
    };
    Views: {
      grouped_journal_entries: {
        Row: {
          created_at: string | null;
          date: string | null;
          end_date: string | null;
          entries: number[] | null;
          entry: string | null;
          id: number | null;
          journal: number | null;
          media: string[] | null;
          owner: string | null;
          status: Database['public']['Enums']['status'] | null;
          time: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'journal_entries_journal_fkey';
            columns: ['journal'];
            referencedRelation: 'journals';
            referencedColumns: ['id'];
          }
        ];
      };
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
