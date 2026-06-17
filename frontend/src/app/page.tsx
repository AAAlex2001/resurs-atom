import {
    ActivitiesData,
    ClientsBenefitsData,
    HeaderData,
    HeroData,
    LicensingData,
    StatsData,
} from "@/app/data";
import { Hero } from "@/widgets/Landing/Hero";
import { Header } from "@/widgets/Header";
import { Stats } from "@/widgets/Landing/Stats";
import { Activities } from "@/widgets/Landing/Activities";
import { ClientsBenefits } from "@/widgets/Landing/ClientsBenefits";
import { Licensing } from "@/widgets/Landing/Licensing";

export default function Home() {
    return (
        <>
            <Header {...HeaderData} />
            <Hero {...HeroData} />
            <Stats {...StatsData} />
            <Activities {...ActivitiesData} />
            <ClientsBenefits {...ClientsBenefitsData} />
            <Licensing {...LicensingData} />
        </>
    );
}
