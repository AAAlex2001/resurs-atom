type HoverPointerIconProps = {
    className?: string;
    gradientId: string;
};

export const HoverPointerIcon = ({ className, gradientId }: HoverPointerIconProps) => (
    <svg
        className={className}
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
    >
        <path
            d="M10.6133 12.7136C10.1088 11.4191 11.3856 10.0942 12.7305 10.6199L28.4678 16.7761C29.8439 17.3153 29.8439 19.2506 28.4678 19.7898L22.4434 22.1492L22.2393 22.2283L22.1602 22.4324L19.8008 28.4656C19.2625 29.8441 17.3014 29.8439 16.7627 28.4656L10.6133 12.7136Z"
            fill={`url(#${gradientId})`}
            stroke="#F7FFF3"
        />
        <defs>
            <linearGradient
                id={gradientId}
                x1="10"
                y1="19.9998"
                x2="30"
                y2="19.9998"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#000A1F" />
                <stop offset="1" stopColor="#012E59" />
            </linearGradient>
        </defs>
    </svg>
);
