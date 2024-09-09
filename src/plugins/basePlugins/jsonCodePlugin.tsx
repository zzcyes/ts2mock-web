import { ViewPlugin } from "../../types/ViewPlugin";
import Editor from "@monaco-editor/react";

export const jsonCodePlugin: ViewPlugin = {
  key: "jsonCode",
  name: "JSON 代码视图",
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  ),
  render: (data: any, ref?: any) => {
    let jsonString;
    try {
      jsonString = JSON.stringify(data, null, 2);
    } catch (error) {
      jsonString = "";
    }
    if (!jsonString) {
      return <div>Error: Invaild JSON</div>;
    }
    return (
      <Editor
        value={jsonString}
        language="json"
        theme="vs-dark"
        options={{
          readOnly: true,
          minimap: { enabled: false },
          fontSize: 14,
        }}
      />
    );
  },
};
