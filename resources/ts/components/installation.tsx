import React, { useState, useEffect } from "react";
import type { ReactNode } from "react";

import axios from "axios";

import useTranslation, { useLocale } from "@/hooks/useTranslation";

import Divider from "@/components/divider";

export interface Installation {
  nameDE: string;
  nameEN: string;
  descriptionDE: string;
  descriptionEN: string;
  price?: number;
  priceDE?: string;
  priceEN?: string;
}

export default function Installation({
  show,
  setSelection,
  desc,
}: {
  show: boolean;
  setSelection: (selection: Installation) => void;
  desc: ReactNode;
}) {
  const [plans, setPlans] = useState<Installation[]>([]);
  const [selectionId, setSelectionId] = useState<number>(0);

  const t = useTranslation();
  const locale = useLocale();

  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/config", {
        params: {
          field: "installation",
        },
      });

      setPlans(res.data);
    })();
  }, []);

  useEffect(() => {
    if (plans.length === 0) return;
    setSelection(plans[selectionId]);
  }, [selectionId, setSelection, plans]);

  if (plans.length === 0 || !show) return <></>;

  return (
    <>
      {desc}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 rounded-md gap-4 mt-4">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`group rounded-md w-full shadow-md bg-white dark:bg-neutral-700 p-4 relative border-2 transition duration-200 ${i === selectionId ? "border-emerald-600 dark:border-lime-600" : "border-white dark:border-neutral-700"}`}
          >
            <input
              type="radio"
              value={`inst-${i}`}
              id={`inst-${i}`}
              onChange={() => setSelectionId(i)}
              checked={i === selectionId}
              className="opacity-0 m-0 top-0 right-0 bottom-0 left-0 absolute w-full cursor-pointer h-full"
            />
            <label
              htmlFor={`inst-${i}`}
              className={`cursor-pointer flex flex-col justify-between py-1 px-3 relative transition duration-200 h-full ${i === selectionId ? "dark:text-white text-black" : "text-black dark:text-white"}`}
            >
              <div>
                <h4 className="font-bold text-lg">
                  {locale === "de" ? plan.nameDE : plan.nameEN}
                </h4>
                <p className="my-4">
                  {locale === "de" ? plan.descriptionDE : plan.descriptionEN}
                </p>
              </div>

              <div className="mt-4">
                <Divider />
                {plan.price !== undefined ? (
                  <div className="flex items-start mt-4 gap-2">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className="mt-1">CHF / {t("stepper.hour")}</span>
                  </div>
                ) : (
                  <div className="flex items-start mt-4 gap-2 pt-5">
                    <span className="text-xl font-bold">
                      {locale === "de" ? plan.priceDE : plan.priceEN}
                    </span>
                  </div>
                )}
              </div>
            </label>
          </div>
        ))}
      </div>
    </>
  );
}
