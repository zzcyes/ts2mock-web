import { useMemo, useState, useRef, useCallback, useEffect } from "react";
import { TabViewContainer, Toast } from "./TabView.styles";
import TabBar from "./TabBar";
// import ContentArea from "./ContentArea";
import { TabContent, ContentWrapper, ContentBody } from "./TabView.styles";
import { pluginSuite } from "../plugins/PluginSuite";

interface TabViewProps {
  tabs: any[];
  dataSource: any;
  activePlugins: any[];
}

function TabView({ activePlugins, tabs, dataSource }: TabViewProps) {
  const [activeTab, setActiveTab] = useState<string>("");
  const [showToast, setShowToast] = useState(false);
  const [viewMode, setViewMode] = useState<string>("");
  const contentRef = useRef<HTMLDivElement>(null);

  // 重置标签和视图模式
  useEffect(() => {
    if (tabs?.length > 0) {
      setActiveTab(tabs[0]);
    }
  }, [tabs]);

  useEffect(() => {
    if (activePlugins?.length > 0) {
      setViewMode(activePlugins[0].key);
    }
  }, [activePlugins]);

  const content = activeTab === "全部" ? dataSource : dataSource[activeTab];

  const activePlugin = pluginSuite.getPluginsMap()[viewMode];

  const editorRef = useRef<any>(null);

  const copyToClipboard = useCallback(() => {
    if (!contentRef.current) return;

    const getEditorValue = () => {
      return editorRef?.current?.getValue?.();
    };

    const content =
      getEditorValue() ?? JSON.stringify(dataSource[activeTab], null, 2);

    navigator.clipboard
      .writeText(content)
      .then(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      })
      .catch((err) => {
        console.error("复制失败:", err);
      });
  }, [activeTab, dataSource]);

  if (tabs?.length === 0 || !content) {
    return null; // 如果没有数据，不渲染任何内容
  }

  return (
    <TabViewContainer>
      <TabBar
        keys={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        viewMode={viewMode}
        setViewMode={setViewMode}
        activePlugins={activePlugins}
        copyToClipboard={copyToClipboard}
      />
      <TabContent ref={contentRef}>
        <ContentWrapper>
          <ContentBody>
            {activePlugin ? activePlugin?.render(content, editorRef) : null}
          </ContentBody>
        </ContentWrapper>
      </TabContent>
      {showToast && <Toast>已复制到剪贴板</Toast>}
    </TabViewContainer>
  );
}

export default TabView;
