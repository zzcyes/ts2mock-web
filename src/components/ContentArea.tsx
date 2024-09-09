import React, { forwardRef, useMemo } from "react";
import { TabContent, ContentWrapper, ContentBody } from "./TabView.styles";
import { pluginSuite } from "../plugins/PluginSuite";

interface ContentAreaProps {
  activeTab: string;
  viewMode: string;
  data: any;
}

const ContentArea = forwardRef<HTMLDivElement, ContentAreaProps>(
  ({ activeTab, viewMode, data }, ref) => {
    const content = activeTab === "全部" ? data : data[activeTab];
    const activePlugin = pluginSuite.getPluginsMap()[viewMode];

    console.debug("activePlugin", activePlugin);
    const renderContent = useMemo(() => {
      try {
        return activePlugin ? activePlugin.render(content) : null;
      } catch (err) {
        return null;
      }
    }, [activePlugin]);

    return (
      <TabContent>
        <ContentWrapper>
          <ContentBody>{renderContent}</ContentBody>
        </ContentWrapper>
      </TabContent>
    );
  }
);

export default ContentArea;
