import { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import type { FromEvent } from "react";

import axios from "axios";

import { IconSearch, IconLoader2, IconCheck } from "@tabler/icons-react";

import AddressSearch from "@/components/addressSearch";
import PlanSelection from "@/components/planSelection";
import StaticIPs from "@/components/staticIPs";
import Routers from "@/components/routers";
import ContactData from "@/components/contactData";
import SegmentedControl from "@/components/segmentedControl";
import Alert from "@/components/alert";

import type { Match } from "@/components/addressSearch";
import type { Plan } from "@/components/planSelection";
import type { IPPlan } from "@/components/staticIPs";
import type { Router } from "@/components/routers";
import type { Contact } from "@/components/contactData";

import useTranslation from "@/hooks/useTranslation";

export default function Stepper() {
  const [address, setAddress] = useState<Match | null>(null);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [ips, setIps] = useState<IPPlan | null>(null);
  const [router, setRouter] = useState<Router | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [target, setTarget] = useState<"home" | "business">("home");
  const [ok, setOk] = useState<boolean>(false);

  const t = useTranslation();

  const order = async (contact: Contact) => {
    console.log({ address, plan, ips, router, contact });

    const res = await axios.post("/api/order", {
      address,
      plan,
      ips,
      router,
      contact
    });

    setOk(true);

    setAddress(null);
    setPlan(null);
    setIps(null);
    setRouter(null);
  }

  return (
    <div className="text-black dark:text-neutral-100 w-full max-w-[1200px] mx-auto p-4">
      <div>
        <AddressSearch address={address} setAddress={setAddress} loading={loading} setLoading={setLoading} />

        <SegmentedControl
          callback={setTarget}
          controlRef={useRef()}
          segments={[
            {
              label: t('stepper.home'),
              value: "home",
              ref: useRef()
            },
            {
              label: t('stepper.business'),
              value: "business",
              ref: useRef()
            }
          ]}
          className="mt-8"
        />

        <PlanSelection address={address} loading={loading} setLoading={setLoading} setPlanSelection={setPlan} />
        <StaticIPs show={target === "business"} selection={ips} setSelection={setIps} />
        <Routers show={!!plan} setSelection={setRouter} selection={router} />
        <ContactData show={!!plan} order={order} />

        {ok && (
          <Alert title={t('stepper.success')} icon={<IconCheck />}>
            {t('stepper.successDesc')}
          </Alert>
        )}
      </div>
    </div>
  );
}
