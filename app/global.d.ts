import { Database as DB } from "@/lib/database.types";

type Profile = DB["public"]["Tables"]["profiles"]["Row"];

declare global {
  type Database = DB;
  type Traveler = DB["public][Tables"]["travelers"]["Row"];
  type Guides = DB["public"]["Tables"]["guides"]["Row"];
  type Trip = DB["public"]["Tables"]["trips"]["Row"];
  type TripWithProfile = Trip & Bids & {
    profiles: {
      travelers: {
        "full_name": string;
        "photo_url": string | null;
      }
    };
  };
  type Bid = DB["public"]["Tables"]["bids"]["Row"];
  type BidWithProfile = Bid & {
    guide: {
      "full_name": string;
      "photo_urls": string[];
    }
  };
  type Message = DB["public"]["Tables"]["messages"]["Row"];
  type MessageWithProfile = Message & {
    user: Profiles;
  };
}
