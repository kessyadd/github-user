import { Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { setPage } from "../store/features/userSearchSlice";

const Pages: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state.userSearchSlice);
  const user = state.userList;
  const page = state.page;

  const handleOnChange = (value: number) => {
    dispatch(setPage(value));
  };
  return (
    <>
      {user.length > 1 && (
        <Pagination
          defaultCurrent={1}
          current={page}
          total={user[1].totalUser}
          pageSize={5}
          onChange={handleOnChange}
        />
      )}
    </>
  );
};

export default Pages;
