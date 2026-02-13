'use client'
import Link from "next/link"

interface ButtonProps {
    content: string;
    link: string;
    primary: boolean;
}


export default function Button({ content, link, primary }: ButtonProps) {
    return (
        <>
            <Link className={`box ${primary ? 'buttonPrimary' : 'buttonSecondary'}`} href={link}>{content}</Link>
        </>
    );
}