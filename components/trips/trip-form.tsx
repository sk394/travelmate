"use client";

import { tripSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { CalendarIcon, Search } from "lucide-react";
import { Separator } from "../ui/separator";
import { format } from 'date-fns';
import { SubmitButton } from "../ui/submit-button";
import React from "react";
import { createTrip } from "@/app/actions/trip-action";

type TripFormData = z.infer<typeof tripSchema>;

export default function TripForm() {
    const form = useForm<TripFormData>({
        resolver: zodResolver(tripSchema),
        defaultValues: {
            destination: '',
            start_date: undefined,
            end_date: undefined,
        },
        mode: "onBlur",
    });

    const onSubmit = async (data: TripFormData) => {
        try {
            await createTrip(data);
            form.reset();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex items-center gap-4 bg-white rounded-full p-2 shadow-lg max-w-6xl w-full">
                    <div className="flex-1 flex items-center justify-between gap-4 text-black">
                        <FormField
                            control={form.control}
                            name="destination"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                placeholder="Destination"
                                                className="rounded-full text-black border-none bg-transparent h-12 pl-6"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Separator orientation="vertical" className="h-8" />

                        <FormField
                            control={form.control}
                            name="start_date"
                            render={({ field }: { field: any }) => (
                                <FormItem className="flex-1">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="ghost"
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal h-12 rounded-full flex-1 text-black",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Start Date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value ? new Date(field.value) : undefined}
                                                onSelect={field.onChange}
                                                disabled={(date: Date) =>
                                                    date < new Date()
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Separator orientation="vertical" className="h-8" />

                        <FormField
                            control={form.control}
                            name="end_date"
                            render={({ field }: { field: any }) => (
                                <FormItem className="flex-1">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="ghost"
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal h-12 rounded-full flex-1 text-black",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>End Date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value ? new Date(field.value) : undefined}
                                                onSelect={field.onChange}
                                                disabled={(date: Date) =>
                                                    date < new Date()
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Separator orientation="vertical" className="h-8" />

                        <FormField
                            control={form.control}
                            name="num_travelers"
                            render={({ field }: { field: any }) => (
                                <FormItem className="flex-1">
                                    <FormControl>
                                        <div>
                                            <Input
                                                type="number"
                                                min={1}
                                                placeholder="Add guests"
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                                className="rounded-full border-none bg-transparent h-12 text-black"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" size="icon" className="h-12 w-12 rounded-full bg-rose-500 hover:bg-rose-600">
                        <Search className="h-5 w-5" />
                        <span className="sr-only">Search</span>
                    </Button>
                </div>
            </form>
        </Form>
    )

}

