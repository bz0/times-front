import type { NextPage } from 'next'
import { FaList } from 'react-icons/fa';
import React, { useCallback } from 'react';
import ReactPaginate from 'react-paginate';

import { useQuery } from '@apollo/client';
import { USER_FIND_QUERY } from '../../graphql/user/queries/userQuery'
import { UserData } from '../../graphql/user/user'
import { POSTS_QUERY } from '../../graphql/post/queries/postQuery'
import { Post, PostsData } from '../../graphql/post/post'
import { useRouter } from "next/router";

const ProfileCard: NextPage = () => {
  const router = useRouter();
  console.log("ProfileCard", router.query)

  const { userLoading, userError, data } = useQuery<UserData>(USER_FIND_QUERY, {
    variables: {
      id: router.query?.user_id
    }
  });

  const user  = data?.user
  console.log(user)

  return (
    <>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-5 w-80 mx-auto">
          <div className="px-4 py-2 pt-5 sm:px-6 w-full">
            <img
              className="h-16 w-16 rounded-full border-gray-200 border mx-auto"
              src={user?.avatar_url}
              alt=""
            />
          </div>
          <div className="px-4 py-2 sm:px-6 flex mx-auto w-60 border-gray-200 border my-4 rounded-lg">{user?.bio}</div>
        </div>
    </>
  )
}

const Profile: NextPage = () => {
  const router = useRouter();

  const { loading, error, data, fetchMore, refetch } = useQuery<PostsData>(POSTS_QUERY, {
    variables: {
      first: 100,
      page: 1,
      user_id: router.query?.user_id
    }
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
  console.log(posts)

  return (
    <>
      <div className="ml-10 w-full mb-5">
        <ProfileCard />

        <div className="bg-white shadow overflow-hidden sm:rounded-lg w-full">
          <div className="px-4 py-2 sm:px-6">
            <h3 className="leading-6 font-medium text-gray-900 flex">
              <div className="my-auto"><FaList /></div>
              <div className="my-auto ml-2">??????</div>
              <p className="ml-10 my-auto max-w-2xl text-sm text-gray-500">?????????????????????????????????</p>

              <ReactPaginate
                pageCount={lastPage} //???????????????????????????????????????????????????????????? / 1????????????????????????????????????????????????
                marginPagesDisplayed={3} //?????????????????????????????????????????????????????????2???????????????1,2?????????????????????????????????????????????2??????, 1?????? ?????????????????????????????????
                pageRangeDisplayed={5} //???????????????????????????????????????????????????????????????????????????????????????????????????
                onPageChange={nextPage} //??????????????????????????????????????????????????????????????????????????????(?????????????????????????????????)
                containerClassName='flex ml-auto' //????????????????????????????????????????????????????????????
                pageClassName='page-item' //????????????(li??????)???????????????
                pageLinkClassName='px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-white rounded-md sm:inline dark:bg-gray-900 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200' //???????????????????????????????????????????????????
                activeClassName='active' //????????????????????????????????????????????????????????????????????????????????????????????????????????? 
                previousLabel='<' //??????????????????????????????????????????????????????
                nextLabel='>' //????????????????????????????????????????????????
                previousClassName='flex items-center justify-center px-4 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md dark:bg-gray-900 dark:text-gray-600' // '<'????????????(li)???????????????
                nextClassName='flex items-center justify-center px-4 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md cursor-not-allowed dark:bg-gray-900 dark:text-gray-600' //'>'????????????(li)???????????????
                previousLinkClassName='page-link'  //'<'???????????????????????????
                nextLinkClassName='page-link'//'>'???????????????????????????
                disabledClassName='cursor-not-allowed' //?????? or ?????????????????????????????????????????????(??????)??????????????????????????????
                breakLabel='...' // ??????????????????????????????????????????????????????????????????????????????????????????????????????
                breakClassName='page-item' // ?????????????????????????????????
                breakLinkClassName='page-link' // ????????????????????????????????????????????????
              />
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
    </>
  )
}

export default Profile
