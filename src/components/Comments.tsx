'use client'
import { useState } from 'react';
import './Comments.css';
import { Button, Form } from 'react-bootstrap';

interface Comment {
  id: number;
  user: string;
  content: string;
  likes: number;
  replies: Comment[];
  timestamp: string;
}

const CommentComponent = ({ comment, level = 0 }: { comment: Comment; level?: number }) => {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState('');
  
  return (
    <div className={`ms-${level * 4}`}>
      <div className="rounded-circle bg-secondary comment-avatar"></div>
      <div className="rounded-circle bg-secondary" style={{ width: 32, height: 32 }}></div>
      <div className="flex-grow-1">
        <div className="d-flex justify-content-between">
          <strong className="text-light">{comment.user}</strong>
          <small className="text-muted">{comment.timestamp}</small>
        </div>
        <p className="text-light mb-1">{comment.content}</p>
        <div className="d-flex gap-3">
          <Button variant="link" className="text-muted p-0">
            <span className="material-symbols-outlined">thumb_up</span> {comment.likes}
          </Button>
          <Button variant="link" className="text-muted p-0" onClick={() => setShowReply(!showReply)}>
            Reply
          </Button>
        </div>

        {showReply && (
          <Form className="mt-2">
            <Form.Control
              type="text"
              placeholder="Write a reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="bg-dark text-light border-secondary"
            />
            <div className="d-flex justify-content-end gap-2 mt-2">
              <Button variant="outline-secondary" size="sm" onClick={() => setShowReply(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm">Reply</Button>
            </div>
          </Form>
        )}
      </div>
      <div>
        {comment.replies?.map(reply => (
          <CommentComponent key={reply.id} comment={reply} level={level + 1} />
        ))}
      </div>
    </div>
  );
};

export default CommentComponent;
