"use client";

import type { RequestIn } from "@/entities/request";
import { useSendRequest } from "@/features/send-request";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Select } from "@/shared/ui/Select";
import { CheckCircleIcon } from "@/shared/ui/icons/CheckCircleIcon";
import { PhoneIcon } from "@/shared/ui/icons/PhoneIcon";
import { MailIcon } from "@/shared/ui/icons/MailIcon";
import { formatRussianPhone } from "@/shared/lib/phone";
import style from "./style.module.scss";

type Field = {
    id: number;
    type: string;
    fieldKey: string;
    label: string;
    placeholder: string;
    maxLength?: number;
    options?: string[];
};

type ContactData = {
    kicker: string;
    title: string;
    highlight: string;
    description: string;
    benefits: string[];
    phone: {
        label: string;
        value: string;
    };
    email: {
        label: string;
        value: string;
    };
    form: {
        title: string;
        subtitle: string;
        fields: Field[];
        submitText: string;
        consent: string;
    };
};

type ContactProps = {
    data: ContactData;
};

export const Contact = ({ data }: ContactProps) => {
    const { state, handleChange, handleSubmit, reset } = useSendRequest();

    return (
        <section id="contact" className={style.contact}>
            <div className={style.inner}>
                <div className={style.intro}>
                    <div className={style.head}>
                        <div className={style.kicker}>{data.kicker}</div>
                        <h2 className={style.title}>
                            {data.title}{" "}
                            <span className={style.titleHighlight}>{data.highlight}</span>
                        </h2>
                        <p className={style.description}>{data.description}</p>
                    </div>
                    <ul className={style.benefits}>
                        {data.benefits.map((benefit) => (
                            <li className={style.benefit} key={benefit}>
                                <CheckCircleIcon className={style.benefitIcon} />
                                <span className={style.benefitText}>{benefit}</span>
                            </li>
                        ))}
                    </ul>
                    <div className={style.contacts}>
                        <div className={style.contactRow}>
                            <span className={style.contactIcon}>
                                <PhoneIcon />
                            </span>
                            <div className={style.contactTexts}>
                                <span className={style.contactLabel}>{data.phone.label}</span>
                                <a
                                    className={style.contactValue}
                                    href={`tel:${data.phone.value.replace(/[^\d+]/g, "")}`}
                                >
                                    {data.phone.value}
                                </a>
                            </div>
                        </div>
                        <div className={style.contactRow}>
                            <span className={style.contactIcon}>
                                <MailIcon />
                            </span>
                            <div className={style.contactTexts}>
                                <span className={style.contactLabel}>{data.email.label}</span>
                                <a className={style.contactValue} href={`mailto:${data.email.value}`}>
                                    {data.email.value}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {state.isSuccess ? (
                    <div className={style.form}>
                        <div className={style.formHead}>
                            <span className={style.formTitle}>Заявка отправлена!</span>
                            <span className={style.formSubtitle}>
                                Наши специалисты свяжутся с вами в течение одного рабочего дня.
                            </span>
                        </div>
                        <div className={style.formBody}>
                            <Button
                                text="Отправить ещё одну"
                                variant="outline-dark"
                                onClick={reset}
                            />
                        </div>
                    </div>
                ) : (
                    <form
                        className={style.form}
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                    >
                        <div className={style.formHead}>
                            <span className={style.formTitle}>{data.form.title}</span>
                            <span className={style.formSubtitle}>{data.form.subtitle}</span>
                        </div>
                        <div className={style.formBody}>
                            <div className={style.fields}>
                                {data.form.fields.map((field) => (
                                    <div className={style.field} key={field.id}>
                                        <span className={style.fieldLabel}>{field.label}</span>
                                        {field.type === "textarea" ? (
                                            <textarea
                                                className={style.textarea}
                                                placeholder={field.placeholder}
                                                rows={3}
                                                onChange={(e) => handleChange(field.fieldKey as keyof RequestIn, e.target.value)}
                                            />
                                        ) : field.type === "select" ? (
                                            <Select
                                                options={field.options ?? []}
                                                placeholder={field.placeholder}
                                                onChange={(v) => handleChange(field.fieldKey as keyof RequestIn, v)}
                                            />
                                        ) : field.type === "phone" ? (
                                            <Input
                                                type="tel"
                                                inputMode="tel"
                                                maxLength={field.maxLength}
                                                placeholder={field.placeholder}
                                                format={formatRussianPhone}
                                                onValueChange={(v) => handleChange(field.fieldKey as keyof RequestIn, v)}
                                            />
                                        ) : (
                                            <Input
                                                type="text"
                                                placeholder={field.placeholder}
                                                maxLength={field.maxLength}
                                                onChange={(e) => handleChange(field.fieldKey as keyof RequestIn, e.target.value)}
                                            />
                                        )}
                                        {state.errors[field.fieldKey as keyof RequestIn] && (
                                            <span className={style.fieldError}>
                                                {state.errors[field.fieldKey as keyof RequestIn]}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className={style.formFooter}>
                                <Button
                                    text={state.isLoading ? "Отправка..." : data.form.submitText}
                                    variant="filled-dark"
                                    className={style.submit}
                                    type="submit"
                                />
                                <span className={style.consent}>{data.form.consent}</span>
                            </div>
                            {state.isError && state.errorMessage && (
                                <span className={style.fieldError}>{state.errorMessage}</span>
                            )}
                        </div>
                    </form>
                )}
            </div>
        </section>
    );
};
