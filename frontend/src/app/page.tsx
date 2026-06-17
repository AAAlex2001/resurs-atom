import { Hero } from "@/widgets/Landing/Hero";
import { Header } from "@/widgets/Header";
import { Stats } from "@/widgets/Landing/Stats";


const HeroData ={
  titlePrefix: "Получение ",
  hilightText: "атомных лицензий",
  titleSuffix: " Ростехнадзора",
  subtitle:"Проводим аудит готовности, готовим лицензионную документацию, сопровождаем обоснование безопасности и ведём организацию через все стадии процесса лицензирования.",
  buttonFilledText: "Запросить консультацию",
  buttonOutlineText: "Оценить готовность к лицензированию",
  image: "/hero.jpg",
  imageAlt: "Получение атомных лицензий Ростехнадзора",
}

const StatsData = {
  stats: [
    { id: 1, number: "120+", text: "сопровождённых проектов" },
    { id: 2, number: "10", text: "лет в атомном надзоре" },
    { id: 3, number: "94%", text: "доля одобренной документации" },
    { id: 4, number: "10 лет", text: "макс. срок действия лицензии" },
  ],
}

export default function Home() {
  return (
    <>
      <Header />
      <Hero {...HeroData} />
      <Stats {...StatsData} />
    </>
  );
}
