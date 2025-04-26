import React, { useState, useEffect } from "react";

import axios from "axios";

import useTranslation from "@/hooks/useTranslation";

import Divider from "@/components/divider";

export interface IPPlan {
  num: number;
  price: number;
}

export default function StaticIPs({
  show,
  setSelection,
}: {
  show: boolean;
  setSelection(s: IPPlan | null): void;
}) {
  const [plans, setPlans] = useState<IPPlan[]>([]);
  const [selectionId, setSelectionId] = useState<number>(0);

  const t = useTranslation();

  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/config", {
        params: {
          field: "staticIP",
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 rounded-md gap-4 mt-8">
      {plans.map((plan, i) => (
        <div
          key={plan.num}
          className={`group rounded-md w-full shadow-md bg-white dark:bg-neutral-700 p-4 relative border-2 transition duration-200 ${i === selectionId ? "border-emerald-600 dark:border-lime-600" : "border-white dark:border-neutral-700"}`}
        >
          <input
            type="radio"
            value={plan.num}
            id={`plan-${plan.num}`}
            onChange={() => setSelectionId(i)}
            checked={i === selectionId}
            className="opacity-0 m-0 top-0 right-0 bottom-0 left-0 absolute w-full cursor-pointer h-full"
          />
          <label
            htmlFor={`plan-${plan.num}`}
            className={`cursor-pointer flex flex-col justify-between py-1 px-3 relative transition duration-200 ${i === selectionId ? "dark:text-white text-black" : "text-black dark:text-white"}`}
          >
            <div>
              <span className="font-semibold text-xl mr-4">{plan.num}</span>{" "}
              {plan.num === 1 ? t("stepper.staticIP") : t("stepper.staticIPs")}
            </div>

            <div className="mt-4">
              <Divider />
              <div className="flex items-start mt-4 gap-2">
                <span className="text-5xl font-bold">{plan.price}</span>
                <span className="mt-1">CHF / {t("stepper.month")}</span>
              </div>
            </div>
          </label>
        </div>
      ))}
    </div>
  );
}
