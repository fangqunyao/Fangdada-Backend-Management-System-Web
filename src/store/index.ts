import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Tab {
  label: string;
  key: string;
  closable?: boolean;
}

interface AppState {
  collapsed: boolean;
  currentMenu: string;
  tabs: Tab[];
  activeTabKey: string;
  updataCollapsed: () => void;
  setCurrentMenu: (menu: string) => void;
  addTab: (tab: Tab) => void;
  removeTab: (key: string) => void;
  setActiveTab: (key: string) => void;
  resetStore: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      collapsed: false,
      currentMenu: "/home",
      tabs: [{ label: "首页", key: "/home", closable: false }],
      activeTabKey: "/home",
      setCurrentMenu: (menu: string) => set(() => ({ currentMenu: menu })),
      updataCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
      addTab: (tab: Tab) =>
        set((state) => {
          const exists = state.tabs.some((t) => t.key === tab.key);
          if (exists) {
            return { activeTabKey: tab.key };
          }
          return { tabs: [...state.tabs, tab], activeTabKey: tab.key };
        }),
      removeTab: (key: string) =>
        set((state) => {
          const newTabs = state.tabs.filter((t) => t.key !== key);
          let newActiveKey = state.activeTabKey;
          if (newActiveKey === key && newTabs.length > 0) {
            newActiveKey = newTabs[newTabs.length - 1].key;
          }
          return { tabs: newTabs, activeTabKey: newActiveKey };
        }),
      setActiveTab: (key: string) => set(() => ({ activeTabKey: key })),
      resetStore: () =>
        set(() => ({
          collapsed: false,
          currentMenu: "/home",
          tabs: [{ label: "首页", key: "/home", closable: false }],
          activeTabKey: "/home",
        })),
    }),
    {
      name: "app-store",
    }
  )
);
