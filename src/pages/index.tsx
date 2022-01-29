import type { NextPage } from 'next'
import { FaList } from 'react-icons/fa';
import GlobalNav from 'src/components/GlobalNav'
import SideNav from 'src/components/SideNav'
import React, { useCallback } from 'react';
import ReactPaginate from 'react-paginate';

import { useQuery, useMutation, gql, useApolloClient } from '@apollo/client';
import { userVar } from '../graphql/variables/variables'
import { CREATE_POST, PostInputType } from '../graphql/post/mutations/createPostMutation'
import { POSTS_QUERY } from '../graphql/post/queries/postQuery'
import { Post, PostsData } from '../graphql/post/post'

const Home: NextPage = () => {
  const [content, setContent] = React.useState('');

  const handleChange = (event: any) => {
    setContent(event.target.value);
    console.log("event:",event.target.value)
  }

  const { loading, error, data, fetchMore, refetch } = useQuery<PostsData>(POSTS_QUERY, {
    variables: {
      first: 100,
      page: 1
    }
  });

  const [createPost, { loading_cP, error_cP }] = useMutation(CREATE_POST,{
    onCompleted() {
      refetch()
      setContent('')
    },
  });

  const nextPage = useCallback(
    (pageInfo) => {
      console.log("page", pageInfo['selected']);
      fetchMore({
        variables: {
          first: 100,
          page: pageInfo['selected'] + 1
        },
      });
    },
    [fetchMore]
  );

  const posts = data?.posts.data
  const currentPage = data?.posts.paginatorInfo.currentPage
  const hasMorePages = data?.posts.paginatorInfo.hasMorePages
  const lastPage = data?.posts.paginatorInfo.lastPage
  const user = userVar();
  console.log(posts)

  return (
    <>
        <div className="ml-10 w-full mb-5">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-2 pt-5 sm:px-6 w-full">
              <textarea className="w-full block w-full h-40 px-4 py-2 text-gray-700 bg-white border" onChange={handleChange} value={content} />
            </div>
            <div className="px-4 py-2 sm:px-6 w-full flex justify-end">
              <button onClick={() => createPost({ variables: { user_id: user.id, content:content } })} className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
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

                <ReactPaginate
                  pageCount={lastPage} //総ページ数。今回は一覧表示したいデータ数 / 1ページあたりの表示数としてます。
                  marginPagesDisplayed={3} //先頭と末尾に表示するページの数。今回は2としたので1,2…今いるページの前後…後ろから2番目, 1番目 のように表示されます。
                  pageRangeDisplayed={5} //上記の「今いるページの前後」の番号をいくつ表示させるかを決めます。
                  onPageChange={nextPage} //ページネーションのリンクをクリックしたときのイベント(詳しくは下で解説します)
                  containerClassName='flex ml-auto' //ページネーションリンクの親要素のクラス名
                  pageClassName='page-item' //各子要素(li要素)のクラス名
                  pageLinkClassName='px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-white rounded-md sm:inline dark:bg-gray-900 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200' //ページネーションのリンクのクラス名
                  activeClassName='active' //今いるページ番号のクラス名。今いるページの番号だけ太字にしたりできます 
                  previousLabel='<' //前のページ番号に戻すリンクのテキスト
                  nextLabel='>' //次のページに進むボタンのテキスト
                  previousClassName='flex items-center justify-center px-4 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md dark:bg-gray-900 dark:text-gray-600' // '<'の親要素(li)のクラス名
                  nextClassName='flex items-center justify-center px-4 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md cursor-not-allowed dark:bg-gray-900 dark:text-gray-600' //'>'の親要素(li)のクラス名
                  previousLinkClassName='page-link'  //'<'のリンクのクラス名
                  nextLinkClassName='page-link'//'>'のリンクのクラス名
                  disabledClassName='cursor-not-allowed' //先頭 or 末尾に行ったときにそれ以上戻れ(進め)なくするためのクラス
                  breakLabel='...' // ページがたくさんあるときに表示しない番号に当たる部分をどう表示するか
                  breakClassName='page-item' // 上記の「…」のクラス名
                  breakLinkClassName='page-link' // 「…」の中のリンクにつけるクラス
                />
              </h3>
            </div>



            <div className="border-t border-gray-200">
              <div>
                {posts ? posts.map((post:Post, index:number) => (
                  <div className="px-4 py-5 sm:px-6 flex justify-start border-gray-200 border-b-1" key={index}>
                    <div className="text-sm font-medium text-gray-500 w-1/12">
                      <a href={"/profile/" + post.user.id}>
                        <img
                          src={post.user.avatar_url}
                          className="w-10 rounded-full"
                        />
                      </a>
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
    </>
  )
}

export default Home
