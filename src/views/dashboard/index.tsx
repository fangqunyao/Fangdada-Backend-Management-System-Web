import React from "react";
import {
  Row,
  Col,
  Card,
  Statistic,
  Progress,
  Button,
  List,
  Avatar,
  Badge,
  Timeline,
} from "antd";
import {
  UserOutlined,
  TeamOutlined,
  FileTextOutlined,
  SettingOutlined,
  RiseOutlined,
  FallOutlined,
  DatabaseOutlined,
  CloudOutlined,
  SafetyCertificateOutlined,
  BarChartOutlined,
  RocketOutlined,
  GlobalOutlined,
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import LargeScreenDisplay from "./components/LargeScreenDisplay";
import styles from "./index.module.css";

export default function Dashboard() {
  // 匹配首页核心功能的统计数据
  const stats = [
    {
      title: "活跃用户",
      value: 10000,
      icon: <UserOutlined />,
      color: "#1890ff",
      change: "+15%",
      changeType: "increase",
      desc: "每日活跃用户数量",
    },
    {
      title: "系统性能",
      value: 99.9,
      icon: <BarChartOutlined />,
      color: "#52c41a",
      change: "+0.1%",
      changeType: "increase",
      desc: "系统响应时间(ms)",
    },
    {
      title: "安全等级",
      value: "A+",
      icon: <SafetyCertificateOutlined />,
      color: "#faad14",
      change: "稳定",
      changeType: "stable",
      desc: "安全评估等级",
    },
    {
      title: "企业客户",
      value: 500,
      icon: <TeamOutlined />,
      color: "#722ed1",
      change: "+8%",
      changeType: "increase",
      desc: "合作企业数量",
    },
  ];

  const systemCapabilities = [
    {
      title: "高效性能",
      value: 98,
      icon: <RocketOutlined />,
      color: "#1890ff",
      status: "优秀",
      desc: "平均响应时间 < 100ms",
    },
    {
      title: "安全可靠",
      value: 100,
      icon: <SafetyCertificateOutlined />,
      color: "#52c41a",
      status: "安全",
      desc: "7*24小时安全监控",
    },
    {
      title: "团队协作",
      value: 95,
      icon: <TeamOutlined />,
      color: "#faad14",
      status: "活跃",
      desc: "实时协作项目数",
    },
    {
      title: "数据分析",
      value: 92,
      icon: <BarChartOutlined />,
      color: "#f5222d",
      status: "精准",
      desc: "数据分析准确率",
    },
    {
      title: "全球化",
      value: 85,
      icon: <GlobalOutlined />,
      color: "#13c2c2",
      status: "覆盖",
      desc: "支持的国家/地区",
    },
    {
      title: "灵活配置",
      value: 96,
      icon: <SettingOutlined />,
      color: "#722ed1",
      status: "灵活",
      desc: "配置自定义程度",
    },
  ];

  const quickActions = [
    {
      title: "用户管理",
      icon: <UserOutlined />,
      color: "#1890ff",
      action: "userManagement",
      desc: "管理系统用户",
    },
    {
      title: "内容发布",
      icon: <FileTextOutlined />,
      color: "#52c41a",
      action: "contentPublish",
      desc: "发布新内容",
    },
    {
      title: "数据分析",
      icon: <BarChartOutlined />,
      color: "#faad14",
      action: "dataAnalysis",
      desc: "查看数据报表",
    },
    {
      title: "系统设置",
      icon: <SettingOutlined />,
      color: "#f5222d",
      action: "systemSettings",
      desc: "配置系统参数",
    },
    {
      title: "安全监控",
      icon: <SafetyCertificateOutlined />,
      color: "#13c2c2",
      action: "securityMonitor",
      desc: "实时安全监控",
    },
    {
      title: "团队协作",
      icon: <TeamOutlined />,
      color: "#722ed1",
      action: "teamCollaboration",
      desc: "协作工作区",
    },
  ];

  const recentActivities = [
    {
      type: "user",
      title: "新用户注册",
      description: "用户张三完成了注册",
      time: "2分钟前",
      color: "#1890ff",
      avatar: "👤",
    },
    {
      type: "content",
      title: "文章发布",
      description: "新文章《系统更新指南》已发布",
      time: "5分钟前",
      color: "#52c41a",
      avatar: "📄",
    },
    {
      type: "system",
      title: "系统备份",
      description: "自动备份任务已完成",
      time: "15分钟前",
      color: "#faad14",
      avatar: "💾",
    },
    {
      type: "security",
      title: "安全扫描",
      description: "系统安全扫描完成，无异常",
      time: "1小时前",
      color: "#f5222d",
      avatar: "🔒",
    },
  ];

  const systemAlerts = [
    {
      type: "success",
      title: "系统运行正常",
      description: "所有服务运行稳定",
      time: "现在",
      icon: <CheckCircleOutlined />,
    },
    {
      type: "info",
      title: "定期维护提醒",
      description: "系统将于今晚2:00进行例行维护",
      time: "2小时后",
      icon: <ClockCircleOutlined />,
    },
    {
      type: "warning",
      title: "存储空间警告",
      description: "数据存储空间使用率已达85%",
      time: "30分钟前",
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <div className={styles.dashboard}>
      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card className={styles.statCard}>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={<span style={{ color: stat.color }}>{stat.icon}</span>}
                suffix={
                  <span
                    style={{
                      color:
                        stat.changeType === "increase" ? "#52c41a" : "#f5222d",
                      fontSize: "14px",
                    }}
                  >
                    {stat.changeType === "increase" ? (
                      <RiseOutlined />
                    ) : (
                      <FallOutlined />
                    )}
                    {stat.change}
                  </span>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* 系统能力监控 - 匹配首页核心功能 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {systemCapabilities.map((stat: any, index: number) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <Card className={styles.systemCard}>
              <div className={styles.systemStat}>
                <div
                  className={styles.systemIcon}
                  style={{ color: stat.color }}
                >
                  {stat.icon}
                </div>
                <div className={styles.systemInfo}>
                  <div className={styles.systemTitle}>{stat.title}</div>
                  <div className={styles.systemValue}>{stat.value}%</div>
                  <div
                    className={styles.systemStatus}
                    style={{ color: stat.color }}
                  >
                    {stat.status}
                  </div>
                  <div className={styles.systemDesc}>{stat.desc}</div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 快速操作 */}
      <Card className={styles.quickActionsCard} style={{ marginBottom: 24 }}>
        <div className={styles.quickActionsHeader}>
          <h3>快速操作</h3>
          <span>常用功能快捷入口</span>
        </div>
        <Row gutter={[16, 16]}>
          {quickActions.map((action, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <Button
                className={styles.quickActionBtn}
                style={{ borderColor: action.color }}
                onClick={() => console.log(`执行操作: ${action.action}`)}
              >
                <span style={{ color: action.color, marginRight: 8 }}>
                  {action.icon}
                </span>
                {action.title}
              </Button>
            </Col>
          ))}
        </Row>
      </Card>

      {/* 主要内容区域 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="系统使用情况" className={styles.chartCard}>
            <div style={{ marginBottom: 16 }}>
              <div className={styles.progressHeader}>
                <span>CPU使用率</span>
                <span>65%</span>
              </div>
              <Progress percent={65} status="active" strokeColor="#1890ff" />
            </div>
            <div style={{ marginBottom: 16 }}>
              <div className={styles.progressHeader}>
                <span>内存使用率</span>
                <span>78%</span>
              </div>
              <Progress percent={78} status="active" strokeColor="#52c41a" />
            </div>
            <div style={{ marginBottom: 16 }}>
              <div className={styles.progressHeader}>
                <span>磁盘使用率</span>
                <span>45%</span>
              </div>
              <Progress percent={45} status="active" strokeColor="#faad14" />
            </div>
            <div>
              <div className={styles.progressHeader}>
                <span>网络流量</span>
                <span>32%</span>
              </div>
              <Progress percent={32} status="active" strokeColor="#722ed1" />
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="最近活动" className={styles.chartCard}>
            <List
              dataSource={recentActivities}
              renderItem={(item) => (
                <List.Item className={styles.activityItem}>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        style={{ backgroundColor: item.color, color: "#fff" }}
                        size="small"
                      >
                        {item.avatar}
                      </Avatar>
                    }
                    title={
                      <div className={styles.activityTitle}>
                        {item.title}
                        <span className={styles.activityTime}>{item.time}</span>
                      </div>
                    }
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* 系统警报 */}
      <Card
        title="系统警报"
        className={styles.alertsCard}
        style={{ marginTop: 24 }}
      >
        <Timeline>
          {systemAlerts.map((alert, index) => (
            <Timeline.Item
              key={index}
              color={
                alert.type === "success"
                  ? "green"
                  : alert.type === "warning"
                  ? "orange"
                  : "blue"
              }
              dot={alert.icon}
            >
              <div className={styles.alertItem}>
                <div className={styles.alertTitle}>{alert.title}</div>
                <div className={styles.alertDescription}>
                  {alert.description}
                </div>
                <div className={styles.alertTime}>{alert.time}</div>
              </div>
            </Timeline.Item>
          ))}
        </Timeline>
      </Card>

      {/* 大屏数据展示 */}
      <LargeScreenDisplay />
    </div>
  );
}
