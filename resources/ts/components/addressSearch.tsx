import { useEffect, useState, useRef } from "react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

import { IconMapPin, IconX, IconLoader2 } from "@tabler/icons-react";

import useDebouncedState from "@/hooks/useDebouncedState";
import useTranslation from "@/hooks/useTranslation";

export interface Match {
  place: string;
  postal: string;
  num: string;
  street: string;
  label: string;
}

export default function AddressSearch({
  address,
  setAddress,
  loading,
  setLoading,
}: {
  address: Match | null;
  setAddress: (m: Match) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [query, setQuery] = useDebouncedState<string>("", 200);
  const inputRef = useRef(null);

  console.log("query", query);

  const t = useTranslation();

  const parseAddress = (label: string, num: number) => {
    const bold = label.split("<b>")[1].split("</b>")[0];
    const postal = bold.slice(0, 4);
    const place = bold.slice(5);

    const norm = label.split("<b>")[0].slice(0, -1).split(" ");
    const n = norm[norm.length - 1];
    const street = norm.slice(0, -1).join(" ");

    return {
      place,
      postal,
      num: n,
      street,
      label,
    };
  };

  const formatAddress = (match: Match) => {
    return (
      <span>
        {match.street} {match.num}{" "}
        <b className="ml-2">
          {match.postal} {match.place}
        </b>
      </span>
    );
  };

  useEffect(() => {
    if (query.length < 3) return;

    setLoading(true);

    (async () => {
      const res = await axios.get(
        "https://api3.geo.admin.ch/rest/services/ech/SearchServer",
        {
          params: {
            sr: 2056,
            searchText: query,
            lang: "en",
            type: "locations",
          },
        },
      );

      const filtered = res.data.results
        .filter((obj) => obj.attrs.origin === "address")
        .filter((obj) => obj.attrs.num !== 0)
        .slice(0, 20);

      setMatches(filtered.map((f) => parseAddress(f.attrs.label, f.attrs.num)));
    })();
  }, [query]);

  return (
    <Command
      shouldFilter={false}
      label={t('stepper.address')}
    >
      {!address ? (
        <CommandInput
          defaultValue={query}
          onValueChange={setQuery}
          placeholder={t("stepper.addressPlaceholder")}
          className="text-lg"
          ref={inputRef}
        />
      ) : (
        <div className="p-2 rounded-md flex gap-2 items-center text-sm">
          <IconMapPin className="text-emerald-600" />
          <div className="flex-1">{formatAddress(address)}</div>
          {loading ? (
            <IconLoader2 className="animate-spin text-emerald-600" />
          ) : (
            <button
              onClick={() => {
                setAddress(null);
                inputRef.current.value = "";
              }}
              className="cursor-pointer hover:text-black text-neutral-500"
            >
              <IconX />
            </button>
          )}
        </div>
      )}
      {!address && query && (
        <CommandList>
          <CommandEmpty>{t('stepper.noResultsFound')}</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {matches.map((match, i) => (
              <CommandItem
                key={i}
                onSelect={() => {
                  setAddress(match);
                  setQuery("");
                }}
              >
                {formatAddress(match)}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      )}
    </Command>
  );
}
