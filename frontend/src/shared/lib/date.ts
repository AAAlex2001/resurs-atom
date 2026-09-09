const LONG_DATE = new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
});

export const formatDate = (value: string | null | undefined): string => {
    if (!value) return "";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return value;

    return LONG_DATE.format(date).replace(" г.", "");
};

const twoDigits = (value: number) => String(value).padStart(2, "0");

export const toDateTimeInput = (value: string | null | undefined): string => {
    if (!value) return "";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "";

    const day = `${date.getFullYear()}-${twoDigits(date.getMonth() + 1)}-${twoDigits(date.getDate())}`;
    const time = `${twoDigits(date.getHours())}:${twoDigits(date.getMinutes())}`;

    return `${day}T${time}`;
};

export const isFutureDate = (value: string | null | undefined): boolean => {
    if (!value) return false;

    return new Date(value).getTime() > Date.now();
};

export const pluralize = (count: number, forms: [string, string, string]): string => {
    const lastTwo = count % 100;
    const last = count % 10;

    if (lastTwo >= 11 && lastTwo <= 19) return forms[2];
    if (last === 1) return forms[0];
    if (last >= 2 && last <= 4) return forms[1];

    return forms[2];
};
