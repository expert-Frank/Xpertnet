import { useEffect, useState } from "react";

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

import { IconMapPin, IconX } from "@tabler/icons-react";

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
}: {
  address: Match | null;
  setAddress: (m: Match) => void;
}) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [query, setQuery] = useDebouncedState<string>("", 200);

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
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      shouldFilter={false}
    >
      {!address ? (
        <CommandInput placeholder={t("stepper.addressPlaceholder")} />
      ) : (
        <div className="p-2 rounded-md flex gap-2 items-center text-sm">
          <IconMapPin className="text-emerald-600" />
          <div className="flex-1">{formatAddress(address)}</div>
          <button
            onClick={() => setAddress(null)}
            className="cursor-pointer hover:text-black text-neutral-500"
          >
            <IconX />
          </button>
        </div>
      )}
      {!address && query && (
        <CommandList>
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
