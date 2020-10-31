import PostLayout from '../layouts/Post/PostLayout';
import Editor from '../components/Editor';
import { useUser } from '../utils/auth/useUser';

const AskQuestion = () => {
  const { user, logout } = useUser();
  return (
    <>
      <PostLayout auth={user ? true : false} logOut={logout} authPage={false}>
        <Editor />
      </PostLayout>
    </>
  );
};

export default AskQuestion;
