import React from 'react';

import { SvgEdit, SvgDelete, SvgArrowUp, SvgArrowDown } from 'components/svg';
import { auth } from 'utils/nhost';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const DELETE_POST = gql`
  mutation deletePost($post_id: uuid!) {
    delete_posts_by_pk(id: $post_id) {
      id
    }
  }
`;

const UPSERT_POST_VOTE = gql`
  mutation upsertPostVote($post_vote: post_votes_insert_input!) {
    insert_post_votes_one(
      object: $post_vote
      on_conflict: {
        constraint: post_votes_post_id_user_id_key
        update_columns: vote_type
      }
    ) {
      id
    }
  }
`;

export function PostListed({ post = {}, signedIn }) {
  const [deletePost] = useMutation(DELETE_POST, {
    variables: {
      post_id: post.id,
    },
  });
  const [upsertPostVote] = useMutation(UPSERT_POST_VOTE);

  async function handleVote({ vote_type }) {
    try {
      await upsertPostVote({
        variables: {
          post_vote: {
            post_id: post.id,
            vote_type,
          },
        },
      });
    } catch (error) {
      console.error('error upvoting', error);
    }
  }

  const hasUpvotedPost = post.post_votes.filter(
    (like) =>
      like.user.id === auth.getClaim('x-hasura-user-id') && like.vote_type === 1
  );
  const hasDownvotedPost = post.post_votes.filter(
    (like) =>
      like.user.id === auth.getClaim('x-hasura-user-id') &&
      like.vote_type === -1
  );

  return (
    <div className="flex shadow-md p-6">
      <div className="flex flex-col items-center">
        {/* UPVOTE */}
        <div
          onClick={() => handleVote({ vote_type: 1 })}
          className={`cursor-pointer ${
            hasUpvotedPost.length
              ? 'bg-green-700 text-white'
              : 'hover:bg-green-700  hover:text-white'
          } rounded-full p-2`}
        >
          <SvgArrowUp className="w-6 h-6" />
        </div>
        {/* COUNT */}
        <div className="py-4">
          {post.post_votes_aggregate.aggregate.sum.vote_type
            ? post.post_votes_aggregate.aggregate.sum.vote_type
            : 0}
        </div>
        {/* DOWNVOTE */}
        <div
          onClick={() => handleVote({ vote_type: -1 })}
          className={`cursor-pointer ${
            hasDownvotedPost.length
              ? 'bg-red-700 text-white'
              : 'hover:bg-red-700  hover:text-white'
          } rounded-full p-2`}
        >
          <SvgArrowDown className="w-6 h-6" />
        </div>
      </div>
      <div className="pl-6">
        <div className="text-3xl font-semibold">{post?.title}</div>
        <div className="text-sm py-2 font-light">
          Created By: {post?.user.display_name}
        </div>
        <div className="text-gray-800 py-4">{post?.description}</div>
        {signedIn && post.user_id === auth.getClaim('x-hasura-user-id') && (
          <div className="flex items-center">
            {/* Edit */}
            <div>
              <Link href={`/post/${post.id}/edit`}>
                <a>
                  <SvgEdit className="h-6 w-6" />
                </a>
              </Link>
            </div>
            {/* Delete */}
            <div className="px-4">
              <div
                className="cursor-pointer"
                onClick={() => {
                  console.log('delete clicked');
                  // delete post
                  try {
                    deletePost();
                  } catch (error) {
                    return console.log('delete failed', error);
                  }
                  // reload query
                }}
              >
                <SvgDelete className="h-6 w-6" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
