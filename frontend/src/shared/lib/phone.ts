export const formatRussianPhone = (raw: string): string => {
    const digits = raw.replace(/\D/g, "");

    if (digits.length === 0) {
        return "";
    }

    let local = digits;
    if (local.startsWith("7") || local.startsWith("8")) {
        local = local.slice(1);
    }
    local = local.slice(0, 10);

    let result = "+7";

    if (local.length > 0) {
        result += ` (${local.slice(0, 3)}`;
    }
    if (local.length >= 3) {
        result += ")";
    }
    if (local.length > 3) {
        result += ` ${local.slice(3, 6)}`;
    }
    if (local.length > 6) {
        result += `-${local.slice(6, 8)}`;
    }
    if (local.length > 8) {
        result += `-${local.slice(8, 10)}`;
    }

    return result;
};

export const toTelHref = (phone: string): string => `tel:${phone.replace(/[^\d+]/g, "")}`;
