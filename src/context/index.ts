import type { AuthContextType } from "@/types"
import { use } from "react"
import { AuthenticationContext } from "./AuthenticationContext"
export {default as AuthenticationProvider} from "./AuthenticationProvider"

export const useAuth = (): AuthContextType => {
    const context = use(AuthenticationContext)
    if(!context) throw new Error("useAuth must be used within AuthenticationProvider")
    return context
}