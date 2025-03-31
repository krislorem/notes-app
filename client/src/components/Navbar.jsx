import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu, Typography, Avatar, Space, Button, Modal } from 'antd';
import { useStore } from '@/store/userStore';

const { Header } = Layout;
const { Text } = Typography;

const Navbar = () => {
  const { user, logout } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    Modal.confirm({
      title: '确定退出',
      content: '确认退出登录吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        logout();
        navigate('/login');
      },
    });
  };

  const selectedKeys = React.useMemo(() => {
    switch (location.pathname) {
      case '/':
        return ['home'];
      case '/notes':
        return ['notes'];
      case '/categories':
        return ['categories'];
      default:
        return [];
    }
  }, []);

  return (
    <Header className="bg-gradient-to-r from-blue-400 to-blue-600 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={selectedKeys}
            className="flex-1 border-0"
            items={[
              {
                key: 'home',
                label: (
                  <span className="hover:text-blue-100 transition-colors duration-300">
                    首页
                  </span>
                ),
                onClick: () => navigate('/'),
              },
              {
                key: 'notes',
                label: (
                  <span className="hover:text-blue-100 transition-colors duration-300">
                    笔记
                  </span>
                ),
                onClick: () => navigate('/notes'),
              },
              {
                key: 'categories',
                label: (
                  <span className="hover:text-blue-100 transition-colors duration-300">
                    分类
                  </span>
                ),
                onClick: () => navigate('/categories'),
              },
            ]}
          />

          <Space className="ml-4">
            {user ? (
              <>
                <Space align="center" className="hover:bg-blue-500 px-3 py-1 rounded-md transition-colors duration-300 cursor-pointer">
                  <Avatar src={user.avatar_url} className="border-2 border-white" />
                  <Text className="text-white font-medium">{user.username}</Text>
                </Space>
                <Button
                  type="primary"
                  onClick={handleLogout}
                  className="hover:bg-red-400 transition-colors duration-300"
                >
                  退出
                </Button>
              </>
            ) : (
              <Button
                type="primary"
                onClick={() => navigate('/login')}
                className="hover:bg-blue-400 transition-colors duration-300"
              >
                登录
              </Button>
            )}
          </Space>
        </div>
      </div>
    </Header>
  );
};

export default Navbar;
