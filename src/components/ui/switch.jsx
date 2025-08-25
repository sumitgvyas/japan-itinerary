import React from "react";
export function Switch({ checked=false, onCheckedChange=()=>{} }){
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
      />
    </label>
  );
}
