import * as z from "zod";

export const travelerSchema = z.object({
    full_name: z.string().min(2, "Name must be at least 2 characters"),
    phone_number: z.string().min(10, "Invalid phone number"),
    occupation: z.string().min(2, "Occupation is required"),
    state: z.string().min(2, "State is required"),
    city: z.string().min(2, "City is required"),
    zipcode: z.string().min(5, "Invalid zipcode"),
    country: z.string().min(2, "Country is required"),
    age: z.number().min(18, "Must be at least 18 years old"),
    gender: z.enum(["male", "female", "other", "prefer_not_to_say"]),
    bio: z.string().min(10, "Bio must be at least 10 characters"),
    photo_url: z.string()
});

export const guideSchema = z.object({
    full_name: z.string().min(2, "Name must be at least 2 characters"),
    phone_number: z.string().min(10, "Invalid phone number"),
    primary_locations: z.array(z.string()).min(1, "At least one location required"),
    state: z.string().min(2, "State is required"),
    age: z.number().min(18, "Must be at least 18 years old"),
    gender: z.enum(["male", "female", "other", "prefer_not_to_say"]),
    bio: z.string().min(10, "Bio must be at least 10 characters"),
    languages: z.array(z.string()).min(1, "At least one language required"),
    photo_urls: z.array(z.string().url()).optional()
})

export const tripSchema = z.object({
    destination: z.string(),
    start_date: z.date({
        required_error: "A start date is required",
    }),
    end_date: z.date({
        required_error: "A end date is required.",
    }),
    num_travelers: z.string().transform((val) => Number(val) || 0),
}).refine((data) => data.end_date > data.start_date, {
    message: "End date must be after start date",
    path: ["end_date"],
});

export const bidSchema = z.object({
    amount: z.string().transform((v) => Number(v) || 0),
    itinerary: z.string().min(10, "Itinerary must be at least 10 characters"),
    trip_id: z.string(),
    guide_id: z.string(),
});

