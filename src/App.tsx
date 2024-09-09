/// <reference types="./global.d.ts" />

import React, { useMemo, useState, useRef, useCallback } from "react";
import Editor from "@monaco-editor/react";
import TabView from "./components/TabView";
import { pluginSuite } from "./plugins/PluginSuite";
import {
  codePlugin,
  jsonCodePlugin,
  treePlugin,
  jsonPlugin,
} from "./plugins/basePlugins";
import { FaFileUpload, FaFile, FaTimes } from "react-icons/fa";
import styled from "@emotion/styled";
import {
  AppContainer,
  Header,
  MainContent,
  EditorSection,
  EditorContainer,
  ControlsContainer,
  FileControlsWrapper,
  FileInputWrapper,
  FileInput,
  FileInputLabel,
  FileName,
  FileNameWrapper,
  ButtonGroup,
  OutputSection,
  OutputPlaceholder,
  Toast,
  ToastHeader,
  ToastTitle,
  CloseButton,
  FileIcon,
  RemoveFileButton,
  MockButton,
  CreateMockFunctionButton,
  TestServerButton,
} from "./App.styles";

const PROXY_API_PREFIX = import.meta.env.VITE_PROXY_API_PREFIX ?? "";

const template = String.raw`
export interface User {
  name: string;
  isActive: boolean;
  age: number;
  nullableValue: null;
  undefinedValue: undefined;
  unknownValue: unknown;
  anyValue: any;
  voidValue: void;
  baseUnionType:
    | string
    | number
    | boolean
    | null
    | undefined
    | unknown
    | any
    | void;
  stringList: string[];
  unionArray: (string | number)[];
  multiArray: string[] | number[];
  intersectionAB: A & B;
  intersectionMsgUser: Msg & User;
  userList: User[];
  message: Msg;
  partialMessage: Partial<Msg>;
  unionABCList: (A | B | C)[];
  intersectionWithUnion: A & (B | C);
  intersectionOrUnion: (A & B) | C;
  tsObject: object;
  typeLiteral: {
    name: string,
    age: number,
    phone?: number | string,
  };
  tupleExample: [number, string];
  omitMessageList: Omit<Msg, "list"> & { list?: string };
  omitAProperty: Omit<A, "a">;
}

export interface Msg {
  type: string | number;
  content: string[];
  list: (A | B | C)[];
}

export interface A {
  a: string;
}

export interface B {
  b: number;
}

export interface C {
  c: number;
}
`;

function App() {
  const [input, setInput] = useState(
    "// 在此输入 TypeScript 代码或选择文件进行 Mock" + template
  );
  const [output, setOutput] = useState<any>(null);
  const [mockFunctions, setMockFunctions] = useState<any>(null);

  const [file, setFile] = useState<File | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [healthInfo, setHealthInfo] = useState<any>(null);
  const [selectedMockFunction, setSelectedMockFunction] = useState<
    string | null
  >(null);
  const [activePlugins, setActivePlugins] = useState(pluginSuite.getPlugins());

  console.debug("input", input);

  const handleEditorChange = (value: string | undefined) => {
    setInput(value || "");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        if (typeof text === "string") {
          setInput(text);
        }
      };
      reader.readAsText(selectedFile);
    }
  };

  const clearMockFunctionsResult = () => {
    setMockFunctions("");
  };

  const clearMockResult = () => {
    setOutput("");
  };

  const handleMock = async () => {
    // if (!input) {
    //   alert("请输入 TypeScript 代码或选择文件");
    //   return;
    // }
    clearMockFunctionsResult();
    setActivePlugins([jsonPlugin, jsonCodePlugin, treePlugin]); // 使用所有插件
    try {
      let data;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch(`${PROXY_API_PREFIX}/createMockByFile`, {
          method: "POST",
          body: formData,
        });
        data = await response.json();
      } else {
        const response = await fetch(`${PROXY_API_PREFIX}/createMock`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code: input }),
        });
        data = await response.json();
      }
      setOutput(data);
    } catch (error) {
      console.error("Error:", error);
      setOutput({ error: "Mock 生成出错" });
    }
  };

  const handleCreateMockFunction = async () => {
    // if (!input) {
    //   alert("请输入 TypeScript 代码或选择文件");
    //   return;
    // }
    clearMockResult();
    setActivePlugins([codePlugin]); // 只使用 codePlugin
    try {
      const response = await fetch(`${PROXY_API_PREFIX}/createMockFunction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: input }),
      });
      const data = await response.json();
      setMockFunctions(data);
    } catch (error) {
      console.error("Error:", error);
      setMockFunctions({ error: "创建 Mock 函数出错" });
    }
  };

  console.debug(output);
  console.debug(mockFunctions);

  const testServerConnection = useCallback(async () => {
    try {
      const response = await fetch(`${PROXY_API_PREFIX}/health`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setHealthInfo(data);
        setToastMessage("服务器连接正常");
      } else {
        setToastMessage("服务器连接失败");
      }
    } catch (error) {
      setToastMessage("服务器连接错误");
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  }, []);

  const closeToast = () => {
    setShowToast(false);
  };

  const truncateFileName = (name: string, maxLength: number) => {
    if (name.length <= maxLength) return name;
    const extension = name.split(".").pop() || "";
    const nameWithoutExtension = name.slice(0, name.lastIndexOf("."));
    const truncatedName = nameWithoutExtension.slice(
      0,
      maxLength - 3 - extension.length
    );
    return `${truncatedName}...${extension}`;
  };

  const outTabs = useMemo(() => {
    if (output) {
      try {
        return Object.keys(output);
      } catch (err) {
        console.debug("tabstabstabs", err);
        return [];
      }
    }
    if (mockFunctions) {
      try {
        return Object.keys(mockFunctions);
      } catch (err) {
        console.debug("tabstabstabs", err);
        return [];
      }
    }
    return [];
  }, [output]);

  const mockFunctionTabs = useMemo(() => {
    if (mockFunctions) {
      try {
        return Object.keys(mockFunctions);
      } catch (err) {
        console.debug("tabstabstabs", err);
        return [];
      }
    }
    return [];
  }, [mockFunctions]);

  const handleRemoveFile = () => {
    setFile(null);
    setInput(""); // 清空编辑器
  };

  const renderOutput = () => {
    if (outTabs?.length > 0) {
      return (
        <TabView
          tabs={outTabs}
          dataSource={output}
          activePlugins={[jsonPlugin, jsonCodePlugin, treePlugin]}
        />
      );
    }

    if (mockFunctionTabs?.length > 0) {
      return (
        <TabView
          tabs={mockFunctionTabs}
          dataSource={mockFunctions}
          activePlugins={[codePlugin]}
        />
      );
    }

    return <OutputPlaceholder>Mock 数据将显示在这里</OutputPlaceholder>;
  };

  return (
    <AppContainer>
      {/* <Header>TypeScript Mock 生成器</Header> */}
      <MainContent>
        <EditorSection>
          <EditorContainer>
            <Editor
              defaultLanguage="typescript"
              value={input}
              onChange={handleEditorChange}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
              }}
            />
          </EditorContainer>
          <ControlsContainer>
            <FileControlsWrapper>
              <FileInputWrapper>
                <FileInputLabel>
                  <FaFileUpload size={20} />
                  <FileInput type="file" onChange={handleFileChange} />
                </FileInputLabel>
              </FileInputWrapper>
              {file && (
                <FileNameWrapper>
                  <FileIcon>
                    <FaFile />
                  </FileIcon>
                  <FileName title={file.name}>
                    {truncateFileName(file.name, 15)}
                  </FileName>
                  <RemoveFileButton onClick={handleRemoveFile} title="移除文件">
                    <FaTimes size={14} />
                  </RemoveFileButton>
                </FileNameWrapper>
              )}
            </FileControlsWrapper>
            <ButtonGroup>
              <MockButton
                isDisabled={!input}
                disabled={!input}
                onClick={handleMock}
              >
                生成 Mock 数据
              </MockButton>
              <CreateMockFunctionButton
                isDisabled={!input}
                disabled={!input}
                onClick={handleCreateMockFunction}
              >
                生成 Mock 函数
              </CreateMockFunctionButton>
              <TestServerButton
                onClick={testServerConnection}
                isDisabled={false}
              >
                测试服务器
              </TestServerButton>
            </ButtonGroup>
          </ControlsContainer>
        </EditorSection>
        <OutputSection>{renderOutput()}</OutputSection>
      </MainContent>
      {showToast && healthInfo && (
        <Toast>
          <ToastHeader>
            <ToastTitle>{toastMessage}</ToastTitle>
            <CloseButton onClick={closeToast}>×</CloseButton>
          </ToastHeader>
          <p>状态: {healthInfo.status}</p>
          <p>时间: {new Date(healthInfo.timestamp).toLocaleString()}</p>
          <p>运行时间: {healthInfo.uptime.toFixed(2)}秒</p>
          <p>
            内存使用:{" "}
            {(healthInfo.memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB
          </p>
          <p>
            CPU使用: 用户 {healthInfo.cpuUsage.user}, 系统{" "}
            {healthInfo.cpuUsage.system}
          </p>
        </Toast>
      )}
    </AppContainer>
  );
}

export default App;
