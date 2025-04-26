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

  useEffect(() => {
    const ele = document.querySelector("main");
    if(!ele) return;

    if (opened) {
      ele.classList.add("hidden");
    } else {
      ele.classList.remove("hidden");
    }
  }, [opened]);

  useEffect(() => {
    const ele = document.getElementById("mobile-nav");
    if(!ele) return;

    const obj = JSON.parse(ele.dataset.navItems ?? "");
    setNavItems(obj);
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
        <ul className="flex flex-col gap-0 mt-16">
          {navItems.map((item, i) => (
            <li key={i} className="text-2xl font-bold border-b py-4">
              <button
                className="cursor-pointer"
                onClick={() => click(item.anchor)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}

const ele = document.getElementById("mobile-nav");
if(ele) {
  const root = createRoot(ele);
  root.render(<MobileNav />);
}
