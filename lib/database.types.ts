export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bids: {
        Row: {
          amount: number
          created_at: string | null
          guide_id: string | null
          id: string
          itinerary: string
          status: Database["public"]["Enums"]["bid_status"] | null
          trip_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          guide_id?: string | null
          id?: string
          itinerary?: string
          status?: Database["public"]["Enums"]["bid_status"] | null
          trip_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          guide_id?: string | null
          id?: string
          itinerary?: string
          status?: Database["public"]["Enums"]["bid_status"] | null
          trip_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bids_guide_id_fkey"
            columns: ["guide_id"]
            isOneToOne: false
            referencedRelation: "guides"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bids_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
      guides: {
        Row: {
          age: number | null
          average_rating: number | null
          bio: string | null
          created_at: string | null
          full_name: string
          gender: Database["public"]["Enums"]["gender_type"] | null
          id: string
          languages: string[] | null
          num_of_ratings: number | null
          phone_number: string | null
          photo_urls: string[] | null
          primary_locations: string[]
          state: string
          tours_delivered: number | null
          updated_at: string | null
        }
        Insert: {
          age?: number | null
          average_rating?: number | null
          bio?: string | null
          created_at?: string | null
          full_name: string
          gender?: Database["public"]["Enums"]["gender_type"] | null
          id: string
          languages?: string[] | null
          num_of_ratings?: number | null
          phone_number?: string | null
          photo_urls?: string[] | null
          primary_locations: string[]
          state: string
          tours_delivered?: number | null
          updated_at?: string | null
        }
        Update: {
          age?: number | null
          average_rating?: number | null
          bio?: string | null
          created_at?: string | null
          full_name?: string
          gender?: Database["public"]["Enums"]["gender_type"] | null
          id?: string
          languages?: string[] | null
          num_of_ratings?: number | null
          phone_number?: string | null
          photo_urls?: string[] | null
          primary_locations?: string[]
          state?: string
          tours_delivered?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "guides_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          bid_id: string | null
          content: string
          created_at: string | null
          id: string
          sender_id: string | null
        }
        Insert: {
          bid_id?: string | null
          content: string
          created_at?: string | null
          id?: string
          sender_id?: string | null
        }
        Update: {
          bid_id?: string | null
          content?: string
          created_at?: string | null
          id?: string
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_bid_id_fkey"
            columns: ["bid_id"]
            isOneToOne: false
            referencedRelation: "bids"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      travelers: {
        Row: {
          age: number | null
          bio: string | null
          city: string | null
          country: string
          created_at: string | null
          full_name: string
          gender: Database["public"]["Enums"]["gender_type"] | null
          id: string
          occupation: string | null
          phone_number: string | null
          photo_url: string | null
          state: string | null
          updated_at: string | null
          zipcode: string | null
        }
        Insert: {
          age?: number | null
          bio?: string | null
          city?: string | null
          country: string
          created_at?: string | null
          full_name: string
          gender?: Database["public"]["Enums"]["gender_type"] | null
          id: string
          occupation?: string | null
          phone_number?: string | null
          photo_url?: string | null
          state?: string | null
          updated_at?: string | null
          zipcode?: string | null
        }
        Update: {
          age?: number | null
          bio?: string | null
          city?: string | null
          country?: string
          created_at?: string | null
          full_name?: string
          gender?: Database["public"]["Enums"]["gender_type"] | null
          id?: string
          occupation?: string | null
          phone_number?: string | null
          photo_url?: string | null
          state?: string | null
          updated_at?: string | null
          zipcode?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "travelers_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      trips: {
        Row: {
          created_at: string | null
          description: string | null
          destination: string
          end_date: string
          id: string
          num_travelers: number
          start_date: string
          status: Database["public"]["Enums"]["trip_status"] | null
          traveler_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          destination: string
          end_date: string
          id?: string
          num_travelers: number
          start_date: string
          status?: Database["public"]["Enums"]["trip_status"] | null
          traveler_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          destination?: string
          end_date?: string
          id?: string
          num_travelers?: number
          start_date?: string
          status?: Database["public"]["Enums"]["trip_status"] | null
          traveler_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trips_traveler_id_fkey"
            columns: ["traveler_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      accept_bid: {
        Args: {
          bid_id: string
        }
        Returns: undefined
      }
      can_cancel_trip: {
        Args: {
          trip_id_param: string
        }
        Returns: boolean
      }
      can_complete_trip: {
        Args: {
          trip_id_param: string
        }
        Returns: boolean
      }
      get_highest_bid: {
        Args: {
          trip_id_param: string
        }
        Returns: number
      }
      set_user_as_guide: {
        Args: {
          user_id: string
        }
        Returns: undefined
      }
      set_user_as_traveler: {
        Args: {
          user_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      bid_status: "pending" | "accepted" | "rejected"
      gender_type: "male" | "female" | "other" | "prefer_not_to_say"
      trip_status: "posted" | "accepted" | "completed" | "canceled" | "pending"
      user_role: "traveler" | "guide" | "unassigned"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
