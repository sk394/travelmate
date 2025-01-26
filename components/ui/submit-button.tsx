"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./button";

export const SubmitButton = ({ ...props }) => {
    const { pending } = useFormStatus();
    return (
        <Button
            type="submit"
            className="bg-blue-500 text-white rounded-md px-4 py-2"
            {...props}
        >
            {pending ? "Submitting..." : "Submit"}
        </Button>
    );
};