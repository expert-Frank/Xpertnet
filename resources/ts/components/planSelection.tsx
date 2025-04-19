import { useEffect, useState } from "react";

import axios from "axios";

import { IconArrowNarrowDown, IconArrowNarrowUp } from "@tabler/icons-react";

import type Match from "@/components/addressSearch";

import useTranslation, { useLocale } from "@/hooks/useTranslation";

interface Plan {
  title: string;
  descriptionDE: string;
  descriptionEN: string;
  up: string;
  down: string;
  price: number;
  availability: {
    VDSL: boolean;
    Fibre_BX: boolean;
    Fibre_XGSPON: boolean;
  };
}

interface Availability {
  Available: boolean;
  Connections: Connection[];
  ServiceProvider: string;
  TechnologyType: "FIBER_XGSPON" | "FIBER_BX" | "VDSL";
}

interface Connection {
  Address: {
    City: string;
    PostalCode: string;
    StreetName: string;
    StreetNumber: string;
  };
  CatalogEntries: CatalogEntry[];
  MaxSpeedProfile: {
    MaxSpeedUp: number;
    MaxSpeedDown: number;
  };
}

interface CatalogEntry {
  Caption: string;
  Code: string;
  Id: number;
  NetworkProductInfo: {
    SpeedDownKbps: number;
    SpeedUpKbps: number;
  };
}

export default function PlanSelection({ address }: { address: Match | null }) {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);

  const t = useTranslation();
  const locale = useLocale();

  useEffect(() => {
    if (!address) return;

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

      setAvailabilities(relevant);
    })();
  }, [address]);

  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/plans");

      setPlans(res.data);
    })();
  }, []);

  console.log(availabilities);

  return (
    <div className="my-8">
      {plans.length > 0 && (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <div className="p-4 rounded-md shadow-md group bg-white" key={i}>
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
                  <IconArrowNarrowDown className="text-emerald-600" />
                  {plan.down}
                </span>
                <span className="flex items-center gap-2">
                  <IconArrowNarrowUp className="text-lime-600" />
                  {plan.up}
                </span>
              </div>

              <div className="flex gap-2">
                {["VDSL", "Fibre BX", "Fibre XGS-PON"]
                  .filter((opt) => plan["availability"][opt])
                  .map((opt, j) => (
                    <span
                      className="px-3 py-[1px] rounded-full bg-emerald-100 font-semibold text-sm"
                      key={j}
                    >
                      {opt}
                    </span>
                  ))}
              </div>

              <div className="flex items-start my-4 gap-2">
                <span className="text-5xl font-bold">{plan.price}</span>
                <span className="mt-1">CHF / {t("stepper.month")}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
