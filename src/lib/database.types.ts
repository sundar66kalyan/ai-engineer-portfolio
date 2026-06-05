export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          email: string;
          bio: string;
          avatar_url: string;
          resume_url: string;
          github_username: string;
          linkedin_url: string;
          twitter_url: string;
          location: string;
          years_experience: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      skills: {
        Row: {
          id: string;
          name: string;
          category: string;
          proficiency: number;
          icon_url: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['skills']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['skills']['Insert']>;
      };
      projects: {
        Row: {
          id: string;
          title: string;
          description: string;
          image_url: string;
          github_url: string;
          live_url: string;
          featured: boolean;
          tags: string[];
          metrics: Record<string, number | string>;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['projects']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['projects']['Insert']>;
      };
      experience: {
        Row: {
          id: string;
          company: string;
          position: string;
          description: string;
          start_date: string;
          end_date: string | null;
          current: boolean;
          icon_url: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['experience']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['experience']['Insert']>;
      };
      certifications: {
        Row: {
          id: string;
          title: string;
          issuer: string;
          issued_date: string;
          credential_url: string;
          icon_url: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['certifications']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['certifications']['Insert']>;
      };
      analytics: {
        Row: {
          id: string;
          event_name: string;
          event_data: Record<string, any>;
          page_url: string;
          user_id: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['analytics']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['analytics']['Insert']>;
      };
    };
  };
};
