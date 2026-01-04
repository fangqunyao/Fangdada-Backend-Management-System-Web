import React from "react";
import { Button } from "antd";
import type { ButtonProps } from "antd";
import { useStore } from "@/store";

interface AuthButtonProps extends ButtonProps {
  permission: string;
  children?: React.ReactNode;
}

export default function AuthButton({
  permission,
  children,
  ...buttonProps
}: AuthButtonProps) {
  const { buttonList } = useStore();

  // 检查是否有权限
  const hasPermission = buttonList.includes(permission);

  // 如果没有权限，不渲染按钮
  if (!hasPermission) {
    return null;
  }

  return (
    <Button {...buttonProps}>
      {children}
    </Button>
  );
}
