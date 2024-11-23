import { circular_web, general, robert, zentry } from "@/lib/font";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/global/footer";
import NavBar from "@/components/global/navbar";

export const metadata: Metadata = {
    title: "Zentry Clone",
    description: "Zentry Clone",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={cn(
                    zentry.variable,
                    robert.variable,
                    general.variable,
                    circular_web.variable,
                    "relative w-dvw overflow-x-hidden bg-[#dfdff0] font-general antialiased",
                )}
            >
                <NavBar />
                {children}
                <Footer />
            </body>
        </html>
    );
}
