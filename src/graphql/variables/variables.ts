import { makeVar } from "@apollo/client";

export const userVar = makeVar({
    api_token: null,
    avatar_url: null,
    bio: null,
    created_at: null,
    email: null,
    github_id: null,
    github_refresh_token: null,
    github_token: null,
    id: null,
    name: null,
    provider: null,
    remember_token: null,
    updated_at: null
});