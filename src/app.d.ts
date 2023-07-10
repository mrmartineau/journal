// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
/// <reference types="@sveltejs/kit" />s

import { SupabaseClient, Session } from '@supabase/supabase-js';
import { Database } from './types/supabase';

declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient<Database>;
      getSession(): Promise<Session | null>;
    }
    interface PageData {
      session: Session | null;
    }
  }
}

export {};
