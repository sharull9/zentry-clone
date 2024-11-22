import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

export default function CustomButton({
    className,
    leftIcon,
    id,
    rightIcon,
    children,
}: React.PropsWithChildren<{
    className?: string;
    id?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}>) {
    return (
        <Button
            variant="reset"
            id={id}
            className={cn(
                "group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black",
                className,
            )}
        >
            {leftIcon}
            <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
                <div>{children}</div>
            </span>
            {rightIcon}
        </Button>
    );
}
