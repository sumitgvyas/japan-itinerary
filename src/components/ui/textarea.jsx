import React from "react";
export function Textarea({ className='', ...props }){
  return <textarea className={`w-full px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 ${className}`} {...props} />;
}
