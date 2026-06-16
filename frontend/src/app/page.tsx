import { Hero } from "@/widgets/Hero";


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


export default function Home() {
  return (
    <>
      <Hero {...HeroData} />
    </>
  );
}
