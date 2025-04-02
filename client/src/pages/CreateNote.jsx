import { useState, useEffect } from 'react';
import { createNote } from '@/api/noteApi';
import { getCategories } from '@/api/categoryApi';
import { useStore } from '@/store/userStore';
import { useNavigate } from 'react-router-dom';
import { message, Button, Card } from 'antd';
import Navbar from '@/components/Navbar';
import NoteForm from '@/components/NoteForm';

const CreateNote = () => {
  const navigate = useNavigate();
  const { user } = useStore();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        message.error('获取分类失败');
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const noteData = {
        ...values,
        userId: user.id,
      };
      await createNote(noteData);
      message.success('笔记创建成功');
      navigate('/notes');
    } catch (error) {
      console.error('Failed to create note:', error);
      message.error('创建笔记失败');
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-4">
        <Button
          type="primary"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          返回
        </Button>
        <Card className="shadow">
          <div className="p-4">
            <h1 className="text-lg font-semibold mb-4">创建笔记</h1>
            <NoteForm
              categories={categories}
              onSubmit={handleSubmit}
              submitButtonText="创建笔记"
              loading={loading}
            />
          </div>
        </Card>
      </div>
    </>
  );
};

export default CreateNote;
