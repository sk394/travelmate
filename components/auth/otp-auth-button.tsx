"use client";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import {  useState } from "react";

export default function OtpAuthButton() {
    const supabase = createClientComponentClient<Database>();
    const { toast } = useToast();
    const router = useRouter();
    const [open, setOpen] = useState<boolean | undefined>(false);
    const FormSchema = z.object({
        email: z.string().email("This is not a valid email")
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "abc@gmail.com"
        }
    });
   
    const handleSignIn = async (data: { email: string }) => {
        const { error } = await supabase.auth.signInWithOtp({ email: data.email,  options: {
            emailRedirectTo: 'http://localhost:3000/auth/callback',
          } });
        if (error) {
            toast({ description: error.message, variant: "destructive" });
        } else {
            toast({ description: "Check your email for the magic link", variant: "default" });
            router.refresh();
            setOpen(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild >
                <Button className="w-full text-zinc-950 py-6 dark:text-white" variant="outline" type="button">Sign in With Magic Link</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md" >
                <DialogHeader>
                    <DialogTitle>Sign in With Magic Link</DialogTitle>
                    <DialogDescription>
                        Enter your email address to send a magic link to sign into the app.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSignIn)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Send Magic Link</Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
