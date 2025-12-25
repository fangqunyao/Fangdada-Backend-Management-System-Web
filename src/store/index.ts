import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Tab {
  label: string;
  key: string;
  closable?: boolean;
}

export interface UserInfo {
  id: number;
  username: string;
  nickname: string;
  email: string;
  phone?: string;
  note?: string;
  createTime?: string;
  avatar?: string;
}

interface AppState {
  collapsed: boolean;
  currentMenu: string;
  tabs: Tab[];
  activeTabKey: string;
  isDarkTheme: boolean;
  userInfo: UserInfo | null;
  updataCollapsed: () => void;
  setCurrentMenu: (menu: string) => void;
  addTab: (tab: Tab) => void;
  removeTab: (key: string) => void;
  setActiveTab: (key: string) => void;
  toggleTheme: () => void;
  setUserInfo: (userInfo: UserInfo | null) => void;
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
      userInfo: null,
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
      setUserInfo: (userInfo: UserInfo | null) => set(() => ({ userInfo })),
      resetStore: () =>
        set(() => ({
          collapsed: false,
          currentMenu: "/home",
          tabs: [{ label: "首页", key: "/home", closable: false }],
          activeTabKey: "/home",
          isDarkTheme: false,
          userInfo: null,
        })),
    }),
    {
      name: "app-store",
      // 排除 userInfo 不持久化，提高安全性
      partialize: (state) => ({
        collapsed: state.collapsed,
        currentMenu: state.currentMenu,
        tabs: state.tabs,
        activeTabKey: state.activeTabKey,
        isDarkTheme: state.isDarkTheme,
        // 排除 userInfo，不在 localStorage 中持久化
      }),
    }
  )
);
