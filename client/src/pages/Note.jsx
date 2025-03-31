import React, { useState, useEffect } from 'react';
import { Card, Descriptions, Tag, Button } from 'antd';
import { getNote } from '@/api/noteApi';
import { useStore } from '@/store/userStore';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Previewer from '@/components/Previewer';
const Note = () => {
  const { user } = useStore();
  const navigate = useNavigate();
  const { id } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    if (!user) navigate('/login');
  }, [navigate, user]);

  useEffect(() => {
    const fetchNoteDetails = async () => {
      try {
        const fetchedNote = await getNote(id);
        setNote(fetchedNote.data);
      } catch (error) {
        console.error('Failed to fetch note details:', error);
        alert('获取笔记详情失败');
        navigate('/notes');
      }
    };

    fetchNoteDetails();
  }, [id, navigate]);

  if (!note) return <div>Loading...</div>;

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
        <Card className="note-card" hoverable>
          <Previewer
            value={note.content}
            style={{ border: 'none' }}
          />
          <div className="my-4">
            {note.tags.map((tag) => (
              <Tag color="cyan" key={tag}>
                {tag}
              </Tag>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
};

export default Note;
