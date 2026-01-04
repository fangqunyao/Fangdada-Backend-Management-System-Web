import api from "@/api";
import { getMenuPaths } from "@/utils/index.ts";
import { useStore } from "@/store/index";

export default async function AuthLoader() {
  const res = await api.getPermissions();
  const { menus } = res;

  const menuListPath = getMenuPaths(menus);
  console.log(menuListPath, menus, res.permissions,"menuIds");

  // 存储菜单和按钮权限到store
  const { setMenus, setButtonList } = useStore.getState();
  setMenus(menus);
  setButtonList(res.permissions);

  return { menuListPath, menus, buttonList: res.permissions };
}
