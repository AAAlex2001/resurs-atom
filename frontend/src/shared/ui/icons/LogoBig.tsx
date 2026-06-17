"use client";

import { useId } from "react";

export const LogoBig = () => {
    const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
    const navy = `navy-${uid}`;
    const green = `green-${uid}`;

    return (
        <svg width="210" height="40" viewBox="0 0 210 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <g transform="translate(20 20)">
                <ellipse rx="16.5" ry="6" transform="rotate(40)" fill="none" stroke={`url(#${navy})`} strokeWidth="2" />
                <ellipse rx="16.5" ry="6" transform="rotate(-40)" fill="none" stroke={`url(#${navy})`} strokeWidth="2" />
                <circle cx="12.64" cy="-10.61" r="2.6" fill={`url(#${green})`} />
                <circle r="7" fill={`url(#${green})`} />
                <rect x="-3.3" y="-1" width="6.6" height="2" rx="1" fill="#FFFFFF" />
                <rect x="-1" y="-3.3" width="2" height="6.6" rx="1" fill="#FFFFFF" />
            </g>
            <text
                x="50"
                y="20"
                dominantBaseline="central"
                fontFamily="'TT Firs Neue', 'Segoe UI', Arial, sans-serif"
                fontSize="26"
                fontWeight="500"
                letterSpacing="0.2"
            >
                <tspan fill={`url(#${navy})`}>Атом-</tspan>
                <tspan fill={`url(#${green})`}>Плюс</tspan>
            </text>
            <defs>
                <linearGradient id={navy} x1="0" y1="0" x2="1" y2="1">
                    <stop stopColor="#000A1F" />
                    <stop offset="1" stopColor="#012E59" />
                </linearGradient>
                <linearGradient id={green} x1="0" y1="0" x2="1" y2="1">
                    <stop stopColor="#00DC55" />
                    <stop offset="1" stopColor="#00C77A" />
                </linearGradient>
            </defs>
        </svg>
    );
};
