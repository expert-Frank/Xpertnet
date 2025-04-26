import { useState } from "react";
import type { FormEvent } from "react";

import { IconCheck, IconTruckDelivery } from "@tabler/icons-react";

import useTranslation from "@/hooks/useTranslation";

export interface Contact {
  name: string;
  message: string;
  phone: string;
  email: string;
}

interface Error {
  name: string;
  email: string;
  phone: string;
  message: string;
  human: string;
  robot: string;
}

export default function ContactData({
  show,
  order,
}: {
  show: boolean;
  order: (c: Contact) => void;
}) {
  const [sent, setSent] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [human, setHuman] = useState<boolean>(false);
  const [robot, setRobot] = useState<boolean>(false);

  const initialError = {
    name: "",
    email: "",
    phone: "",
    message: "",
    human: "",
    robot: "",
  };

  const [errors, setErrors] = useState<Error>(initialError);

  const t = useTranslation();

  if (!show) return <></>;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    let err = initialError;

    if (!name) err["name"] = t("stepper.errName");
    if (!email || !/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/.test(email))
      err["email"] = t("stepper.errEmail");
    if (
      !phone ||
      !/(\b(0041|0)|\B\+41)(\s?\(0\))?(\s)?[1-9]{2}(\s)?[0-9]{3}(\s)?[0-9]{2}(\s)?[0-9]{2}\b/.test(
        phone,
      )
    )
      err["phone"] = t("stepper.errPhone");
    if (!human) err["human"] = t("stepper.errHuman");
    if (robot) err["robot"] = t("stepper.errRobot");

    if (
      Object.keys(err)
        .map((k) => err[k])
        .join("") !== ""
    ) {
      setErrors(err);
      return;
    }

    await order({
      name,
      email,
      phone,
      message,
    });
  };

  const errorMessage = (val, err) => {
    const msg = err[val];
    if (!msg) return <></>;

    return (
      <span class="text-red-500 dark:text-red-400 error text-sm block">
        {msg}
      </span>
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full text-black dark:text-white grid grid-cols-1 lg:grid-cols-3 gap-4 mx-auto mt-8"
    >
      <label className="block w-full">
        <span>{t("contact.name")}</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded-md bg-neutral-100 dark:bg-neutral-700 outline-none focus:ring-2 focus:ring-emerald-600 dark:focus:ring-lime-400 w-full"
          placeholder={t("contact.name_placeholder")}
        />
        {errorMessage("name", errors)}
      </label>
      <label className="block w-full">
        <span>{t("contact.email")}</span>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded-md bg-neutral-100 dark:bg-neutral-700 outline-none focus:ring-2 focus:ring-emerald-600 dark:focus:ring-lime-400 w-full"
          placeholder={t("contact.email_placeholder")}
        />
        {errorMessage("email", errors)}
      </label>
      <label className="block w-full">
        <span>{t("contact.phone")}</span>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="p-2 rounded-md bg-neutral-100 dark:bg-neutral-700 outline-none focus:ring-2 focus:ring-emerald-600 dark:focus:ring-lime-400 w-full"
          placeholder={t("contact.phone_placeholder")}
        />
        {errorMessage("phone", errors)}
      </label>
      <label className="w-full block col-span-1 lg:col-span-3">
        <span>{t("contact.message")}</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="block w-full p-2 rounded-md bg-neutral-100 dark:bg-neutral-700 outline-none focus:ring-2 focus:ring-emerald-600 dark:focus:ring-lime-400"
          placeholder={t("contact.message_placeholder")}
          rows="5"
        ></textarea>
        {errorMessage("message", errors)}
      </label>
      <div className="w-full block col-span-1 lg:col-span-3">
        <div className="flex gap-4 items-center my-1">
          <label
            value={human}
            onChange={(e) => setHuman(e.target.checked)}
            className="flex items-center cursor-pointer relative"
          >
            <input
              type="checkbox"
              className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-emerald-600 checked:border-emerald-600 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600 dark:focus:ring-lime-400"
              id="human"
            />
            <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <IconCheck />
            </span>
          </label>
          <label for="human">{t("contact.human")}</label>
          {errorMessage("human", errors)}
        </div>
        <div className="flex gap-4 items-center my-1">
          <label className="flex items-center cursor-pointer relative">
            <input
              value={robot}
              onChange={(e) => setRobot(e.target.checked)}
              type="checkbox"
              className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-emerald-600 checked:border-emerald-600 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600 dark:focus:ring-lime-400"
              id="robot"
            />
            <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <IconCheck />
            </span>
          </label>
          <label for="robot">{t("contact.robot")}</label>
          {errorMessage("robot", errors)}
        </div>
      </div>
      <button
        className="px-6 py-3 rounded-md bg-linear-to-tr from-emerald-600 to-lime-600 hover:from-emerald-400 hover:to-lime-400 text-2xl text-white font-semibold shadow-md hover:shadow-lime-400 mt-4 flex gap-4 hover:bg-emerald-500 outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 dark:focus:ring-lime-400 w-fit cursor-pointer col-span-1 lg:col-span-2 items-center"
        type="submit"
      >
        {t("stepper.order")}
        <IconTruckDelivery size={32} />
      </button>
    </form>
  );
}
