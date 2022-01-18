import type { NextPage } from 'next'
import { FaList } from 'react-icons/fa';
import GlobalNav from 'src/components/GlobalNav'
import SideNav from 'src/components/SideNav'

const Home: NextPage = () => {
  return (
    <>
      <GlobalNav />
      <div className="bg-gray-100 w-full h-screen">
        <div className="max-w-7xl mx-auto pt-5 px-2 sm:px-6 lg:px-8 flex">
          <SideNav />

          <div className="bg-white shadow overflow-hidden sm:rounded-lg ml-10 w-full">
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
    </>
  )
}

export default Home
