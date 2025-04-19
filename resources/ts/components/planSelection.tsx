import { useEffect, useState } from "react";

import axios from "axios";

import { IconArrowNarrowDown, IconArrowNarrowUp } from "@tabler/icons-react";

import type Match from "@/components/addressSearch";

import useTranslation, { useLocale } from "@/hooks/useTranslation";

interface Plan {
  title: string;
  descriptionDE: string;
  descriptionEN: string;
  up: number;
  down: number;
  price: number;
  availability: {
    VDSL: boolean;
    Fibre_BX: boolean;
    Fibre_XGSPON: boolean;
  };
  available: undefined | null | Availability;
}

interface Availability {
  Caption: string;
  Code: string;
  Id: number;
  NetworkProductInfo: {
    SpeedDownKbps: number;
    SpeedUpKbps: number;
  };
  TechnologyType: "FIBER_XGSPON" | "FIBER_BX" | "VDSL";
}

export default function PlanSelection({
  address,
  loading,
  setLoading,
}: {
  address: Match | null
  loading: boolean;
  setLoading: (loading: boolean) => void;
}) {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  const t = useTranslation();
  const locale = useLocale();

  const technologyMapping = {
    "VDSL": "VDSL",
    "FIBER_XGSPON": "Fibre XGS-PON",
    "FIBER_BX": "Fibre BX"
  }

  useEffect(() => {
    // get available plans from nexphone
    if (!address) {
      setAvailabilities([]);
      setSelectedPlan(null);
      setPlans(plans.map(p => ({...p, available: undefined})));
      return;
    }

    (async () => {
      const payload = {
        City: address.place,
        PostalCode: address.postal,
        StreetName: address.street,
        StreetNumber: address.num,
      };

      const res = await axios.post(
        "https://portal.nexphone.ch/api/psuite/reseller/sales/network/access/qualification",
        payload,
        {
          "Content-Type": "application/json",
        },
      );

      const relevant = res.data.List.filter((ele) =>
        ["VDSL", "FIBER_BX", "FIBER_XGSPON"].includes(ele.TechnologyType),
      ).filter((ele) => ele.Available);

      const avail = relevant.flatMap(technology => (
        technology.Connections[0].CatalogEntries.map(av => (
          {...av, TechnologyType: technology.TechnologyType}
        ))
      ));

      setAvailabilities(avail);
    })();
  }, [address]);

  useEffect(() => {
    // fetch all plans from the backend
    (async () => {
      const res = await axios.get("/api/plans");

      setPlans(res.data.map(p => ({...p, available: undefined})));
    })();
  }, []);

  useEffect(() => {
    // match availabilities with actual plans
    if(availabilities.length === 0) return;

    const getAvailableTechnologies = (plan: Plan) => Object.keys(plan.availability).filter(a => plan.availability[a]);

    const newPlans = plans.map(plan => {
      // for each plan, find (if possible) an availability that
      // best matches that plan. we will then display that availability
      // in place of the plan for exact information that we did
      // not know before
      //
      // available:
      // undefined: initial state
      // null: no option found
      // Availability: best option

      const match = availabilities
        .filter(a => plan.down >= a.NetworkProductInfo.SpeedDownKbps)
        .filter(a => getAvailableTechnologies(plan).includes(technologyMapping[a.TechnologyType]))
        .toSorted((a, b) => a.NetworkProductInfo.SpeedDownKbps > b.NetworkProductInfo.SpeedDownKbps ? -1 : 1)[0];

      if(!match) return {...plan, available: null};
      return {...plan, available: match};
    });

    setPlans(newPlans);

    setLoading(false);
  }, [availabilities]);

  const formatSpeed = (speed: number) => {
    const mb = speed / 1000;

    if(mb >= 1000) return `${Math.round(mb / 1000)} Gbit / s`;
    return `${Math.round(mb)} Mbit / s`
  }

  return (
    <div className="my-8">
      {plans.length > 0 && (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <button className={`p-4 rounded-md group text-left transition duration-500 border-2 ${plan.available === null ? "bg-neutral-200 text-neutral-600 shadow-none blur-sm" : "bg-white text-black dark:bg-neutral-700 dark:text-neutral-100 shadow-md cursor-pointer"} ${i === selectedPlan ? "border-emerald-600" : "border-white dark:border-neutral-700"}`} key={i} disabled={!plan.available} onClick={() => setSelectedPlan(i)}>
              <div className="flex gap-4 items-center">
                <img
                  src="/img/pentagon.svg"
                  class="w-6 group-hover:rotate-72 duration-250 drop-shadow-lg"
                />
                <h4 className="font-bold text-lg">{plan.title}</h4>
              </div>
              <p className="my-4">
                {locale === "de" ? plan.descriptionDE : plan.descriptionEN}
              </p>

              <div className="flex gap-4 my-2">
                <span className="flex items-center gap-2">
                  <IconArrowNarrowDown className="text-emerald-600 dark:text-emerald-400" />
                  {formatSpeed(plan.available?.NetworkProductInfo?.SpeedDownKbps || plan.down)}
                </span>
                <span className="flex items-center gap-2">
                  <IconArrowNarrowUp className="text-lime-600 dark:text-lime-400" />
                  {formatSpeed(plan.available?.NetworkProductInfo?.SpeedUpKbps || plan.up)}
                </span>
              </div>

              {plan.available ? (
                <div className="flex gap-2">
                  <span
                    className="px-3 py-[1px] rounded-full bg-emerald-100 dark:bg-lime-600 text-black dark:text-white font-semibold text-sm"
                  >
                    {technologyMapping[plan.available.TechnologyType]}
                  </span>
                </div>
              ) : (
                <div className="flex gap-2">
                  {["VDSL", "Fibre BX", "Fibre XGS-PON"]
                    .filter((opt) => plan["availability"][opt])
                    .map((opt, j) => (
                      <span
                        className="px-3 py-[1px] rounded-full bg-emerald-100 dark:bg-lime-600 text-black dark:text-white font-semibold text-sm"
                        key={j}
                      >
                        {opt}
                      </span>
                    ))}
                </div>
              )}

              <div className="flex items-start my-4 gap-2">
                <span className="text-5xl font-bold">{plan.price}</span>
                <span className="mt-1">CHF / {t("stepper.month")}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
