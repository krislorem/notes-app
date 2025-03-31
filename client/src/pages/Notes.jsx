import { useEffect, useState } from 'react';
import { List, Card, Tag, Button, Modal, message } from 'antd';
import { getNotes, deleteNote } from '@/api/noteApi';
import { useStore } from '@/store/userStore';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const Notes = () => {
  const navigate = useNavigate();
  const { user } = useStore();
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  useEffect(() => {
    if (!user) navigate('/login');
  }, [navigate]);

  const fetchNotes = async () => {
    try {
      const fetchNotesData = await getNotes(user.id);
      setNotes(fetchNotesData.data);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
      alert('获取笔记失败');
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex justify-between items-center p-6 bg-white rounded-lg shadow-sm mb-6">
        <h1 className="text-2xl font-bold text-gray-800">笔记列表</h1>
        <Button type="primary" onClick={() => navigate('/create-note')}>
          创建笔记
        </Button>
      </div>
      <List
        grid={{ gutter: 24, xs: 1, sm: 2, md: 3, lg: 4 }}
        dataSource={notes}
        className="p-6"
        renderItem={(item) => (
          <Card
            className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 m-4 rounded-lg overflow-hidden"
            hoverable
            cover={item.coverImage && (
              <div className="h-48 overflow-hidden">
                <img
                  alt={item.title}
                  src={item.coverImage}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
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
            <div className="flex justify-between px-4 pb-4">
              <a
                href={`/notes/${item.id}`}
                className="text-blue-500 hover:text-blue-700 font-medium text-sm"
              >
                查看详情
              </a>
              <div className="space-x-2">
                <Button
                  type="primary"
                  size="small"
                  onClick={() => navigate(`/notes/edit/${item.id}`)}
                >
                  编辑
                </Button>
                <Button
                  type="primary"
                  size="small"
                  danger
                  onClick={(e) => {
                    setModalVisible(true);
                    setSelectedNoteId(item.id);
                  }}
                >
                  删除
                </Button>
              </div>
            </div>
          </Card>
        )}
      />
      <Modal
        title="确认删除"
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setSelectedNoteId(null);
        }}
        onOk={async () => {
          try {
            await deleteNote(selectedNoteId);
            message.success('笔记删除成功');
            fetchNotes();
          } catch (error) {
            console.error('Failed to delete note:', error);
            message.error('删除笔记失败');
          } finally {
            setModalVisible(false);
            setSelectedNoteId(null);
          }
        }}
      >
        <p>确定要删除这条笔记吗？此操作不可恢复。</p>
      </Modal>
    </>
  );
};

export default Notes;
