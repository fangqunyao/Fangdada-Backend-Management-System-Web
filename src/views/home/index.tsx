import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Statistic, Avatar, List } from "antd";
import {
  RocketOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  BarChartOutlined,
  GlobalOutlined,
  SettingOutlined,
  CheckCircleOutlined,
  ArrowRightOutlined,
  StarOutlined
} from "@ant-design/icons";
import styles from "./index.module.css";

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: any) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const features = [
    {
      icon: <RocketOutlined />,
      title: "高效性能",
      description: "采用最新的技术栈，提供卓越的系统性能和用户体验",
      color: "#1890ff"
    },
    {
      icon: <SafetyCertificateOutlined />,
      title: "安全可靠",
      description: "多层安全防护，确保您的数据安全和系统稳定运行",
      color: "#52c41a"
    },
    {
      icon: <TeamOutlined />,
      title: "团队协作",
      description: "强大的团队协作功能，提升工作效率和沟通质量",
      color: "#faad14"
    },
    {
      icon: <BarChartOutlined />,
      title: "数据分析",
      description: "智能数据分析工具，帮助您做出明智的业务决策",
      color: "#f5222d"
    },
    {
      icon: <GlobalOutlined />,
      title: "全球化",
      description: "支持多语言和国际化，满足全球用户的需求",
      color: "#722ed1"
    },
    {
      icon: <SettingOutlined />,
      title: "灵活配置",
      description: "高度可定制化的系统配置，满足不同场景的需求",
      color: "#13c2c2"
    }
  ];

  const stats = [
    { value: 10000, label: "活跃用户", suffix: "+" },
    { value: 500, label: "企业客户", suffix: "+" },
    { value: 99.9, label: "服务可用性", suffix: "%" },
    { value: 24, label: "技术支持", suffix: "/7" }
  ];

  const testimonials = [
    {
      name: "张经理",
      company: "ABC科技有限公司",
      content: "这个平台大大提升了我们的工作效率，界面简洁易用，功能强大。",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
      rating: 5
    },
    {
      name: "李总监",
      company: "XYZ创新有限公司",
      content: "安全可靠的技术支持，让我们能够专注于业务发展。",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
      rating: 5
    },
    {
      name: "王主管",
      company: "DEF集团",
      content: "出色的用户体验和强大的功能，完全超出我们的预期。",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
      rating: 5
    }
  ];

  return (
    <div className={styles.homeContainer}>
      {/* Hero Section */}
      <section id="home" className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>方大大中台管理系统</h1>
          <p>智能化 · 高效化 · 安全化</p>
          <p className={styles.heroSubtitle}>
            为企业提供一站式数字化解决方案，助力业务创新与发展
          </p>
          <div className={styles.heroButtons}>
            <Button
              type="primary"
              size="large"
              icon={<RocketOutlined />}
              onClick={() => scrollToSection("features")}
              className={styles.heroBtnPrimary}
            >
              开始使用
            </Button>
            <Button
              size="large"
              icon={<GlobalOutlined />}
              onClick={() => scrollToSection("about")}
              className={styles.heroBtnSecondary}
            >
              了解详情
            </Button>
          </div>
        </div>
        <div className={styles.heroImage}>
          <div className={styles.heroDashboardPreview}>
            <div className={styles.previewHeader}>
              <div className={styles.previewDots}>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className={styles.previewTitle}>系统仪表盘</span>
            </div>
            <div className={styles.previewContent}>
              <div className={styles.previewStats}>
                <div className={styles.statItem}>
                  <div className={styles.statNumber}>1,234</div>
                  <div className={styles.statLabel}>用户数量</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statNumber}>567</div>
                  <div className={styles.statLabel}>活跃项目</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statNumber}>89%</div>
                  <div className={styles.statLabel}>系统负载</div>
                </div>
              </div>
              <div className={styles.previewChart}>
                <div className={styles.chartBar} style={{ height: '60%' }}></div>
                <div className={styles.chartBar} style={{ height: '80%' }}></div>
                <div className={styles.chartBar} style={{ height: '40%' }}></div>
                <div className={styles.chartBar} style={{ height: '90%' }}></div>
                <div className={styles.chartBar} style={{ height: '70%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className={styles.statsSection}>
        <div className={styles.container}>
          <Row gutter={[32, 32]}>
            {stats.map((stat, index) => (
              <Col xs={24} sm={12} md={6} key={index}>
                <div className={styles.statCard}>
                  <Statistic
                    value={stat.value}
                    suffix={stat.suffix}
                    title={stat.label}
                    valueStyle={{ color: '#1890ff', fontSize: '36px', fontWeight: 'bold' }}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={styles.featuresSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>核心功能</h2>
            <p>强大的功能特性，满足您的各种业务需求</p>
          </div>
          <Row gutter={[32, 32]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} md={8} key={index}>
                <Card className={styles.featureCard} hoverable>
                  <div className={styles.featureIcon} style={{ color: feature.color }}>
                    {feature.icon}
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={styles.aboutSection}>
        <div className={styles.container}>
          <Row gutter={[64, 64]} align="middle">
            <Col xs={24} md={12}>
              <div className={styles.aboutContent}>
                <h2>关于我们</h2>
                <p>
                  方大大中台管理系统是基于现代技术栈构建的企业级管理平台，
                  致力于为企业提供高效、安全、易用的数字化解决方案。
                </p>
                <p>
                  我们拥有一支经验丰富的开发团队，专注于技术创新和服务品质，
                  为各类企业提供定制化的管理系统解决方案。
                </p>
                <div className={styles.aboutFeatures}>
                  <div className={styles.aboutFeature}>
                    <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                    <span>现代化技术栈</span>
                  </div>
                  <div className={styles.aboutFeature}>
                    <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                    <span>高可用架构设计</span>
                  </div>
                  <div className={styles.aboutFeature}>
                    <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                    <span>专业技术支持</span>
                  </div>
                  <div className={styles.aboutFeature}>
                    <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                    <span>持续功能更新</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className={styles.aboutImage}>
                <div className={styles.imagePlaceholder}>
                  <TeamOutlined style={{ fontSize: '64px', color: '#d9d9d9' }} />
                  <p>我们的团队</p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonialsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>客户评价</h2>
            <p>听听我们的客户怎么说</p>
          </div>
          <Row gutter={[32, 32]}>
            {testimonials.map((testimonial, index) => (
              <Col xs={24} md={8} key={index}>
                <Card className={styles.testimonialCard}>
                  <div className={styles.testimonialRating}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarOutlined key={i} style={{ color: '#faad14' }} />
                    ))}
                  </div>
                  <p className={styles.testimonialContent}>"{testimonial.content}"</p>
                  <div className={styles.testimonialAuthor}>
                    <Avatar src={testimonial.avatar} size="large" />
                    <div className={styles.authorInfo}>
                      <div className={styles.authorName}>{testimonial.name}</div>
                      <div className={styles.authorCompany}>{testimonial.company}</div>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2>准备开始您的数字化之旅？</h2>
            <p>立即体验方大大中台管理系统，开启高效管理新时代</p>
            <Button
              type="primary"
              size="large"
              icon={<ArrowRightOutlined />}
              className={styles.ctaButton}
            >
              免费试用
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
