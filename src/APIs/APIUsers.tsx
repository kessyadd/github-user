import octokit from "../configs/octokitInstance";

const APIUsers = {
  getUserList: async (userName: string) => {
    const result = await octokit.request("GET /search/users", {
      q: userName,
    });
    return result.data;
  },
  getRepositories: async (userName: string) => {
    const result = await octokit.request("GET /users/{username}/repos", {
      username: userName,
    });
    return result.data;
  },
};

export const getUserList = APIUsers.getUserList;
export const getRepositories = APIUsers.getRepositories;
