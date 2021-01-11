import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import { Layout, Main } from 'components/Layout';

const INSERT_POST = gql`
  mutation insertPost($post: posts_insert_input!) {
    insert_posts(objects: [$post]) {
      affected_rows
    }
  }
`;

export default function New() {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  const [createPost] = useMutation(INSERT_POST);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createPost({
        variables: {
          post: {
            title,
            description,
          },
        },
      });
    } catch (error) {
      console.log('insert post failed');
      return console.error(error);
    }
    console.log('post created');
    // redirect to post
  }

  return (
    <Layout>
      <Main>
        <form onSubmit={(e) => handleSubmit(e)}>
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
              Create Post
            </button>
          </div>
        </form>
      </Main>
    </Layout>
  );
}
