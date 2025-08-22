import type { ChildrenText } from "../assets/ts/types"

function H1({ children }: ChildrenText) {
  return <h1 className="text-3xl text-center font-extrabold tracking-tight text-slate-900 drop-shadow-sm">{ children }</h1>
}

export { H1 }