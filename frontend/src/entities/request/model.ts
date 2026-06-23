export enum Activity {
    Engineering = "Проектирование и инжиниринг",
    Counstructing = "Строительство и монтаж",
    Operation = "Эксплуатация объектов",
    Handling = "Обращение с РМ и РАО",
    Transportation = "Транспортирование и хранение",
    Ionizing = "Источники ионизирующего излучения",
    Production = "Производство оборудования",
    Testing = "Испытания и пусконаладка",
    Subcontracting = "Подряд в атомной отрасли",
}

export type RequestIn = {
    name: string;
    phone: string;
    email: string;
    activity: Activity;
    company: string;
    inn: string;
    message: string;
    personalDataConsent: boolean;
    privacyPolicyAccepted: boolean;
};