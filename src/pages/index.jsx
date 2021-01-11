import { useAuth } from '@nhost/react-auth';

import { Layout, Main } from 'components/Layout';
import { ListPosts } from 'components/ListPosts';

export default function Home() {
  const { signedIn } = useAuth();

  return (
    <Layout>
      <Main>{signedIn && <ListPosts />}</Main>
    </Layout>
  );
}
