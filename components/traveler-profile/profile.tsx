"use client";

import { useState } from 'react'
import { TravelerProfileView } from './traveler-profile-view'
import { TravelerProfileEdit } from './traveler-profile-edit'
import { Button } from "@/components/ui/button"
import PlacesCard from '@/components/traveler-profile/places-card';
import { Separator } from '@/components/ui/separator';

export default function TravelerProfilePage({ traveler, userId, tripInfo, showEdit }:
    {
        traveler: Traveler;
        userId: string;
        tripInfo: { destination: string }[];
        showEdit: boolean
    }) {
    const [isEditing, setIsEditing] = useState(false)

    const handleEditToggle = () => {
        setIsEditing(!isEditing)
    }

    return (
        <div className="container mx-auto py-8 overflow-clip">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/3">
                    <img
                        src={traveler.photo_url}
                        alt={traveler.full_name}
                        className="w-full h-auto rounded-lg shadow-lg"
                    />
                </div>
                <div className="w-full md:w-2/3">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold">Traveler Profile</h1>
                        {showEdit && <Button onClick={handleEditToggle}>
                            {isEditing ? "Cancel" : "Edit Profile"}
                        </Button>}
                    </div>
                    {isEditing ? (
                        <TravelerProfileEdit
                            travelerData={traveler}
                            userId={userId}
                            setIsEditing={setIsEditing}
                        />
                    ) : (
                        <TravelerProfileView travelerData={traveler} />
                    )}
                    {showEdit && <div className="flex mt-2 items-center border rounded">
                        <div className="flex-1 p-4">
                            <h2 className="text-xl font-bold">Past Trips Completed</h2>
                            <ul className="list-disc ml-8">
                                {tripInfo.map((trip, index) => (
                                    <li key={index}>{trip.destination}</li>
                                ))}
                            </ul>
                        </div>
                    </div>}
                </div>
            </div>
            <div className="block mt-4 p-2">
                <h2 className="flex items-center text-xl font-bold">Places Awaiting For You ❤️</h2>
                <Separator />
                <PlacesCard />
            </div>
        </div>
    )
}

