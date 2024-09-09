import React from "react";

export interface ViewPlugin {
  key: string;
  name: string;
  icon: React.ReactNode;
  render: (data: any, ref?: any) => React.ReactNode;
}
