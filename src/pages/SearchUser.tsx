import { Spin, Typography } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomCollapse from "../components/CustomCollapse";
import InputSearch from "../components/InputSearch";
import Pages from "../components/Pages";
import { AppDispatch, RootState } from "../store";
import {
  fetchRepositories,
  resetRepositories,
} from "../store/features/userSearchSlice";

const SearchUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state.userSearchSlice);
  const { Title } = Typography;

  useEffect(() => {
    document.title = "GitHub Repositories Explorer";
    if (state.fetchUserStatus === "succeeded") {
      if (state.repositories.length > 0) dispatch(resetRepositories());
      state.userList.forEach((elements) => {
        if (elements.login) {
          dispatch(fetchRepositories(elements.login));
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.userList]);
  return (
    <>
      <Title level={2}>GitHub Repositories Explorer</Title>
      <p>Please input username to start</p>
      <InputSearch />
      {state.fetchRepoStatus === "succeeded" && <CustomCollapse />}
      {state.fetchRepoStatus === "loading" && <Spin />}
      <Pages />
    </>
  );
};

export default SearchUser;
