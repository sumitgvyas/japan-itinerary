import React, { createContext, useContext } from "react";
const Ctx = createContext({ open:false, onOpenChange:()=>{} });

export function Sheet({ open=false, onOpenChange=()=>{}, children }){
  return <Ctx.Provider value={{ open, onOpenChange }}>{children}</Ctx.Provider>;
}
export function SheetContent({ side='bottom', className='', children }){
  const { open, onOpenChange } = useContext(Ctx);
  if(!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={()=>onOpenChange(false)} />
      <div className={`absolute left-0 right-0 ${side==='bottom'?'bottom-0':'top-0'} max-h-[90vh] overflow-auto bg-white dark:bg-zinc-900 border-t rounded-t-2xl p-4 ${className}`}>
        {children}
      </div>
    </div>
  );
}
export function SheetHeader({ className='', ...props }){ return <div className={`mb-2 ${className}`} {...props} /> }
export function SheetTitle({ className='', ...props }){ return <div className={`text-lg font-semibold ${className}`} {...props} /> }
export function SheetTrigger(props){ return <span {...props} /> } // not used
