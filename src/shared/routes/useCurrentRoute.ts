import { useMemo } from "react";
import { IRoute } from "./IRoute";
import { useRoutes } from "./RoutesContext";
import {useLocation, matchPath } from "react-router-dom";

export function useCurrentRoute(): IRoute | null {
    const location = useLocation();
    const routes = useRoutes();
    return useMemo(() => {
        return routes.find(route => matchPath(route.path, location.pathname)) || null
    }, [location.pathname, routes]);
}