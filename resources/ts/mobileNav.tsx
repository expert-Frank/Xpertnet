import React, { useState, useEffect } from "react";
import { createRoot } from 'react-dom/client';

export default function MobileNav() {
    const [opened, setOpened] = useState<boolean>(false);

    //useEffect(() => {
    //    if(opened)
    //        document.body.classList.add('overflow-y-hidden');
    //    else
    //        document.body.classList.remove('overflow-y-hidden');
    //}, [opened]);

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
            <aside className={`left-0 transition-transform absolute top-16 w-full z-30 duration-250 bg-white dark:bg-neutral-900 min-h-[calc(100vh-64px)] p-4 ${opened ? "translate-x-0" : "-translate-x-full"}`}>
                asdf
            </aside>
        </>
    );
}

const root = createRoot(document.getElementById('mobile-nav'));
root.render(<MobileNav />);
