import type { ReactNode } from "react";

export default function Alert({ title, icon, children, className }: { title: ReactNode | string; icon: ReactNode; children: ReactNode, className: string }) {
  return (
    <div className={`${className} flex gap-6 items-start bg-emerald-600/20 text-black dark:text-white rounded-md p-4`}>
      <div className="w-4">
        {icon}
      </div>
      <div>
        <div className="font-semibold mb-4">{title}</div>

        {children}
      </div>
    </div>
  )
}
