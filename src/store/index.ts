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
  isDarkTheme: boolean;
  updataCollapsed: () => void;
  setCurrentMenu: (menu: string) => void;
  addTab: (tab: Tab) => void;
  removeTab: (key: string) => void;
  setActiveTab: (key: string) => void;
  toggleTheme: () => void;
  resetStore: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      collapsed: false,
      currentMenu: "/home",
      tabs: [{ label: "首页", key: "/home", closable: false }],
      activeTabKey: "/home",
      isDarkTheme: false,
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
      toggleTheme: () => {
        const newTheme = !get().isDarkTheme;
        set(() => ({ isDarkTheme: newTheme }));
        // 应用主题到document元素
        if (newTheme) {
          document.documentElement.setAttribute('data-theme', 'dark');
        } else {
          document.documentElement.removeAttribute('data-theme');
        }
      },
      resetStore: () =>
        set(() => ({
          collapsed: false,
          currentMenu: "/home",
          tabs: [{ label: "首页", key: "/home", closable: false }],
          activeTabKey: "/home",
          isDarkTheme: false,
        })),
    }),
    {
      name: "app-store",
    }
  )
);
