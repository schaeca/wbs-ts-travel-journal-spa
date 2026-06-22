import { createContext} from "react";
import type { AuthContextType } from "@/types";

export const AuthenticationContext = createContext<AuthContextType | null >(null)
