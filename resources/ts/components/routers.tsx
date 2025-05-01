import React, { useState, useEffect } from "react";
import type { ReactNode } from "react";

import axios from "axios";

import useTranslation, { useLocale } from "@/hooks/useTranslation";

import Divider from "@/components/divider";

import { technologyMapping } from "@/components/planSelection";
import type { Plan } from "@/components/planSelection";

export interface Router {
  name: string;
  price: number;
  technology: string;
  descriptionDE: string;
  descriptionEN: string;
}

export default function Routers({
  show,
  iplan,
  setSelection,
  desc,
}: {
  show: boolean;
  iplan: Plan | null;
  setSelection: (router: Router) => void;
  desc: ReactNode;
}) {
  const [plans, setPlans] = useState<Router[]>([]);
  const [selectionId, setSelectionId] = useState<number>(0);

  const t = useTranslation();
  const locale = useLocale();

  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/config", {
        params: {
          field: "routers",
        },
      });

      setPlans(res.data);
    })();
  }, []);

  useEffect(() => {
    if (plans.length === 0) return;
    setSelection(plans[selectionId]);
  }, [selectionId, setSelection, plans]);

  const isAvailable = (plan: Router) => {
    if (plan.technology === "") return true;
    if (!iplan?.available) return false;

    return iplan.available.some(
      (a) => technologyMapping[a.TechnologyType] === plan.technology,
    );
  };

  useEffect(() => {
    if (!plans) return;

    const possible = Array(plans.length)
      .fill(0)
      .map((_, i) => i)
      .filter((_, i) => isAvailable(plans[i]));
    if (possible.length === 0) return;
    setSelectionId(possible[0]);
  }, [iplan, plans]);

  if (plans.length === 0 || !show) return <></>;

  return (
    <>
      {desc}
      <div className="grid grid-cols-1 lg:grid-cols-3 rounded-md gap-4 mt-4">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`group rounded-md w-full shadow-md bg-white dark:bg-neutral-700 p-4 relative border-2 transition duration-200 ${i === selectionId ? "border-emerald-600 dark:border-lime-600" : "border-white dark:border-neutral-700"} ${isAvailable(plan) ? "" : "blur-sm hidden lg:block"}`}
          >
            <input
              type="radio"
              value={i}
              id={`router-${i}`}
              onChange={() => setSelectionId(i)}
              checked={i === selectionId}
              className="opacity-0 m-0 top-0 right-0 bottom-0 left-0 absolute w-full cursor-pointer h-full"
              disabled={!isAvailable(plan)}
            />
            <label
              htmlFor={`router-${i}`}
              className={`cursor-pointer flex flex-col justify-between h-full py-1 px-3 relative transition duration-200 ${i === selectionId ? "dark:text-white text-black" : "text-black dark:text-white"}`}
            >
              <div>
                {plan.name && (
                  <span className="font-semibold text-xl mr-4">
                    {plan.name}
                  </span>
                )}
                <p className="">
                  {locale === "en" ? plan.descriptionEN : plan.descriptionDE}
                </p>
                {plan.technology && (
                  <div className="mt-2">
                    <span className="px-3 py-[1px] rounded-full bg-emerald-100 dark:bg-lime-600 text-black dark:text-white font-semibold text-sm">
                      {t(`stepper.${plan.technology}`)}
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <Divider />
                <div className="flex items-start gap-2">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="mt-1">CHF</span>
                </div>
              </div>
            </label>
          </div>
        ))}
      </div>
    </>
  );
}
