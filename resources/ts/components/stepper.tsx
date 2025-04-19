import { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import type { FromEvent } from "react";

import axios from "axios";

import { IconSearch, IconLoader2 } from "@tabler/icons-react";

import AddressSearch from "@/components/addressSearch";
import PlanSelection from "@/components/planSelection";
import SegmentedControl from "@/components/segmentedControl";
import type { Match } from "@/components/addressSearch";

import useTranslation from "@/hooks/useTranslation";

export default function Stepper() {
  const [address, setAddress] = useState<Match | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [target, setTarget] = useState<"home" | "business">("home");

  const t = useTranslation();

  const checkAvailability = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setLoading(false);
  };

  return (
    <div className="text-black dark:text-neutral-100 w-full max-w-[1200px] mx-auto p-4">
      <form onSubmit={checkAvailability}>
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

        <PlanSelection address={address} loading={loading} setLoading={setLoading} />
      </form>
    </div>
  );
}
