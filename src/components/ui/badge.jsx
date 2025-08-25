import React from "react";
export function Badge({ children, variant='default', className='' }){
  const base = "inline-flex items-center px-2 py-0.5 text-xs rounded-full";
  const style = variant==='secondary'
    ? "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
    : variant==='outline'
    ? "border border-zinc-300 dark:border-zinc-700"
    : "bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-100";
  return <span className={`${base} ${style} ${className}`}>{children}</span>;
}
