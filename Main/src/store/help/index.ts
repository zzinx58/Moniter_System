import { isExternal } from "@/utils";
import { RouteRecordRaw } from "vue-router";
import { resolve } from "path-browserify";

export function mapTwoLevelRouter(srcRoutes: Array<RouteRecordRaw>) {
  function addParentRoute(routes: any, parent: any, parentPath: string) {
    routes.forEach((it: RouteRecordRaw) => {
      if (!isExternal(it.path)) {
        it.path = resolve(parentPath, it.path);
      }
      parent.push(it);
      if (it.children && it.children.length > 0) {
        addParentRoute(it.children, parent, it.path);
      }
    });
  }
  if (srcRoutes && srcRoutes.length > 0) {
    const tempRoutes = [] as Array<RouteRecordRaw>;
    srcRoutes.forEach((it) => {
      const route = { ...it };
      const parentRoutes = [] as Array<RouteRecordRaw>;
      if (route.children && route.children.length > 0) {
        addParentRoute(route.children, parentRoutes, route.path);
      }
      parentRoutes &&
        parentRoutes.length > 0 &&
        (route.children = parentRoutes);
      tempRoutes.push(route);
    });
    return tempRoutes;
  }
  return [];
}
