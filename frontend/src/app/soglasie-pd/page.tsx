import type { Metadata } from "next";
import { PersonalDataConsentData } from "@/app/legal/content";
import { FooterData, HeaderData } from "@/app/data";
import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";
import { LegalDocument } from "@/widgets/Legal/LegalDocument";

export const metadata: Metadata = {
    title: "Согласие на обработку персональных данных | Атом-Плюс",
    description:
        "Согласие пользователя сайта на обработку персональных данных ООО «НПИ «Недра» в соответствии с Федеральным законом № 152-ФЗ.",
    alternates: {
        canonical: "/soglasie-pd",
    },
};

export default function PersonalDataConsentPage() {
    return (
        <>
            <Header data={HeaderData} />
            <LegalDocument data={PersonalDataConsentData} />
            <Footer data={FooterData} />
        </>
    );
}
