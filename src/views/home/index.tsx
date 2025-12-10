import { useState, useEffect } from "react";
import "./index.less";

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

  return (
    <div className="home-container">
      <section id="home" className="hero-section">
        <div className="hero-content">
          <h1>欢迎来到我们的平台</h1>
          <p>发现创新解决方案，提升您的业务体验</p>
          <div className="hero-buttons">
            <button
              className="btn primary"
              onClick={() => scrollToSection("features")}
            >
              了解更多
            </button>
            <button
              className="btn secondary"
              onClick={() => scrollToSection("contact")}
            >
              联系我们
            </button>
          </div>
        </div>
        <div className="hero-image">
          <div className="placeholder-image">
            <span>图片展示区域</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
