import styled from "@emotion/styled";

export const TreeContainer = styled.div`
  position: relative;
  font-family: monospace;
  font-size: 14px;
  line-height: 1.5;
  color: #e5e7eb;
`;

export const TreeNode = styled.div<{ depth: number }>`
  position: relative;
  padding-left: ${(props) => props.depth * 20}px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: ${(props) => (props.depth - 1) * 20 + 10}px;
    bottom: 0;
    width: 1px;
    border-left: 1px dashed #4b5563;
  }

  &:last-child::before {
    height: 50%;
  }
`;

export const NodeContent = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: -10px;
    width: 10px;
    height: 1px;
    border-top: 1px dashed #4b5563;
  }
`;

export const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;

  &:hover {
    color: #ffffff;
  }

  svg {
    width: 12px;
    height: 12px;
  }
`;

export const NodeKey = styled.span`
  color: #5eead4;
  margin-right: 4px;
`;

export const NodeValue = styled.span<{ type: string }>`
  color: ${(props) => {
    switch (props.type) {
      case "string":
        return "#fca5a5";
      case "number":
        return "#93c5fd";
      case "boolean":
        return "#fde047";
      default:
        return "#e5e7eb";
    }
  }};
`;

export const ArrayLength = styled.span`
  color: #9ca3af;
  font-style: italic;
`;

export const ChildrenContainer = styled.div`
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -10px;
    bottom: 10px;
    width: 1px;
    border-left: 1px dashed #4b5563;
  }
`;

export const ExpandCollapseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #2d3748;
  border: none;
  color: #e2e8f0;
  cursor: pointer;
  padding: 6px;
  transition: all 0.2s ease-in-out;
  z-index: 10;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #4a5568;
    color: #ffffff;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #4299e1;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;
