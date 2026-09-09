import { ContactData } from "@/app/data";
import { Contact } from "@/widgets/Landing/Contact";
import style from "./style.module.scss";

export const ContactCard = () => {
    return (
        <div className={style.wrap}>
            <div className={style.inner}>
                <div className={style.card}>
                    <Contact data={ContactData} />
                </div>
            </div>
        </div>
    );
};
