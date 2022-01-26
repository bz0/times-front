import type { NextPage } from 'next'
import { FaList } from 'react-icons/fa';
import { FiAlertCircle } from 'react-icons/fi';
import GlobalNav from 'src/components/GlobalNav'
import SideNav from 'src/components/SideNav'
import React, { useState, useRef } from 'react';

import { useQuery, useMutation, gql } from '@apollo/client';
import { useCallback } from 'react';
import { isNullableType } from 'graphql';

const POSTS_QUERY = gql`
  query Post($first: Int, $page: Int) {
    posts(first:$first, page:$page) {
      data{
        id
        user_id
        content
        created_at
        user {
          name
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
  created_at: string;
  user: {
    name: string;
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

  const { loading, error, data, fetchMore } = useQuery<PostsData>(POSTS_QUERY, {
    variables: {
      first: 100,
      page: 1
    }
  });

  const nextPage = useCallback(
    (pageInfo) => {
      fetchMore({
        variables: {
          first: 100,
          page: pageInfo
        },
      });
    },
    [fetchMore]
  );

  const posts = data?.posts.data

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
              <div className="px-4 py-2 sm:px-6">
                <h3 className="leading-6 font-medium text-gray-900 flex">
                  <div className="my-auto"><FaList /></div>
                  <div className="my-auto ml-2">分報</div>
                  <p className="ml-10 my-auto max-w-2xl text-sm text-gray-500">個人開発の進捗等の投稿</p>

                  <div className="flex ml-auto">
                    <a href="#" className="flex items-center justify-center px-4 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md cursor-not-allowed dark:bg-gray-900 dark:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                    </a>

                    <a href="#" onClick={() => nextPage(1)} className="hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-white rounded-md sm:inline dark:bg-gray-900 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200">
                        1
                    </a>

                    <a href="#" onClick={() => nextPage(2)} className="hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-white rounded-md sm:inline dark:bg-gray-900 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200">
                        2
                    </a>

                    <a href="#" className="hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-white rounded-md sm:inline dark:bg-gray-900 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200">
                        3
                    </a>

                    <a href="#" className="hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-white rounded-md sm:inline dark:bg-gray-900 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200">
                        4
                    </a>

                    <a href="#" className="flex items-center justify-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-white rounded-md dark:bg-gray-900 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                        </svg>
                    </a>
                  </div>
                </h3>
              </div>

              <div className="border-t border-gray-200">
                <div>
                  {posts ? posts.map((post:Post, index:number) => (
                    <div className="px-4 py-5 sm:px-6 flex justify-start border-gray-200 border-b-1" key={index}>
                      <div className="text-sm font-medium text-gray-500 w-1/12">
                        <img
                          src={post.user.avatar_url}
                          className="w-10 rounded-full"
                        />
                      </div>
                      <div className="text-sm text-gray-900 sm:mt-0 sm:col-span-2 w-11/12">
                        <div className="text-sm text-gray-900">
                          <span className="font-bold">{post.user.name}</span>
                          <span className="ml-5">{post.created_at}</span>
                        </div>
                        <div className="break-all">{post.content}</div>
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
