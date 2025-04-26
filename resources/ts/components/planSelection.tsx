import React, { useEffect, useState } from "react";

import axios from "axios";

import ReactJson from "react-json-view";

import {
  IconArrowNarrowDown,
  IconArrowNarrowUp,
  IconInfoCircleFilled,
  IconLoader2,
} from "@tabler/icons-react";

import Divider from "@/components/divider";
import Alert from "@/components/alert";
import type { Match } from "@/components/addressSearch";

import useTranslation, { useLocale } from "@/hooks/useTranslation";

export interface Plan {
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
  available: undefined | null | Availability[];
}

export const technologyMapping = {
  VDSL: "VDSL",
  FIBER_XGSPON: "Fibre XGS-PON",
  FIBER_BX: "Fibre BX",
};

export interface Availability {
  Caption: string;
  Code: string;
  Id: number;
  NetworkProductInfo: {
    SpeedDownKbps: number;
    SpeedUpKbps: number;
  };
  TechnologyType: "FIBER_XGSPON" | "FIBER_BX" | "VDSL";
  Sockets: Socket[];
}

interface Socket {
  Comment: string;
  SocketName: string;
  PlugNumber: number;
  Status: string;
}

interface NexphoneAvailability {
  Available: boolean;
  Connections: NexphoneConnection[];
  ServiceProvider: string;
  TechnologyType: "VDSL" | "FIBER_BX" | "FIBER_XGSPON";
}

interface NexphoneConnection {
  CatalogEntries: NexphoneCatalogEntry[];
  MaxSpeedProfile: {
    MaxSpeedUp: number;
    MaxSpeedDown: number;
  };
  Sockets: NexphoneSocket[];
}

interface NexphoneCatalogEntry {
  Caption: string;
  Code: string;
  Id: number;
  NetworkProductInfo: {
    SpeedDownKbps: number;
    SpeedUpKbps: number;
  };
}

interface NexphoneSocket {
  Comment: string;
  PlugNumber: number;
  SocketName: string;
  Status: string;
}

export default function PlanSelection({
  address,
  loading,
  setLoading,
  setPlanSelection,
}: {
  address: Match | null;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setPlanSelection: (plan: Plan | null) => void;
}) {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [availabilities, setAvailabilities] = useState<Availability[] | null>(
    null,
  );
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  const t = useTranslation();
  const locale = useLocale();

  const searchParams = new URLSearchParams(document.location.search);

  useEffect(() => {
    // get available plans from nexphone
    if (!address) {
      setAvailabilities(null);
      setSelectedPlan(null);
      setPlanSelection(null);
      setPlans(plans.map((p) => ({ ...p, available: undefined })));
      return;
    }

    (async () => {
      const payload = {
        City: address.place,
        PostalCode: address.postal,
        StreetName: address.street,
        StreetNumber: address.num,
      };

      setLoading(true);

      const res = await axios.post(
        "https://portal.nexphone.ch/api/psuite/reseller/sales/network/access/qualification",
        payload,
        {
          "Content-Type": "application/json",
        },
      );

      const relevant: NexphoneAvailability[] = res.data.List.filter(
        (ele: NexphoneAvailability) =>
          ["VDSL", "FIBER_BX", "FIBER_XGSPON"].includes(ele.TechnologyType),
      ).filter((ele: NexphoneAvailability) => ele.Available);

      const avail = relevant.flatMap((technology: NexphoneAvailability) =>
        technology.Connections[0].CatalogEntries.map((av) => ({
          ...av,
          TechnologyType: technology.TechnologyType,
          Sockets: technology.Connections[0].Sockets,
        })),
      );

      setAvailabilities(avail);

      setLoading(false);
    })();
  }, [address]);

  useEffect(() => {
    // fetch all plans from the backend
    (async () => {
      const res = await axios.get("/api/config", {
        params: {
          field: "plans",
        },
      });

      setPlans(res.data.map((p: Plan) => ({ ...p, available: undefined })));
    })();
  }, []);

  useEffect(() => {
    // match availabilities with actual plans
    if (availabilities === null) return;

    const getAvailableTechnologies = (plan: Plan) =>
      Object.keys(plan.availability).filter((a) => plan.availability[a]);

    const newPlans = plans.map((plan) => {
      // for each plan, find (if possible) an availability that
      // best matches that plan. we will then display that availability
      // in place of the plan for exact information that we did
      // not know before
      //
      // Also, two availabilities with different technologies might
      // have the same speed profile. In that case, multiple
      // availabilities are assign to a plan and the user can
      // then select any router for any matching technology
      //
      // available:
      // undefined: initial state
      // null: no option found
      // Availability: best option

      const matches = availabilities
        .filter((a) => plan.down >= a.NetworkProductInfo.SpeedDownKbps)
        .filter((a) =>
          getAvailableTechnologies(plan).includes(
            technologyMapping[a.TechnologyType],
          ),
        )
        .toSorted((a, b) =>
          a.NetworkProductInfo.SpeedDownKbps >
          b.NetworkProductInfo.SpeedDownKbps
            ? -1
            : 1,
        );

      if (matches.length === 0) return { ...plan, available: null };

      const matchesWithSameSpeed = matches.filter(
        (match: Availability) =>
          match.NetworkProductInfo.SpeedUpKbps ===
            matches[0].NetworkProductInfo.SpeedUpKbps &&
          match.NetworkProductInfo.SpeedDownKbps ===
            matches[0].NetworkProductInfo.SpeedDownKbps,
      );

      return { ...plan, available: matchesWithSameSpeed };
    });

    setPlans(newPlans);

    setLoading(false);
  }, [availabilities]);

  useEffect(() => {
    if (selectedPlan === null) return;
    setPlanSelection(plans[selectedPlan]);
  }, [selectedPlan, plans, setPlanSelection]);

  const formatSpeed = (speed: number) => {
    const mb = speed / 1000;

    if (mb >= 1000) return `${Math.round(mb / 1000)} Gbit / s`;
    return `${Math.round(mb)} Mbit / s`;
  };

  return (
    <div className="mt-8 relative">
      {loading && (
        <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center backdrop-blur-sm z-50">
          <IconLoader2 className="animate-spin" size={42} />
        </div>
      )}
      {!address && (
        <Alert
          icon={<IconInfoCircleFilled />}
          title={t("stepper.addAddressFirst")}
          className="mb-4"
        >
          {t("stepper.addAddressFirstDesc")}
        </Alert>
      )}
      {plans.length > 0 && (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <button
              className={`group p-4 flex flex-col justify-between rounded-md group text-left transition duration-500 border-2 bg-white text-black dark:bg-neutral-700 dark:text-neutral-100 ${plan.available === null ? "blur-sm" : "shadow-md cursor-pointer"} ${i === selectedPlan ? "border-emerald-600 dark:border-lime-600" : "border-white dark:border-neutral-700"}`}
              key={i}
              disabled={!plan.available}
              onClick={() => setSelectedPlan(i)}
            >
              <div>
                <h4 className="font-bold text-lg">{plan.title}</h4>
                <p className="my-4">
                  {locale === "de" ? plan.descriptionDE : plan.descriptionEN}
                </p>

                <div className="flex gap-4 my-2">
                  <span className="flex items-center gap-2">
                    <IconArrowNarrowDown className="text-emerald-600 dark:text-emerald-400" />
                    {formatSpeed(
                      (plan.available &&
                        plan.available[0].NetworkProductInfo?.SpeedDownKbps) ||
                        plan.down,
                    )}
                  </span>
                  <span className="flex items-center gap-2">
                    <IconArrowNarrowUp className="text-lime-600 dark:text-lime-400" />
                    {formatSpeed(
                      (plan.available &&
                        plan.available[0].NetworkProductInfo?.SpeedUpKbps) ||
                        plan.up,
                    )}
                  </span>
                </div>

                {plan.available ? (
                  <div className="flex gap-2">
                    {plan.available.map((a: Availability, j: number) => (
                      <span
                        className="px-3 py-[1px] rounded-full bg-emerald-100 dark:bg-lime-600 text-black dark:text-white font-semibold text-sm"
                        key={j}
                      >
                        {technologyMapping[a.TechnologyType]}
                      </span>
                    ))}
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
              </div>

              <div className="mt-4">
                <Divider />
                <div className="flex items-start mt-4 gap-2">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="mt-1">CHF / {t("stepper.month")}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {searchParams.get("json") && plans.length > 0 && (
        <div className="bg-white p-4 rounded-md mt-8 shadow-md">
          <ReactJson src={plans} collapsed={2} displayDataTypes={false} />
        </div>
      )}
    </div>
  );
}
