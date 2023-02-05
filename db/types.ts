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
      profiles: {
        Row: {
          user_id: string;
          username: string;
        };
        Insert: {
          user_id?: string;
          username?: string;
        };
        Update: {
          user_id?: string;
          username?: string;
        };
      };
      bookmarks: {
        Row: {
          bookmark_id: string;
          user_id: string;
          repo_owner: string;
          repo_name: string;
          repo_url: string;
          repo_image_url: string;
        };
        Insert: {
          bookmark_id?: number;
          user_id?: string;
          repo_owner?: string;
          repo_name?: string;
          repo_url?: string;
          repo_image_url?: string;
        };
        Update: {
          bookmark_id?: number;
          user_id?: string;
          repo_owner?: string;
          repo_name?: string;
          repo_url?: string;
          repo_image_url?: string;
        };
        Delete: {
          bookmark_id?: number;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}
