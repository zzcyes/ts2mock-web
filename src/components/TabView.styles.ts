import styled from "@emotion/styled";

export const TabViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #1e293b;
  color: #e2e8f0;
`;

export const TabHeader = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #0f172a;
  border-bottom: 1px solid #334155;
`;

export const TabButtonsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  padding: 0.5rem 0.5rem 0;
  scrollbar-width: thin;
  scrollbar-color: #4b5563 #1e293b;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #1e293b;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #4b5563;
    border-radius: 3px;
  }
`;

export const TabButton = styled.button<{
  isActive: boolean;
  isActiveAll?: boolean;
}>`
  padding: 0.5rem 1rem;
  margin-right: 0.25rem;
  border-radius: 0.375rem 0.375rem 0 0;
  font-size: 0.875rem;
  color: ${(props) => (props.isActive ? "#ffffff" : "#94a3b8")};
  background-color: ${(props) =>
    props.isActive
      ? props.isActiveAll
        ? "#3b82f6"
        : "#1e293b"
      : "transparent"};
  background-color: ${(props) => (props.isActive ? "#3b82f6" : "#transparent")};
  border: none;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  flex-shrink: 0;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background-color: ${(props) => (props.isActive ? "" : "#334155")};
    color: #ffffff;
  }
`;

export const ViewModeButtonsContainer = styled.div`
  display: flex;
  background-color: #1e293b;
  padding: 0.5rem;
  gap: 0.5rem;
`;

export const ViewModeButton = styled.button<{ isActive: boolean }>`
  padding: 0.5rem;
  background-color: ${(props) => (props.isActive ? "#3b82f6" : "#2d3748")};
  color: ${(props) => (props.isActive ? "#ffffff" : "#94a3b8")};
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: ${(props) => (props.isActive ? "#2563eb" : "#4a5568")};
  }
`;

export const CopyButton = styled.button`
  padding: 0.5rem;
  color: #94a3b8;
  background-color: #2d3748;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: #4a5568;
    color: #ffffff;
  }
`;

export const TabContent = styled.div`
  flex-grow: 1;
  overflow: auto;
  padding: 1rem;
`;

export const Toast = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background-color: #2d3748;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ContentWrapper = styled.div`
  height: 100%;
`;

export const ContentBody = styled.div`
  height: 100%;
  overflow: auto;
`;

export const ViewModeButtonWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const Tooltip = styled.span`
  visibility: hidden;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 10px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;

  ${ViewModeButtonWrapper}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;
