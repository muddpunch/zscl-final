'use client'
import Button from "./Button";


interface ContentProps {
    title: string;
    content: string;
    ctaButton: string;
    ctaButtonLink: string;
}

export default function ContentWithCTA({ title, content, ctaButton, ctaButtonLink }: ContentProps) {
    return (
        <>
            <section className="w-4/5 mx-auto flex flex-col p-4 mt-4 text-left">
                <div>
                    <h2 className="text-6xl font-bold text-second-text">{title}</h2>
                </div>
                <div className="flex flex-row gap-4 justify-between items-center">
                    <p className="text-xl font-medium text-gray-600 w-3/4">{content}</p>
                    <Button content={ctaButton} link={ctaButtonLink} primary={true} />
                </div>
            </section>
        </>
    );
}