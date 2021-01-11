import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

import { Layout, Main } from 'components/Layout';

const GET_POSTS = gql`
  query getPosts {
    posts {
      id
      title
      description
    }
  }
`;

export function ListPosts() {
  const { loading, error, data } = useQuery(GET_POSTS);

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
    <Layout>
      <Main>
        {posts.map((post) => {
          console.log('post:', post);
          return <div key={post.id}>{post.title}</div>;
        })}
      </Main>
    </Layout>
  );
}
