type CheckCircleIconProps = {
    className?: string;
};

export const CheckCircleIcon = ({ className }: CheckCircleIconProps) => (
    <svg
        className={className}
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
    >
        <circle cx="10" cy="10" r="10" fill="#00DE4F" fillOpacity="0.1" />
        <path
            d="M5.8 10.3 L8.7 13.2 L14.2 7.2"
            stroke="#00DE4F"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
