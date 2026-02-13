
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
    return (
        <div className="flex flex-col items-start gap-4 p-8 border border-red-100 rounded-2xl bg-white hover:shadow-lg transition-all hover:border-red-200">
            <div className="p-3 rounded-full bg-red-50 text-(--accent-colour) mb-2">
                <Icon size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
            <p className="text-base text-gray-600 leading-relaxed font-medium">
                {description}
            </p>
        </div>
    );
}
