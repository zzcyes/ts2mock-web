import React, { useRef, useEffect } from "react";
import {
  TabHeader,
  TabButtonsContainer,
  TabButton,
  ViewModeButtonsContainer,
  ViewModeButton,
  CopyButton,
} from "./TabView.styles";
import { css } from "@emotion/css";

interface TabBarProps {
  keys: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  viewMode: string;
  setViewMode: (mode: string) => void;
  activePlugins: any[];
  copyToClipboard: () => void;
}

function TabBar({
  keys,
  activeTab,
  setActiveTab,
  viewMode,
  setViewMode,
  activePlugins,
  copyToClipboard,
}: TabBarProps) {
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tabsContainer = tabsRef.current;
    if (tabsContainer) {
      const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        tabsContainer.scrollLeft += e.deltaY;
      };
      tabsContainer.addEventListener("wheel", handleWheel);
      return () => tabsContainer.removeEventListener("wheel", handleWheel);
    }
  }, []);

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <TabHeader>
      {keys?.length > 0 && (
        <TabButtonsContainer ref={tabsRef}>
          {keys.map((key) => (
            <TabButton
              key={key}
              isActive={activeTab === key}
              isActiveAll={key === "全部"}
              onClick={() => setActiveTab(key)}
              title={key}
            >
              {truncateText(key, 15)}
            </TabButton>
          ))}
        </TabButtonsContainer>
      )}
      {activePlugins?.length > 0 && (
        <ViewModeButtonsContainer>
          {activePlugins.map((plugin) => (
            <ViewModeButton
              key={plugin.key}
              isActive={viewMode === plugin.key}
              onClick={() => setViewMode(plugin.key)}
              title={plugin.name}
            >
              {plugin.icon}
            </ViewModeButton>
          ))}
          <CopyButton
            onClick={copyToClipboard}
            title="复制内容"
            className={css`
              margin-left: auto;
            `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
              <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
            </svg>
          </CopyButton>
        </ViewModeButtonsContainer>
      )}
    </TabHeader>
  );
}

export default TabBar;
