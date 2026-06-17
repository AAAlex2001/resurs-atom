export type NavLink = {
    id: number;
    label: string;
    href: string;
};

export type NumberedCard = {
    id: number;
    number: string;
    title: string;
    description: string;
};

export type Stat = {
    id: number;
    number: string;
    text: string;
};

export type OrbitHint = {
    title: string;
    description: string;
};

export type LicensingStep = {
    id: number;
    number: string;
    title: string;
};

export type LicensingCardDetail = {
    id: number;
    title: string;
    description: string;
};

export type LicensingCardData = {
    id: number;
    stage: string;
    title: string;
    subtitle: string;
    details: LicensingCardDetail[];
};
