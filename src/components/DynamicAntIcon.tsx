// components/DynamicAntIcon.tsx
import React from "react";
import * as AntdIcons from "@ant-design/icons";

interface DynamicAntIconProps {
  name?: string;
  style?: React.CSSProperties;
  className?: string;
}

const DynamicAntIcon: React.FC<DynamicAntIconProps> = ({
  name,
  style,
  className,
}) => {
  if (!name) return <>—</>;

  const IconComponent = AntdIcons[name as keyof typeof AntdIcons];

  if (!IconComponent) {
    console.warn(`未找到 Ant Design 图标: ${name}`);
    return <>{name}</>; // 或显示原始字符串/占位符
  }

  return <IconComponent style={style} className={className} />;
};

export default DynamicAntIcon;
