import { Card, CardContent } from "@/components/ui/card"

export function TravelerProfileView({ travelerData }: Traveler) {
    return (
        <Card>
            <CardContent className="grid gap-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ProfileField label="Full Name" value={travelerData.full_name} />
                    <ProfileField label="Phone Number" value={travelerData.phone_number} />
                    <ProfileField label="Occupation" value={travelerData.occupation} />
                    <ProfileField label="Age" value={travelerData.age.toString()} />
                    <ProfileField label="Gender" value={travelerData.gender} />
                    <ProfileField label="City" value={travelerData.city} />
                    <ProfileField label="State" value={travelerData.state} />
                    <ProfileField label="Zipcode" value={travelerData.zipcode} />
                    <ProfileField label="Country" value={travelerData.country} />
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Bio</h3>
                    <p className="text-sm text-gray-600">{travelerData.bio}</p>
                </div>
            </CardContent>
        </Card>
    )
}

function ProfileField({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <h3 className="font-semibold">{label}</h3>
            <p className="text-sm text-gray-600">{value}</p>
        </div>
    )
}

