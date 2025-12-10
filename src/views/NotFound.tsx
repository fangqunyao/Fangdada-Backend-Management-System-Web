import React from 'react';

const NotFound: React.FC = () => (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: 'sans-serif',
        background: '#f8f9fa'
    }}>
        <h1 style={{ fontSize: '6rem', margin: 0, color: '#adb5bd' }}>404</h1>
        <h2 style={{ color: '#495057' }}>页面未找到</h2>
        <p style={{ color: '#868e96' }}>抱歉，您访问的页面不存在。</p>
        <a href="/" style={{
            marginTop: '1rem',
            color: '#1976d2',
            textDecoration: 'none',
            fontWeight: 'bold'
        }}>
            返回首页
        </a>
    </div>
);

export default NotFound;