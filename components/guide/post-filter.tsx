"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CalendarIcon } from 'lucide-react'
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function PostsFilter() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [location, setLocation] = useState("")
    const [startDate, setStartDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>()

    // Check if filters are currently active
    const areFiltersActive = !!searchParams.get("location") || !!searchParams.get("startDate") || !!searchParams.get("endDate");

    const handleApplyFilters = () => {
        const params = new URLSearchParams(searchParams);

        if (areFiltersActive) {
            params.delete("location");
            params.delete("startDate");
            params.delete("endDate");
        } else {
            // Update location filter
            if (location) {
                params.set("location", location);
            } else {
                params.delete("location");
            }

            // Update start date filter
            if (startDate) {
                params.set("startDate", startDate.toISOString().split('T')[0]);
            } else {
                params.delete("startDate");
            }

            // Update end date filter
            if (endDate) {
                params.set("endDate", endDate.toISOString().split('T')[0]);
            } else {
                params.delete("endDate");
            }
        }
        replace(`${pathname}?${params.toString()}`);

    };

    return (
        <div className="container mx-auto p-4">
            <div className=" shadow-md rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                            id="location"
                            placeholder="Search for location"
                            onChange={(e) => setLocation(e.target.value)}
                            value={location}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !startDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {startDate ? format(startDate, "yyyy-MM-dd") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={startDate}
                                    onSelect={setStartDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="space-y-2">
                        <Label>End Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !endDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {endDate ? format(endDate, "yyyy-MM-dd") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={endDate}
                                    onSelect={setEndDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    {areFiltersActive ? <Button className="w-full" onClick={(_e) => {
                        setLocation("");
                        setStartDate(undefined);
                        setEndDate(undefined);
                        handleApplyFilters();
                    }} variant="destructive">
                        Remove Filter
                    </Button>
                        :
                        <Button className="w-full" onClick={handleApplyFilters} variant="default">
                            Apply Filter
                        </Button>}
                </div>
            </div>
        </div>
    )
}

