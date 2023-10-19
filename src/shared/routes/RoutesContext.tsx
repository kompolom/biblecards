import { createContext, useContext } from "react";
import { IRoute } from "./IRoute";

const RoutesContext = createContext<Readonly<IRoute[]>>([])

export const RoutesContextProvider = RoutesContext.Provider;

export function useRoutes(): Readonly<IRoute[]> {
    return useContext(RoutesContext);
}