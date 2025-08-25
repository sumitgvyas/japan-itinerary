import React from "react";
export function Button({ as:Comp='button', className='', variant='default', size='md', ...props }){
  const cls = `inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl border ${variant==='ghost'?'bg-transparent':'bg-white dark:bg-zinc-800'} ${variant==='outline'?'border-zinc-300 dark:border-zinc-700':'border-zinc-300 dark:border-zinc-700'} shadow-sm text-sm ` + className;
  return <Comp className={cls} {...props} />;
}
export default Button;
