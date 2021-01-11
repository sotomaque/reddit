import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

import { Layout, Main } from 'components/Layout';

const GET_POST = gql`
  query getPost($post_id: uuid!) {
    post: posts_by_pk(id: $post_id) {
      id
      title
      description
    }
  }
`;

const UPDATE_POST = gql`
  mutation updatePost($post_id: uuid!, $post: posts_set_input!) {
    update_posts_by_pk(pk_columns: { id: $post_id }, _set: $post) {
      id
      title
      description
    }
  }
`;

function EditPost({ post }) {
  const [title, setTitle] = React.useState(post.title);
  const [description, setDescription] = React.useState(post.description);
  const router = useRouter();
  const [updatePost] = useMutation(UPDATE_POST, {
    variables: {
      post_id: post.id,
    },
  });

  async function handleSubmit(e) {
    e.preventDefault();
    console.log('edit pressed');
    try {
      await updatePost({
        variables: {
          post_id: post.id,
          post: {
            title,
            description,
          },
        },
      });
    } catch (error) {
      console.log('failed to edit post');
      console.error(error);
    }
    router.push('/');
  }

  return (
    <Layout>
      <Main>
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="py-2">
            <input
              type="text"
              className="border rounded px-2 py-1 my-2 w-full"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {/* Description */}
          <div className="py-2">
            <textarea
              type="text"
              className="border rounded px-2 py-1 my-2 w-full"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <button className="inline bg-indigo-700 text-white uppercase px-4 py-2">
              Edit Post
            </button>
          </div>
        </form>
      </Main>
    </Layout>
  );
}

export default function Edit() {
  const router = useRouter();
  const { slug } = router.query;

  const { loading, error, data } = useQuery(GET_POST, {
    variables: {
      post_id: slug,
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log('Error fetching post', error);
    return <div>Error</div>;
  }
  const { post = {} } = data;
  return <EditPost post={post} />;
}
