import { Hero } from "@/widgets/Hero";


const HeroData ={
  title: "Получение атомных лицензий",
  subtilte:"Проводим аудит готовности, готовим лицензионную документацию, сопровождаем обоснование безопасности и ведём организацию через все стадии процесса лицензирования.",
  buttonFilledText: "Запросить консультацию",
  buttonOutlineText: "Оценить готовность к лицензированию",
}


export default function Home() {
  return (
    <>
      <Hero {...HeroData} />
    </>
  );
}
