import { useMemo } from "react";
import { IRoute } from "./IRoute";
import { useRoutes } from "./RoutesContext";
import { useLocation } from "react-router-dom";

export function useCurrentRoute(): IRoute | null {
    const location = useLocation();
    const routes = useRoutes();
    return useMemo(() => {
        return routes.find(route => route.path === location.pathname) || null
    }, [location.pathname, routes]);
}