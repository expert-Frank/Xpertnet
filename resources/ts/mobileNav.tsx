import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

interface NavItem {
  label: string;
  anchor: string;
}

interface Imprint {
  [key: string]: string | Imprint;
}

export default function MobileNav() {
  const [opened, setOpened] = useState<boolean>(false);
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [imprint, setImprint] = useState<Imprint>({});

  console.log(opened);

  useEffect(() => {
    const ele = document.querySelector("main");
    if (opened) {
      ele.classList.add("hidden");
    } else {
      ele.classList.remove("hidden");
    }
  }, [opened]);

  useEffect(() => {
    const ele = document.getElementById("mobile-nav");
    const obj = JSON.parse(ele.dataset.navItems);
    const objImp = JSON.parse(ele.dataset.navImprint);
    setNavItems(obj);
    setImprint(objImp);
  }, []);

  const click = (anchor: string) => {
    setOpened(false);
    location.hash = anchor;
  };

  return (
    <>
      <button onClick={() => setOpened(!opened)}>
        <div className="relative rotate-0 duration-500 cursor-pointer w-4 h-4">
          <span
            className={`transition-transform block absolute h-[1px] bg-black dark:bg-neutral-100 left-0 duration-250 w-full ${opened ? "rotate-135 top-[8px]" : "rotate-0 top-[3px]"}`}
          />
          <span
            className={`transition-transform block absolute h-[1px] bg-black dark:bg-neutral-100 rotate-0 duration-250 w-full top-[8px] ${opened ? "-translate-x-[60px]" : "translate-0"}`}
          />
          <span
            className={`transition-transform block absolute h-[1px] bg-black dark:bg-neutral-100 left-0 duration-250 w-full ${opened ? "-rotate-135 top-[8px]" : "rotate-0 top-[13px]"}`}
          />
        </div>
      </button>
      <aside
        className={`left-0 transition-transform absolute top-16 w-full z-30 duration-250 bg-white dark:bg-neutral-900 min-h-[calc(100vh-64px)] p-6 flex flex-col justify-between ${opened ? "translate-x-0" : "-translate-x-full"}`}
      >
        <ul className="flex flex-col gap-4 mt-16">
          {navItems.map((item, i) => (
            <li key={i} className="text-3xl font-bold">
              <button
                className="cursor-pointer"
                onClick={() => click(item.anchor)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        {imprint.source && (
          <ul class="flex flex-col gap-3 text-sm">
            <li>
              <p class="flex gap-2 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="icon icon-tabler icons-tabler-outline icon-tabler-copyright"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M14 9.75a3.016 3.016 0 0 0 -4.163 .173a2.993 2.993 0 0 0 0 4.154a3.016 3.016 0 0 0 4.163 .173" />
                </svg>
                <span>
                  {imprint["copyright"]["year"]},{" "}
                  {imprint["copyright"]["author"]},{" "}
                  {imprint["copyright"]["place"]}
                </span>
              </p>
            </li>
            <li class="flex items-center gap-2">
              {imprint["author"]["label"]
                .replace("[name]", ";;")
                .replace("[heart]", "!!")
                .split(";")
                .flatMap((p) =>
                  p === "" ? (
                    <a
                      href={imprint["author"]["url"]}
                      target="_blank"
                      class="underline whitespace-nowrap"
                    >
                      {imprint["author"]["name"]}
                    </a>
                  ) : (
                    p.split("!").map((r) =>
                      r === "" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="text-red-600 icon icon-tabler icons-tabler-filled icon-tabler-heart"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" />
                        </svg>
                      ) : (
                        r
                      ),
                    )
                  ),
                )}
            </li>
            <li>
              <a
                href={imprint["source"]["url"]}
                target="blank"
                className="flex gap-4 items-center underline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeWinecap="round"
                  strokeLinejoin="round"
                  class="icon icon-tabler icons-tabler-outline icon-tabler-code"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 8l-4 4l4 4" />
                  <path d="M17 8l4 4l-4 4" />
                  <path d="M14 4l-4 16" />
                </svg>
                {imprint["source"]["label"]}
              </a>
            </li>
          </ul>
        )}
      </aside>
    </>
  );
}

const root = createRoot(document.getElementById("mobile-nav"));
root.render(<MobileNav />);
