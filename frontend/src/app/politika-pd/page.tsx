import type { Metadata } from "next";
import { PrivacyPolicyData } from "@/app/legal/content";
import { FooterData, HeaderData } from "@/app/data";
import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";
import { LegalDocument } from "@/widgets/Legal/LegalDocument";

export const metadata: Metadata = {
    title: "Политика обработки персональных данных | Атом-Плюс",
    description:
        "Политика в отношении обработки персональных данных ООО «НПИ «Недра» в соответствии с Федеральным законом № 152-ФЗ.",
    alternates: {
        canonical: "/politika-pd",
    },
};

export default function PrivacyPolicyPage() {
    return (
        <>
            <Header data={HeaderData} />
            <LegalDocument data={PrivacyPolicyData} />
            <Footer data={FooterData} />
        </>
    );
}
