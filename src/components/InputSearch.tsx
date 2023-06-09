import React, { useEffect, useState } from "react";
import { Alert, Input, Typography } from "antd";
import {
  fetchUserList,
  resetState,
  setData,
} from "../store/features/userSearchSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import "./css/inputSearch.css";

const { Search } = Input;

const InputSearch: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state.userSearchSlice);
  const userData = state.userList;
  const repoData = state.repositories;
  const [alert, setAlert] = useState(false);
  const repoTemp: any = { ...repoData };
  const userTemp: any = { ...userData };
  const userVal = Object.values(userTemp);
  const repoVal = Object.values(repoTemp);
  const [keyword, setKeyword] = useState("");
  const { Text } = Typography;

  const onSearch = (value: string) => {
    if (value === "") {
      setAlert(true);
    } else {
      const string = value.split(" ").join("").toLowerCase();
      dispatch(fetchUserList(string));
      setKeyword(string);
      setAlert(false);
    }
  };

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      dispatch(resetState());
      setKeyword("");
    }
  };

  const setDataUser = () => {
    if (userVal.length > 0 && repoVal.length > 0) {
      for (let i = 1; i < userVal.length; i++) {
        for (let j = 0; j < repoVal.length; j++) {
          if (repoTemp[j].length > 1) {
            if (userTemp[i].login === repoTemp[j][1].login) {
              let newUser = { ...userTemp[i] };
              newUser.repositories = repoTemp[j];
              userTemp[i] = newUser;
            }
          }
        }
      }
      dispatch(setData(userTemp));
    }
  };

  const handleHideAlert = () => {
    setAlert(false);
  };

  useEffect(() => {
    setDataUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repoData]);

  return (
    <>
      {alert && (
        <Alert
          message="Pelase input username"
          type="error"
          closable
          onClose={handleHideAlert}
        />
      )}
      <Search
        placeholder="input GitHub username"
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        onChange={handleOnchange}
      />
      {userVal.length > 1 && (
        <Text strong type="secondary" className="result-text">
          Showing {userVal.length - 1} user(s) for {keyword}
        </Text>
      )}
    </>
  );
};

export default InputSearch;
