"use client";

import { useState } from 'react'
import { TravelerProfileView } from './traveler-profile-view'
import { TravelerProfileEdit } from './traveler-profile-edit'
import { Button } from "@/components/ui/button"

export default function TravelerProfilePage({ traveler, userId }: { traveler: Traveler; userId: string }) {
    const [isEditing, setIsEditing] = useState(false)

    const handleEditToggle = () => {
        setIsEditing(!isEditing)
    }

    return (
        <div className="container mx-auto py-8">
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
                        <Button onClick={handleEditToggle}>
                            {isEditing ? "Cancel" : "Edit Profile"}
                        </Button>
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
                </div>
            </div>
        </div>
    )
}

