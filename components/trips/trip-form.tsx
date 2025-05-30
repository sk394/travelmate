"use client";

import { tripSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { CalendarIcon, Search } from "lucide-react";
import { Separator } from "../ui/separator";
import { format } from 'date-fns';
import React, { useState } from "react";
import { createTrip } from "@/app/actions/trip-action";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

type TripFormData = z.infer<typeof tripSchema>;

interface DateFieldProps {
    value: Date | undefined;
    onChange: (date: Date | undefined) => void;
}

interface NumberFieldProps {
    value: number | undefined;
    onChange: (value: number) => void;
}

export default function TripForm() {
    const [pending, setPending] = useState(false);
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
            setPending(true);
            await createTrip(data);
            form.reset();
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setPending(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex items-center gap-4 bg-white rounded-full border-2 p-2 shadow-lg max-w-6xl w-full">
                    <div className="flex-1 flex items-center justify-between gap-4 text-black ">
                        <FormField
                            control={form.control}
                            name="destination"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormControl>
                                        <div className="relative">
                                            <GooglePlacesAutocomplete
                                                {...field}
                                                selectProps={{
                                                    styles: {
                                                        control: (provided) => ({
                                                            ...provided,
                                                            color: 'blue',
                                                            border: 'none',
                                                            width: '110%',
                                                            boxShadow: 'none',  // Remove default focus shadow
                                                            '&:hover': {
                                                                border: 'none'  // Keep consistent on hover
                                                            }
                                                        }),
                                                        input: (provided) => ({
                                                            ...provided,
                                                            ":focus-visible": { outline: 'none' },
                                                        }),
                                                    },
                                                    placeholder: "Destination",
                                                    value: field.value ? { label: field.value, value: field.value } : null,
                                                    onChange: (option) => {
                                                        field.onChange(option?.label);
                                                    },
                                                }}
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
                            render={({ field }: { field: DateFieldProps }) => (
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
                            render={({ field }: { field: DateFieldProps }) => (
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
                            render={({ field }: { field: NumberFieldProps }) => (
                                <FormItem className="flex-1">
                                    <FormControl>
                                        <div>
                                            <Input
                                                type="number"
                                                min={1}
                                                placeholder="Add guests"
                                                className="rounded-full border-none bg-transparent h-12 text-black"
                                                {...field}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" size="icon" className="h-12 w-12 rounded-full bg-rose-500 hover:bg-rose-600">
                        <Search className={cn("h-5 w-5 ", pending && "animate-ping")} />
                        <span className="sr-only">Search</span>
                    </Button>
                </div>
            </form>
        </Form>
    )

}

