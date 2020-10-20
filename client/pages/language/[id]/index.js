import { useRouter } from "next/router";
import { useUser } from "../../../utils/auth/useUser";
import { Layout, Main } from "../../../components";
import useSWR from "swr";

function Post() {
  const router = useRouter();
  const { user, logout } = useUser();
  const { id } = router.query;
  const { data } = useSWR(`/api/language/${id}`);
  if (!data) {
    return "Loading...";
  }
  if (!user) {
    return (
      <Layout user={user} auth={false} authPage={false}>
        <Main auth={false} data={data} />
      </Layout>
    );
  }

  return (
    <Layout user={user} auth={true} logOut={logout} authPage={false}>
      <Main auth={true} data={data} />
    </Layout>
  );
}

export default Post;
