import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getUserList, getRepositories } from "../../APIs/APIUsers";

interface UserList {
  login: string;
  totalUser: number;
  // avatar_url: string;
  // html_url: string;
  repositories?: [];
}

interface Repositories {}

interface UserState {
  keyword: string;
  repositories: Repositories[];
  data: [];
  userList: UserList[];
  fetchUserStatus: "idle" | "loading" | "succeeded" | "failed";
  fetchRepoStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  page: number;
}

const initialState: UserState = {
  keyword: "",
  repositories: [[]],
  data: [],
  userList: [],
  fetchUserStatus: "idle",
  fetchRepoStatus: "idle",
  page: 1,
  error: null,
};

export const fetchUserList = createAsyncThunk(
  "fetch/fetchUsertList",
  async (params: string) => {
    const response = await getUserList(params);
    let temp: [{}] = [{}];

    response.items.forEach((elements) => {
      let obj: {};
      let login: string = elements.login;
      let html_url: string = elements.html_url;
      let avatar_url: string = elements.avatar_url;
      let totalUser: number = response.items.length;
      obj = { login, html_url, avatar_url, totalUser };
      temp.push(obj);
    });
    return temp as unknown as UserList[];
  }
);

export const fetchRepositories = createAsyncThunk(
  "fetch/fetchRepositories",
  async (params: string) => {
    const response = await getRepositories(params);
    let temp: [{}] = [{}];
    let obj: {} = {};
    response.forEach((elements) => {
      let name: string = elements.name;
      let html_url: string = elements.html_url;
      let login: string = elements.owner.login;
      let description: any = elements.description;
      let stargazers_url: string = elements.stargazers_url;
      let visibility: any = elements.visibility;
      let updated_at: any = elements.updated_at;
      let language: any = elements.language;
      obj = {
        name,
        html_url,
        login,
        description,
        stargazers_url,
        visibility,
        updated_at,
        language,
      };
      temp.push(obj);
    });
    return temp as Repositories[];
  }
);

const userSearchSlice = createSlice({
  name: "searchUsers",
  initialState,
  reducers: {
    resetRepositories: (state) => {
      state.repositories = [];
    },
    setData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserList.pending, (state) => {
      state.fetchUserStatus = "loading";
    });
    builder.addCase(
      fetchUserList.fulfilled,
      (state, action: PayloadAction<UserList[]>) => {
        state.fetchUserStatus = "succeeded";
        state.userList = action.payload;
      }
    );
    builder.addCase(
      fetchUserList.rejected,
      (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.fetchUserStatus = "failed";
      }
    );
    builder.addCase(fetchRepositories.pending, (state) => {
      state.fetchRepoStatus = "loading";
    });
    builder.addCase(
      fetchRepositories.fulfilled,
      (state, action: PayloadAction<Repositories[]>) => {
        state.fetchRepoStatus = "succeeded";
        state.repositories.push(action.payload);
      }
    );
    builder.addCase(
      fetchRepositories.rejected,
      (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.fetchRepoStatus = "failed";
      }
    );
  },
});

export const { resetRepositories, setData, setPage } = userSearchSlice.actions;
export default userSearchSlice.reducer;
