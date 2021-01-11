import { useAuth } from '@nhost/react-auth';

import { ListPosts } from 'components/ListPosts';

export default function Home() {
  const { signedIn } = useAuth();

  return <div>{signedIn && <ListPosts />}</div>;
}
