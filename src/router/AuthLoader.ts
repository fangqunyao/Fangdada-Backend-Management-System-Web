import api from "@/api";
import { getMenuPaths } from "@/utils/index.ts";

export default async function AuthLoader() {
  const res = await api.getPermissions();
  const { menus } = res;

  const menuListPath = getMenuPaths(menus);
  console.log(menuListPath, menus, "menuIds");
  return { menuListPath, menus, buttonList: res.permissions };
}
