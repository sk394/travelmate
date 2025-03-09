"use client";

import { cancelTrip, completeTrip } from "@/app/actions/trip-action";
import { Button } from "@/components/ui/button";

export default function FinalizeTrip({ tripId }: { tripId: string }) {
    return (
        <div className="space-x-4">
            <Button variant="destructive" onClick={
                async () => {
                    return await cancelTrip(tripId ?? "")
                }
            }>Cancel Trip</Button>
            <Button variant="secondary" className="bg-green-700 font-extrabold " onClick={
                async () => {
                    return await completeTrip(tripId ?? "")
                }
            }>Finalize Trip</Button>
        </div>
    );
}