import gql from 'graphql-tag';
import { useSubscription } from '@apollo/client';

import { PostListed } from './PostListed';
import { useAuth } from '@nhost/react-auth';

const S_GET_POSTS = gql`
  subscription getPosts {
    posts {
      id
      title
      description
      user_id
    }
  }
`;

export function ListPosts() {
  const { signedIn } = useAuth();
  const { loading, error, data } = useSubscription(S_GET_POSTS);

  if (loading && !data) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log('error loading posts');
    console.error(error);
    return <div>Error...</div>;
  }

  const { posts } = data;

  return (
    <div className="my-8">
      {posts.map((post) => {
        return <PostListed key={post.id} post={post} signedIn={signedIn} />;
      })}
    </div>
  );
}
