import styled from "@emotion/styled";

export const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f3f4f6;
`;

export const Header = styled.header`
  background-color: #2563eb;
  color: white;
  text-align: center;
  padding: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
`;

export const MainContent = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

export const EditorSection = styled.div`
  width: 50%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const EditorContainer = styled.div`
  flex-grow: 1;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  overflow: hidden;
`;

export const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

export const FileControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  min-width: 0;
`;

export const FileInputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const FileInput = styled.input`
  display: none;
`;

export const FileInputLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #4a90e2;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #357abd;
  }
`;

export const FileNameWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 4px;
  padding: 4px 8px;
  max-width: 200px;
  overflow: hidden;
  position: relative;
`;

export const FileIcon = styled.span`
  margin-right: 8px;
  color: #4a90e2;
  flex-shrink: 0;
`;

export const FileName = styled.span`
  font-size: 14px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 24px; // 为叉叉按钮预留空间
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  border: none;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }
`;

// export const MockButton = styled(Button)`
//   background-color: #3b82f6;
//   color: white;

//   &:hover {
//     background-color: #2563eb;
//   }
// `;

// export const CreateMockFunctionButton = styled(Button)`
//   background-color: #10b981;
//   color: white;

//   &:hover {
//     background-color: #059669;
//   }
// `;

// export const TestServerButton = styled(Button)`
//   background-color: #8b5cf6;
//   color: white;

//   &:hover {
//     background-color: #7c3aed;
//   }

//   &:focus {
//     ring-color: #8b5cf6;
//   }
// `;

export const OutputSection = styled.div`
  width: 50%;
  padding: 1rem;
  /* background-color: #111827; */
  overflow: auto;
  border-radius: 0.375rem;
  height: 100%;
`;

export const OutputPlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  height: 100%;
  border-radius: 0.375rem;
  background-color: #111827;
`;

export const Toast = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background-color: #1f2937;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  max-width: 28rem;
`;

export const ToastHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 0.5rem;
`;

export const ToastTitle = styled.p`
  font-weight: bold;
`;

export const CloseButton = styled.button`
  color: #9ca3af;
  &:hover {
    color: white;
  }
  &:focus {
    outline: none;
  }
`;

export const RemoveFileButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #999;
  padding: 0;
  font-size: 14px;
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  transition: color 0.2s;
  width: 20px; // 设置固定宽度
  height: 20px; // 设置固定高度
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #333;
  }

  &:focus {
    outline: none;
  }
`;

export const StyledButton = styled.button<{ isDisabled: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: bold;
  transition: all 0.3s ease;
  opacity: ${({ isDisabled }) => (isDisabled ? 0.6 : 1)};
  cursor: ${({ isDisabled }) => (isDisabled ? "not-allowed" : "pointer")};
`;

export const MockButton = styled(StyledButton)`
  background-color: ${({ isDisabled }) => (isDisabled ? "#BFDBFE" : "#3B82F6")};
  color: ${({ isDisabled }) => (isDisabled ? "#1E40AF" : "white")};
  &:hover {
    background-color: ${({ isDisabled }) =>
      isDisabled ? "#BFDBFE" : "#2563EB"};
  }
`;

export const CreateMockFunctionButton = styled(StyledButton)`
  background-color: ${({ isDisabled }) => (isDisabled ? "#A7F3D0" : "#10B981")};
  color: ${({ isDisabled }) => (isDisabled ? "#065F46" : "white")};
  &:hover {
    background-color: ${({ isDisabled }) =>
      isDisabled ? "#A7F3D0" : "#059669"};
  }
`;

export const TestServerButton = styled(StyledButton)<{ isDisabled?: boolean }>`
  background-color: ${({ isDisabled }) => (isDisabled ? "#FDE68A" : "#F59E0B")};
  color: ${({ isDisabled }) => (isDisabled ? "#92400E" : "white")};
  &:hover {
    background-color: ${({ isDisabled }) =>
      isDisabled ? "#FDE68A" : "#D97706"};
  }
`;
