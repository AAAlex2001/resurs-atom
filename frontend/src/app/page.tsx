import {
    ActivitiesData,
    ClientsBenefitsData,
    HeaderData,
    HeroData,
    DocumentsData,
    LicenseTermData,
    LicensingData,
    StatsData,
    WhyUsData,
    CasesData,
    PackagesData,
} from "@/app/data";
import { Hero } from "@/widgets/Landing/Hero";
import { Header } from "@/widgets/Header";
import { Stats } from "@/widgets/Landing/Stats";
import { Activities } from "@/widgets/Landing/Activities";
import { ClientsBenefits } from "@/widgets/Landing/ClientsBenefits";
import { Licensing } from "@/widgets/Landing/Licensing";
import { LicenseTerm } from "@/widgets/Landing/LicenseTerm";
import { Documents } from "@/widgets/Landing/Documents";
import { WhyUs } from "@/widgets/Landing/WhyUs";
import { Cases } from "@/widgets/Landing/Cases";
import { Packages } from "@/widgets/Landing/Packages";

export default function Home() {
    return (
        <>
            <Header data={HeaderData} />
            <Hero data={HeroData} />
            <Stats data={StatsData} />
            <Activities data={ActivitiesData} />
            <ClientsBenefits data={ClientsBenefitsData} />
            <Licensing data={LicensingData} />
            <LicenseTerm data={LicenseTermData} />
            <Documents data={DocumentsData} />
            <WhyUs data={WhyUsData} />
            <Cases data={CasesData} />
            <Packages data={PackagesData} />
        </>
    );
}
