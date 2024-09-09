import React, { useState, useCallback } from "react";
import {
  TreeContainer,
  TreeNode,
  NodeContent,
  ToggleButton,
  NodeKey,
  NodeValue,
  ArrayLength,
  ChildrenContainer,
  ExpandCollapseButton,
} from "./TreeView.styles";

// SVG 图标组件
const ChevronRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

const ChevronDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

interface TreeViewProps {
  data: any;
}

const TreeView: React.FC<TreeViewProps> = ({ data }) => {
  const [expandAll, setExpandAll] = useState(true);

  const toggleExpandAll = useCallback(() => {
    setExpandAll((prev) => !prev);
  }, []);

  return (
    <TreeContainer>
      <ExpandCollapseButton
        onClick={toggleExpandAll}
        title={expandAll ? "折叠所有" : "展开所有"}
      >
        {expandAll ? <ChevronDown /> : <ChevronRight />}
      </ExpandCollapseButton>
      <Node data={data} name="root" depth={0} expandAll={expandAll} />
    </TreeContainer>
  );
};

interface NodeProps {
  data: any;
  name: string;
  depth: number;
  expandAll: boolean;
}

const Node: React.FC<NodeProps> = ({ data, name, depth, expandAll }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  React.useEffect(() => {
    setIsExpanded(expandAll);
  }, [expandAll]);

  if (typeof data !== "object" || data === null) {
    return (
      <TreeNode depth={depth}>
        <NodeContent>
          <NodeKey>{name}: </NodeKey>
          <NodeValue type={typeof data}>{JSON.stringify(data)}</NodeValue>
        </NodeContent>
      </TreeNode>
    );
  }

  const isArray = Array.isArray(data);

  return (
    <TreeNode depth={depth}>
      <NodeContent>
        <ToggleButton onClick={toggleExpand}>
          {isExpanded ? <ChevronDown /> : <ChevronRight />}
        </ToggleButton>
        <NodeKey>{name}</NodeKey>
        {isArray && <ArrayLength> [{data.length}]</ArrayLength>}
      </NodeContent>
      {isExpanded && (
        <ChildrenContainer>
          {Object.entries(data).map(([key, value]) => (
            <Node
              key={key}
              name={key}
              data={value}
              depth={depth + 1}
              expandAll={expandAll}
            />
          ))}
        </ChildrenContainer>
      )}
    </TreeNode>
  );
};

export default TreeView;
