// 获取菜单的path
export function getMenuPaths(list: any): string[] {
  return list.reduce((res: string[], item: any) => {
    const paths = Array.isArray(item.menuSvoList)
      ? getMenuPaths(item.menuSvoList)
      : [item.url];
    return res.concat(paths);
  }, []);
}
