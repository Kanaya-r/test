import type { childrenText } from "../assets/ts/types"

export function H1({ children }: childrenText) {
  return <h1 className="text-3xl text-center font-extrabold tracking-tight text-slate-900 drop-shadow-sm">{ children }</h1>
}