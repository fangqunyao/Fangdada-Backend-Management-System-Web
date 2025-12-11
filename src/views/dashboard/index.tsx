import React from 'react';
import { Row, Col, Card, Statistic, Progress, Button, List, Avatar, Badge, Timeline } from 'antd';
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
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import styles from './index.module.css';

export default function Dashboard() {
  // 模拟数据
  const stats = [
    {
      title: '总用户数',
      value: 1234,
      icon: <UserOutlined />,
      color: '#1890ff',
      change: '+12%',
      changeType: 'increase'
    },
    {
      title: '活跃用户',
      value: 892,
      icon: <TeamOutlined />,
      color: '#52c41a',
      change: '+8%',
      changeType: 'increase'
    },
    {
      title: '文章总数',
      value: 567,
      icon: <FileTextOutlined />,
      color: '#faad14',
      change: '+15%',
      changeType: 'increase'
    },
    {
      title: '系统配置',
      value: 89,
      icon: <SettingOutlined />,
      color: '#f5222d',
      change: '-2%',
      changeType: 'decrease'
    }
  ];

  const systemStats = [
    {
      title: '数据库连接',
      value: 98,
      icon: <DatabaseOutlined />,
      color: '#722ed1',
      status: '正常'
    },
    {
      title: 'API响应',
      value: 95,
      icon: <CloudOutlined />,
      color: '#13c2c2',
      status: '良好'
    },
    {
      title: '安全状态',
      value: 100,
      icon: <SafetyCertificateOutlined />,
      color: '#52c41a',
      status: '安全'
    },
    {
      title: '性能监控',
      value: 87,
      icon: <BarChartOutlined />,
      color: '#fa8c16',
      status: '良好'
    }
  ];

  const quickActions = [
    { title: '新增用户', icon: <PlusOutlined />, color: '#1890ff', action: 'addUser' },
    { title: '发布文章', icon: <FileTextOutlined />, color: '#52c41a', action: 'addPost' },
    { title: '查看日志', icon: <EyeOutlined />, color: '#faad14', action: 'viewLogs' },
    { title: '系统设置', icon: <SettingOutlined />, color: '#f5222d', action: 'settings' }
  ];

  const recentActivities = [
    {
      type: 'user',
      title: '新用户注册',
      description: '用户张三完成了注册',
      time: '2分钟前',
      color: '#1890ff',
      avatar: '👤'
    },
    {
      type: 'content',
      title: '文章发布',
      description: '新文章《系统更新指南》已发布',
      time: '5分钟前',
      color: '#52c41a',
      avatar: '📄'
    },
    {
      type: 'system',
      title: '系统备份',
      description: '自动备份任务已完成',
      time: '15分钟前',
      color: '#faad14',
      avatar: '💾'
    },
    {
      type: 'security',
      title: '安全扫描',
      description: '系统安全扫描完成，无异常',
      time: '1小时前',
      color: '#f5222d',
      avatar: '🔒'
    }
  ];

  const systemAlerts = [
    {
      type: 'success',
      title: '系统运行正常',
      description: '所有服务运行稳定',
      time: '现在',
      icon: <CheckCircleOutlined />
    },
    {
      type: 'info',
      title: '定期维护提醒',
      description: '系统将于今晚2:00进行例行维护',
      time: '2小时后',
      icon: <ClockCircleOutlined />
    },
    {
      type: 'warning',
      title: '存储空间警告',
      description: '数据存储空间使用率已达85%',
      time: '30分钟前',
      icon: <ExclamationCircleOutlined />
    }
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
                  <span style={{
                    color: stat.changeType === 'increase' ? '#52c41a' : '#f5222d',
                    fontSize: '14px'
                  }}>
                    {stat.changeType === 'increase' ? <RiseOutlined /> : <FallOutlined />}
                    {stat.change}
                  </span>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* 系统状态监控 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {systemStats.map((stat, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card className={styles.systemCard}>
              <div className={styles.systemStat}>
                <div className={styles.systemIcon} style={{ color: stat.color }}>
                  {stat.icon}
                </div>
                <div className={styles.systemInfo}>
                  <div className={styles.systemTitle}>{stat.title}</div>
                  <div className={styles.systemValue}>{stat.value}%</div>
                  <div className={styles.systemStatus} style={{ color: stat.color }}>
                    {stat.status}
                  </div>
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
                <span style={{ color: action.color, marginRight: 8 }}>{action.icon}</span>
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
                        style={{ backgroundColor: item.color, color: '#fff' }}
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
      <Card title="系统警报" className={styles.alertsCard} style={{ marginTop: 24 }}>
        <Timeline>
          {systemAlerts.map((alert, index) => (
            <Timeline.Item
              key={index}
              color={alert.type === 'success' ? 'green' : alert.type === 'warning' ? 'orange' : 'blue'}
              dot={alert.icon}
            >
              <div className={styles.alertItem}>
                <div className={styles.alertTitle}>{alert.title}</div>
                <div className={styles.alertDescription}>{alert.description}</div>
                <div className={styles.alertTime}>{alert.time}</div>
              </div>
            </Timeline.Item>
          ))}
        </Timeline>
      </Card>
    </div>
  );
}
