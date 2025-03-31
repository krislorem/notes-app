import React, { useState, useEffect } from 'react';
import { List, Card, Tag } from 'antd';
import { getNotesByCategory } from '@/api/noteApi';
import { useStore } from '@/store/userStore';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from 'antd';
const CategoryNotes = () => {
  const { user } = useStore();
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (!user) navigate('/login');
  }, [navigate]);

  useEffect(() => {
    const fetchNotesByCategory = async () => {
      try {
        const fetchedNotes = await getNotesByCategory(user.id, categoryId);
        setNotes(fetchedNotes.data);
      } catch (error) {
        console.error('Failed to fetch notes by category:', error);
        alert('获取笔记失败');
      }
    };

    fetchNotesByCategory();
  }, [categoryId]);

  if (!notes) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="p-6">
        <Button
          type="primary"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          返回
        </Button>
        <h1 className="text-2xl font-bold mb-6 text-gray-800">分类笔记列表</h1>
        <List
          grid={{ gutter: 24, xs: 1, sm: 2, md: 3, lg: 4 }}
          dataSource={notes}
          renderItem={(item) => (
            <Card
              className="shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1"
              cover={item.coverImage && (
                <div className="h-48 overflow-hidden">
                  <img
                    alt={item.title}
                    src={item.coverImage}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            >
              <Card.Meta
                title={<span className="text-lg font-medium text-gray-800">{item.title}</span>}
                description={<p className="text-gray-500 mt-2">{item.content.substring(0, 60) + '...'}</p>}
                className="p-4"
              />
              {item.tags && item.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2 px-4 pb-4">
                  {item.tags.map((tag) => (
                    <Tag
                      color="#1890ff"
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full border-0"
                    >
                      {tag}
                    </Tag>
                  ))}
                </div>
              )}
              <div className="mt-4 px-4 pb-4">
                <a
                  href={`/notes/${item.id}`}
                  className="text-blue-500 hover:text-blue-700 font-medium text-sm"
                >
                  查看详情 →
                </a>
              </div>
            </Card>
          )}
        />
      </div>
    </>
  );
};

export default CategoryNotes;
