import React, { useState, useEffect, useRef } from "react";

import axios from "axios";

import { IconCheck, IconInfoCircle } from "@tabler/icons-react";

import AddressSearch from "@/components/addressSearch";
import PlanSelection from "@/components/planSelection";
import StaticIPs from "@/components/staticIPs";
import Routers from "@/components/routers";
import Installation from "@/components/installation";
import ContactData from "@/components/contactData";
import SegmentedControl from "@/components/segmentedControl";
import Alert from "@/components/alert";

import type { Match } from "@/components/addressSearch";
import type { Plan } from "@/components/planSelection";
import type { IPPlan } from "@/components/staticIPs";
import type { Router } from "@/components/routers";
import type { Installation as InstallationType } from "@/components/installation";
import type { Contact } from "@/components/contactData";

import useTranslation, { useLocale } from "@/hooks/useTranslation";

interface Description {
  [key: string]: Entry;
}

interface Entry {
  title: {
    de: string;
    en: string;
  };
  texts: {
    de: string[];
    en: string[];
  };
}

export default function Stepper() {
  const [address, setAddress] = useState<Match | null>(null);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [ips, setIps] = useState<IPPlan | null>(null);
  const [router, setRouter] = useState<Router | null>(null);
  const [installation, setInstallation] = useState<InstallationType | null>(
    null,
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [target, setTarget] = useState<"home" | "business">("home");
  const [ok, setOk] = useState<boolean>(false);

  const [descriptions, setDescriptions] = useState<Description | null>(null);

  const t = useTranslation();
  const locale = useLocale();

  const order = async (contact: Contact) => {
    await axios.post("/api/order", {
      address,
      plan,
      ips,
      router,
      installation,
      contact,
    });

    setOk(true);

    setAddress(null);
    setPlan(null);
    setIps(null);
    setRouter(null);
  };

  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/config", {
        params: {
          field: "texts",
        },
      });

      setDescriptions(res.data);
    })();
  }, []);

  const getDescriptions = (key: string) => {
    if (!descriptions) return <></>;
    if (!descriptions[key]) return <></>;

    const texts =
      locale === "de"
        ? descriptions[key].texts["de"]
        : descriptions[key].texts["en"];

    return (
      <Alert
        title={
          locale === "de"
            ? descriptions[key].title["de"]
            : descriptions[key].title["en"]
        }
        icon={<IconInfoCircle />}
        className="mt-8"
      >
        {texts.map((t, i) => (
          <p key={i}>{t}</p>
        ))}
      </Alert>
    );
  };

  return (
    <div className="text-black dark:text-neutral-100 w-full max-w-[1200px] mx-auto p-6">
      <div>
        <AddressSearch
          address={address}
          setAddress={setAddress}
          loading={loading}
        />

        <SegmentedControl
          callback={setTarget}
          controlRef={useRef()}
          segments={[
            {
              label: t("stepper.home"),
              value: "home",
              ref: useRef(),
            },
            {
              label: t("stepper.business"),
              value: "business",
              ref: useRef(),
            },
          ]}
          className="mt-8"
        />

        <PlanSelection
          address={address}
          loading={loading}
          setLoading={setLoading}
          setPlanSelection={setPlan}
          desc={getDescriptions("plans")}
        />
        <StaticIPs
          show={target === "business"}
          setSelection={setIps}
          desc={getDescriptions("ips")}
        />
        <Routers
          show={!!plan}
          setSelection={setRouter}
          iplan={plan}
          desc={getDescriptions("routers")}
        />
        <Installation
          show={!!plan}
          setSelection={setInstallation}
          desc={getDescriptions("installation")}
        />
        <ContactData show={!!plan} order={order} />

        {ok && (
          <Alert
            title={t("stepper.success")}
            icon={<IconCheck />}
            className="mt-8"
          >
            {t("stepper.successDesc")}
          </Alert>
        )}
      </div>
    </div>
  );
}
