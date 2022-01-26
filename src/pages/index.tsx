import type { NextPage } from 'next'
import { FaList } from 'react-icons/fa';
import { FiAlertCircle } from 'react-icons/fi';
import GlobalNav from 'src/components/GlobalNav'
import SideNav from 'src/components/SideNav'
import React, { useState, useRef } from 'react';

import { useQuery, useMutation, gql } from '@apollo/client';
import { useEffect } from 'react';
import { isNullableType } from 'graphql';

const POSTS_QUERY = gql`
  query {
    posts(first:50, page:1) {
      data{
        id
        user_id
        content
        user {
          github_id
          avatar_url
          bio
        }
      }
      paginatorInfo{
        total
      }
    }
  }
`;

export interface Post {
  id: string;
  user_id: string;
  content: string;
  user: {
    github_id: string;
    avatar_url: string;
    bio: string;
  }
}

export interface UpdatePostData {
  post: Post;
}

export interface PostInputType {
  params: {
    content?: string;
  };
}

export interface PostsData {
  posts: {
      data: Post[];
  }
}

const Home: NextPage = () => {
  //const [posts, setPost] = useState('');
  const textRef = useRef(null)

  const { loading, error, data } = useQuery<PostsData>(POSTS_QUERY);
  const posts = data?.posts.data;
  console.log("posts:",posts);

  return (
    <>
      <GlobalNav />
      <div className="bg-gray-100 w-full h-screen">
        <div className="max-w-7xl mx-auto pt-5 px-2 sm:px-6 lg:px-8 flex">
          <SideNav />

          <div className="ml-10 w-full">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-5">
              <div className="px-4 py-2 pt-5 sm:px-6 w-full">
                <textarea className="w-full block w-full h-40 px-4 py-2 text-gray-700 bg-white border" ref={textRef}></textarea>
              </div>
              <div className="px-4 py-2 sm:px-6 w-full flex justify-end">
                <button className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                  投稿する
                </button>
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg w-full">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 flex">
                  <div className="my-auto"><FaList /></div>
                  <div className="my-auto ml-2">分報</div>
                  <p className="ml-10 my-auto max-w-2xl text-sm text-gray-500">勉強したことや個人サービス開発の進捗等の投稿</p>
                </h3>
              </div>

              <div className="border-t border-gray-200">
                <div>
                  {posts ? posts.map((post:Post, index:number) => (
                    <div className="px-4 py-5 sm:px-6 flex justify-start" key={index}>
                      <div className="text-sm font-medium text-gray-500">
                        <img
                          className="h-8 w-8 rounded-full"
                          src={post.user.avatar_url}
                          alt={post.user.github_id}
                        />
                      </div>
                      <div className="text-sm text-gray-900 sm:mt-0 sm:col-span-2 ml-10">
                        <div className="text-sm text-gray-900">
                          <span className="font-bold">{post.user.github_id}</span>
                          <span className="ml-5">10分前</span>
                        </div>
                        {post.content}
                      </div>
                    </div>
                  )):''}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
