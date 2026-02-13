import { EventCategory, CATEGORY_COLORS } from '@/lib/events';

interface EventCategoryBadgeProps {
    category: EventCategory;
    className?: string;
}

export default function EventCategoryBadge({ category, className = '' }: EventCategoryBadgeProps) {
    const colors = CATEGORY_COLORS[category];

    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide border ${colors.bg} ${colors.text} ${colors.border} ${className}`}>
            {category}
        </span>
    );
}
