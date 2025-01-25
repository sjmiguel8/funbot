'use client';
import { useState, useEffect } from 'react';
import { PostsService, Post } from '../../services/posts.service';
import CreatePost from '../../components/CreatePost';
import { Card, Button } from 'react-bootstrap';
import { useAuthenticator } from '@aws-amplify/ui-react';

export default function ProfilePage() {
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, authStatus } = useAuthenticator();

  useEffect(() => {
    let mounted = true;

    async function fetchPosts() {
      if (authStatus === 'authenticated' && user) {
        try {
          setLoading(true);
          setError(null);
          const posts = await PostsService.getPosts();
          if (mounted) {
            const userPosts = posts.filter((post: Post) => post.authorId === user.userId);
            setUserPosts(userPosts);
          }
        } catch (err) {
          if (mounted) {
            console.error('Failed to load posts:', err);
            setError('Failed to load posts. Please try again.');
          }
        } finally {
          if (mounted) {
            setLoading(false);
          }
        }
      } else if (authStatus !== 'configuring') {
        setLoading(false);
      }
    }

    fetchPosts();
    return () => { mounted = false; };
  }, [user, authStatus]);

  const loadUserPosts = async (userId: string) => {
    try {
      setLoading(true);
      setError(null);
      const posts = await PostsService.getPosts();
      const userPosts = posts.filter((post: Post) => post.authorId === userId);
      setUserPosts(userPosts);
    } catch (err) {
      console.error('Failed to load posts:', err);
      setError('Failed to load posts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-light">Loading profile...</div>;
  if (authStatus !== 'authenticated' || !user) {
    return <div className="text-light">Please sign in to view your profile</div>;
  }
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div className="container-fluid py-4">
      <Card bg="dark" text="light" className="mb-4">
        <Card.Body>
          <h1 className="h3 mb-2">Your Profile</h1>
          <p className="text-muted">{user.username}</p>
        </Card.Body>
      </Card>

      <Card bg="dark" text="light" className="mb-4">
        <Card.Body>
          <h2 className="h4 mb-3">Create New Post</h2>
          <CreatePost onPostCreated={() => loadUserPosts(user.userId)} />
        </Card.Body>
      </Card>

      <Card bg="dark" text="light">
        <Card.Body>
          <h2 className="h4 mb-3">Your Posts</h2>
          {userPosts.length === 0 ? (
            <p className="text-muted">You haven&apos;t created any posts yet.</p>
          ) : (
            <div className="d-flex flex-column gap-3">
              {userPosts.map(post => (
                <Card key={post.id} bg="dark" border="secondary">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <small className="text-muted">
                        {new Date(post.timestamp).toLocaleString()}
                      </small>
                      <div>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                          onClick={() => {
                            // Edit functionality to be implemented
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={async () => {
                            try {
                              await PostsService.deletePost(post.id);
                              loadUserPosts(user.userId);
                            } catch (err) {
                              console.error('Failed to delete post:', err);
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                    <p>{post.content}</p>
                    <div className="d-flex gap-3 text-muted">
                      <small>{post.likes} likes</small>
                      <small>{post.comments} comments</small>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
