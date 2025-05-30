"use client";

import { guideSchema, travelerSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "./ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { TravelerForm } from "./traveler-form";
import { GuideForm } from "./guide-form";
import { z } from 'zod';
import { SubmitButton } from "./ui/submit-button";

type ProfileType = 'traveler' | 'guide';

export default function SetUpProfileComponent({ userId }: { userId: string }) {
    const router = useRouter();

    const [profileType, setProfileType] = useState<ProfileType>('traveler');

    const schema = profileType === 'guide' ? guideSchema : travelerSchema;
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {}
    })

    const supabase = createClientComponentClient<Database>();
    async function onSubmit(data: z.infer<typeof schema>) {
        const { error: RoleError } = await supabase.rpc(
            profileType === 'guide' ? 'set_user_as_guide' : 'set_user_as_traveler',
            { user_id: userId }
        );
        if (RoleError) {
            console.error(RoleError);
            return;
        }
        const table = profileType === 'guide' ? 'guides' : 'travelers';
        const { error: ProfileError } = await supabase.from(table).upsert({
            id: userId,
            ...data
        });
        if (ProfileError) {
            throw ProfileError;
        }
        router.push(`${profileType === 'guide' ? '/guide' : '/traveler'}`);
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Profile Information</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="profile-type" className="text-sm font-medium">
                            Profile Type
                        </label>
                        <Select
                            onValueChange={(value: ProfileType) => setProfileType(value)}
                            defaultValue={profileType}
                        >
                            <SelectTrigger id="profile-type">
                                <SelectValue placeholder="Select profile type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="traveler">Traveler</SelectItem>
                                <SelectItem value="guide">Guide</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {profileType === 'guide' ? (
                        <GuideForm />
                    ) : (
                        <TravelerForm />
                    )}
                    <SubmitButton />
                </form>
            </Form>
        </div>
    );
}