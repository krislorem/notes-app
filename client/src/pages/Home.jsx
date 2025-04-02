import { Layout, Typography, Card, Row, Col, Space } from 'antd';
import { lazy, Suspense } from 'react';
import { useStore } from '@/store/userStore';
import { useNavigate } from 'react-router-dom';
const Navbar = lazy(() => import('@/components/Navbar'));

const { Content } = Layout;
const { Title, Text } = Typography;

const Home = () => {
  const { user } = useStore();
  const navigate = useNavigate();

  return (
    <Layout className="min-h-screen bg-gray-50">
      <Suspense fallback={<div>加载中...</div>}>
        <Navbar />
      </Suspense>
      <Content className="p-8">
        <div className="max-w-6xl mx-auto">
          {user ? (
            <Space direction="vertical" size="large" className="w-full">
              <Title level={2} className="text-gray-800">
                欢迎回来, {user.nickname || user.username}
              </Title>
              <Text type="secondary" className="text-lg">
                今天有什么计划吗？
              </Text>

              <Row gutter={[24, 24]} className="mt-8">
                <Col xs={24} sm={12} md={8} lg={6}>
                  <Card
                    hoverable
                    className="shadow-md hover:shadow-lg transition-all duration-300"
                    onClick={() => navigate('/notes')}
                  >
                    <Title level={4} className="text-gray-700">我的笔记</Title>
                    <Text type="secondary">查看和管理所有笔记</Text>
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                  <Card
                    hoverable
                    className="shadow-md hover:shadow-lg transition-all duration-300"
                    onClick={() => navigate('/create-note')}
                  >
                    <Title level={4} className="text-gray-700">新建笔记</Title>
                    <Text type="secondary">记录新的想法和灵感</Text>
                  </Card>
                </Col>
              </Row>
            </Space>
          ) : (
            <Space direction="vertical" size="large" className="w-full">
              <Title level={2} className="text-gray-800">欢迎来到笔记应用</Title>
              <Text type="secondary" className="text-lg">
                一个简单高效的笔记管理工具
              </Text>

              <Row gutter={[24, 24]} className="mt-8">
                <Col xs={24} sm={12} md={8} lg={6}>
                  <Card
                    hoverable
                    className="shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <Title level={4} className="text-gray-700">简单易用</Title>
                    <Text type="secondary">直观的界面设计</Text>
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                  <Card
                    hoverable
                    className="shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <Title level={4} className="text-gray-700">随时记录</Title>
                    <Text type="secondary">捕捉每一个灵感瞬间</Text>
                  </Card>
                </Col>
              </Row>
            </Space>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default Home;
