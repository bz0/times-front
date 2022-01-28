export interface User {
    id: Number;
    name: string;
    email: string;
    provider: string;
    github_id: string;
    avatar_url: string;
    bio: string;
    created_at: string;
    updated_at: string;
}

export interface UserData {
    user: User;
}