import type { NextPage } from 'next'
import { FaList } from 'react-icons/fa';
import GlobalNav from 'src/components/GlobalNav'
import SideNav from 'src/components/SideNav'
import React, { useState } from 'react';

import { useQuery, useMutation, gql } from '@apollo/client';
import { useEffect } from 'react';

const POST_CREATE = gql`
  mutation {
    createPost(input: { $userid: Int, $content: String }) {
      user_id
      content
    }
  }
`;

interface PostInventory {
  content: string;
}

interface NewPostDetails {
  content: string;
}

const Home: NextPage = () => {
  const [content, setContent] = useState('');

  const postCreate = () => {
    const [savePost, { error, data }] = useMutation<
      { savePost: PostInventory },
      { post: NewPostDetails }
    >(POST_CREATE, {
        variables: { content: content  },
    });
  }

  return (
    <>
      <GlobalNav />
      <div className="bg-gray-100 w-full h-screen">
        <div className="max-w-7xl mx-auto pt-5 px-2 sm:px-6 lg:px-8 flex">
          <SideNav />

          <div className="ml-10 w-full">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-5">
              <div className="px-4 py-2 pt-5 sm:px-6 w-full">
                <textarea className="w-full block w-full h-40 px-4 py-2 text-gray-700 bg-white border" onChange={e => setContent(e.target.value)}></textarea>
              </div>
              <div className="px-4 py-2 sm:px-6 w-full flex justify-end">
                <button onclick={postCreate} className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
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
                  <div className="px-4 py-5 sm:px-6 flex justify-start">
                    <div className="text-sm font-medium text-gray-500">
                      <img
                        className="h-8 w-8 rounded-full"
                        src=""
                        alt=""
                      />
                    </div>
                    <div className="text-sm text-gray-900 sm:mt-0 sm:col-span-2 ml-10">
                      <div className="text-sm text-gray-900">
                        <span className="font-bold">bz0</span>
                        <span className="ml-5">10分前</span>
                      </div>
                      ああああああああああああああああああああああああああああああああああ<br />
                      ああああああああああああああああああああああああああああああああああ<br />
                      ああああああああああああああああああああああああああああああああああ<br />
                      ああああああああああああああああああああああああああああああああああ
                    </div>
                  </div>
                  <div className="px-4 py-5 sm:px-6 flex justify-start">
                    <div className="text-sm font-medium text-gray-500">
                      <img
                        className="h-8 w-8 rounded-full"
                        src=""
                        alt=""
                      />
                    </div>
                    <div className="text-sm text-gray-900 sm:mt-0 sm:col-span-2 ml-10">
                      <div className="text-sm text-gray-900">
                        <span className="font-bold">bz0</span>
                        <span className="ml-5">10分前</span>
                      </div>
                      ああああああああああああああああああああああああああああああああああ<br />
                      ああああああああああああああああああああああああああああああああああ<br />
                      ああああああああああああああああああああああああああああああああああ<br />
                      ああああああああああああああああああああああああああああああああああ
                    </div>
                  </div>
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
