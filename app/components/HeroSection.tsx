'use client'
import Link from "next/link";
import Button from "./Button";

interface HeroProps {
    title: string;
    subtitle: string;
    image: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText: string;
    secondaryButtonLink: string;
}

export default function HeroSection({
    title,
    subtitle,
    image,
    primaryButtonText,
    primaryButtonLink,
    secondaryButtonText,
    secondaryButtonLink
}: HeroProps) {
    return (
        <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${image})` }}
            >
                <div className="absolute inset-0 bg-black/50" /> {/* Dark overlay for readability */}
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center gap-6 max-w-4xl">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-md">
                    {title}
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-200 font-medium max-w-2xl drop-shadow">
                    {subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
                    <Button content={primaryButtonText} link={primaryButtonLink} primary={true} />
                    <Button content={secondaryButtonText} link={secondaryButtonLink} primary={false} />
                </div>
            </div>
        </section>
    );
}