export interface Post {
    id: Number;
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

export interface PostsData {
    posts: {
        data: Post[];
        paginatorInfo: {
          total: number;
          currentPage: number;
          lastPage: number;
          hasMorePages: number;
        }
    }
  }