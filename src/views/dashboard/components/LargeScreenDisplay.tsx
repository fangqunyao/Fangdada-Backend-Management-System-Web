import React from "react";
import {
  Row,
  Col,
  Card,
  Button,
} from "antd";
import {
  FullscreenOutlined,
} from "@ant-design/icons";
import ReactECharts from "echarts-for-react";
import styles from "./LargeScreenDisplay.module.css";

const LargeScreenDisplay: React.FC = () => {
  // 大屏展示图表配置
  const lineChartOption = {
    title: {
      text: '用户增长趋势',
      left: 'center',
      textStyle: {
        color: 'var(--text-primary)',
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['活跃用户', '新增用户'],
      top: 30,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '活跃用户',
        type: 'line',
        stack: 'Total',
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        smooth: true,
        itemStyle: { color: '#1890ff' },
      },
      {
        name: '新增用户',
        type: 'line',
        stack: 'Total',
        data: [220, 182, 191, 234, 290, 330, 310],
        smooth: true,
        itemStyle: { color: '#52c41a' },
      },
    ],
  };

  const barChartOption = {
    title: {
      text: '各部门用户统计',
      left: 'center',
      textStyle: {
        color: 'var(--text-primary)',
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: ['技术部', '销售部', '市场部', '财务部', '人事部'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '用户数量',
        type: 'bar',
        data: [120, 200, 150, 80, 70],
        itemStyle: {
          color: function(params: any) {
            const colors = ['#1890ff', '#52c41a', '#faad14', '#f5222d', '#722ed1'];
            return colors[params.dataIndex];
          },
        },
      },
    ],
  };

  const pieChartOption = {
    title: {
      text: '用户角色分布',
      left: 'center',
      textStyle: {
        color: 'var(--text-primary)',
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: '用户角色',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: '管理员' },
          { value: 735, name: '普通用户' },
          { value: 580, name: '访客' },
          { value: 484, name: '开发者' },
          { value: 300, name: '测试员' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  const gaugeChartOption = {
    title: {
      text: '系统性能指标',
      left: 'center',
      textStyle: {
        color: 'var(--text-primary)',
        fontSize: 16,
      },
    },
    series: [
      {
        name: '系统性能',
        type: 'gauge',
        progress: {
          show: true,
        },
        detail: {
          valueAnimation: true,
          formatter: '{value}%',
        },
        data: [
          {
            value: 85,
            name: '性能评分',
          },
        ],
      },
    ],
  };

  const areaChartOption = {
    title: {
      text: '访问量统计',
      left: 'center',
      textStyle: {
        color: 'var(--text-primary)',
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {
      data: ['访问量', '页面浏览量'],
      top: 30,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: '访问量',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [120, 132, 101, 134, 90, 230, 210],
        smooth: true,
        itemStyle: { color: '#1890ff' },
      },
      {
        name: '页面浏览量',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [220, 182, 191, 234, 290, 330, 310],
        smooth: true,
        itemStyle: { color: '#52c41a' },
      },
    ],
  };

  const handleFullscreen = () => {
    console.log('全屏显示');
    // 可以在这里实现全屏功能
  };

  return (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>大屏数据展示</span>
          <Button
            type="text"
            icon={<FullscreenOutlined />}
            onClick={handleFullscreen}
            style={{ color: 'var(--text-secondary)' }}
          >
            全屏
          </Button>
        </div>
      }
      className={styles.largeScreenCard}
    >
      <Row gutter={[16, 16]}>
        {/* 用户增长趋势图 */}
        <Col xs={24} xl={12}>
          <Card className={styles.chartCard} style={{ height: '400px' }}>
            <ReactECharts
              option={lineChartOption}
              style={{ height: '350px', width: '100%' }}
              theme="light"
            />
          </Card>
        </Col>

        {/* 各部门用户统计图 */}
        <Col xs={24} xl={12}>
          <Card className={styles.chartCard} style={{ height: '400px' }}>
            <ReactECharts
              option={barChartOption}
              style={{ height: '350px', width: '100%' }}
              theme="light"
            />
          </Card>
        </Col>

        {/* 用户角色分布饼图 */}
        <Col xs={24} lg={12} xl={8}>
          <Card className={styles.chartCard} style={{ height: '350px' }}>
            <ReactECharts
              option={pieChartOption}
              style={{ height: '300px', width: '100%' }}
              theme="light"
            />
          </Card>
        </Col>

        {/* 系统性能仪表图 */}
        <Col xs={24} lg={12} xl={8}>
          <Card className={styles.chartCard} style={{ height: '350px' }}>
            <ReactECharts
              option={gaugeChartOption}
              style={{ height: '300px', width: '100%' }}
              theme="light"
            />
          </Card>
        </Col>

        {/* 访问量统计面积图 */}
        <Col xs={24} xl={8}>
          <Card className={styles.chartCard} style={{ height: '350px' }}>
            <ReactECharts
              option={areaChartOption}
              style={{ height: '300px', width: '100%' }}
              theme="light"
            />
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default LargeScreenDisplay;
