"use client";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Verified } from "lucide-react";
import { useState } from "react";
import { updateRating } from "@/app/actions/profile-actions";
import { UploadDropzone } from "@/app/utils/uploadthing";
import { updateGuidePhotos } from "@/app/actions/guide-actions";

export default function GuideProfile({ guide, isGuide }: { guide: Guides; isGuide?: boolean }) {
    const [selectedRating, setSelectedRating] = useState<number>(0)
    const [isUploading, setIsUploading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [hoveredRating, setHoveredRating] = useState<number | null>(null)
    const displayRating = hoveredRating ?? selectedRating ?? 0;

    const handleUploadComplete = async (res: { url: string }[]) => {
        try {
            setIsUploading(true);

            // Extract URLs from upload response
            const newUrls = res.map((file) => file.url);

            // Update the guide's photo_urls in the database
            await updateGuidePhotos(guide.id, newUrls);
        } catch (err) {
            setError(`Error saving photos: ${(err as Error).message}`);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="container mx-auto max-w-6xl py-9 px-4" >
            <Card className="overflow-hidden">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3">
                            <img
                                src={guide?.photo_urls?.[0]}
                                alt="guide profile picture"
                                className="w-full h-auto rounded-lg shadow-lg"
                            />
                            <p className="text-muted-foreground text-sm italic mt-2 ">
                                Guiding since {new Date(guide?.created_at ?? "").toLocaleDateString()}
                            </p>
                        </div>
                        <div className="md:w-2/3">
                            <h1 className="text-3xl font-bold mb-2 flex flex-row">
                                {guide?.full_name}
                                <span className="ml-2 text-sm" title="Verified"><Verified className="h-4 w-4 text-blue-600" /></span>
                            </h1>
                            <p className="text-muted-foreground mb-4">
                                {guide?.age} years old . {guide?.gender}
                            </p>
                            <p className="mb-4">{guide?.bio}</p>
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <h2 className="text-lg font-semibold mb-2">Location</h2>
                                    <p>{guide.primary_locations.join(", ") || "N/A"}</p>
                                    <p>{guide.state}</p>
                                </div>
                                <div >
                                    <h2 className="text-lg font-semibold mb-2">
                                        Languages
                                    </h2>
                                    <p>{guide?.languages?.join(", ") || "N/A"}</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mb-6">
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold">{guide?.tours_delivered ?? 0}</h3>
                                    <p className="text-sm text-muted-foreground">Tours Delivered</p>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold">{guide?.average_rating?.toFixed(1) || 0}</h3>
                                    <div className="flex items-center">
                                        <Progress value={guide?.average_rating || 0 * 20} className="w-24" />
                                        <span className="ml-2 text-sm text-muted-foreground">/ 5.0</span>
                                        <span className="font-semibold text-muted-foreground ml-2">
                                            ({guide?.num_of_ratings || 0} ratings)
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap mt-8">
                        <h2 className="text-2xl font-bold mb-4">Photos</h2>
                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {guide?.photo_urls?.slice(0).map((photourl, index) => (
                                <img
                                    key={index}
                                    src={photourl}
                                    alt="guide photo"
                                    className="w-full h-48 object-cover rounded-lg shadow-lg hover:blur-sm"
                                />
                            ))}
                            {isGuide &&
                                <div
                                    className="w-[120%] h-48 flex flex-col 
                                         items-center justify-center text-muted-foreground hover:text-foreground border-2 border-dashed border-muted-foreground hover:border-foreground rounded-lg transition-colors">
                                    <UploadDropzone
                                        endpoint="imageUploader"
                                        className="text-white font-bold py-2 rounded"
                                        onClientUploadComplete={handleUploadComplete}
                                        onUploadError={(error) => {
                                            alert(`ERROR! ${error.message}`);
                                        }}
                                    />
                                    {isUploading && <p className="text-blue-600">Saving your photos...</p>}
                                    {error && <p className="text-red-600">{error}</p>}
                                </div>}
                            {!isGuide &&
                                // Rating and review section
                                <div className="mt-8">
                                    <p>Provide rating to this guide</p>
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                        <button
                                            key={rating}
                                            type="button"
                                            onClick={() => setSelectedRating(rating)}
                                            onMouseEnter={() => setHoveredRating(rating)}
                                            onMouseLeave={() => setHoveredRating(null)}
                                            className="transition-all duration-200 focus:outline-none"
                                            aria-label={`Rate ${rating} stars`}
                                        >
                                            <Star
                                                className={`h-6 w-6 ${rating <= displayRating ? "fill-yellow-400 text-yellow-400" : "fill-transparent text-muted-foreground"
                                                    } transition-all`}
                                            />
                                        </button>
                                    ))}
                                    <Button onClick={async () => {
                                        await updateRating(selectedRating, guide?.id, guide.num_of_ratings || 0, guide.average_rating || 0);
                                        setSelectedRating(0);
                                    }} className="mt-4">
                                        Submit Rating
                                    </Button>
                                </div>
                            }
                        </div>

                    </div>
                </CardContent>
            </Card>
        </div >
    )
}