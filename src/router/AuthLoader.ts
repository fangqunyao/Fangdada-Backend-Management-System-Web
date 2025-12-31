import api from "@/api";
import { getMenuPaths } from "@/utils/index.ts";
import { useStore } from "@/store/index";

export default async function AuthLoader() {
  const res = await api.getPermissions();
  const { menus } = res;

  const menuListPath = getMenuPaths(menus);
  console.log(menuListPath, menus, res.permissions,"menuIds");

  // 存储菜单到store
  const { setMenus } = useStore.getState();
  setMenus(menus);

  return { menuListPath, menus, buttonList: res.permissions };
}
