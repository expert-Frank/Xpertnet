import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import type { FromEvent } from "react";

import axios from "axios";

import { IconSearch, IconLoader2 } from "@tabler/icons-react";

import AddressSearch from "@/components/addressSearch";
import PlanSelection from "@/components/planSelection";
import useTranslation from "@/hooks/useTranslation";
import type { Match } from "@/components/addressSearch";

export default function Stepper() {
  const [loading, setLoading] = useState<boolean>(false);
  const [address, setAddress] = useState<Match | null>(null);

  const t = useTranslation();

  const checkAvailability = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setLoading(false);
  };

  return (
    <div className="text-black dark:text-neutral-100 w-full max-w-[1200px] mx-auto p-4">
      <form onSubmit={checkAvailability}>
        <AddressSearch address={address} setAddress={setAddress} />
        <PlanSelection address={address} />
      </form>
    </div>
  );
}
