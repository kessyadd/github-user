import { Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { setPage } from "../store/features/userSearchSlice";
import "./css/pages.css";

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
      <div className="pages">
        {user.length > 1 && (
          <Pagination
            defaultCurrent={1}
            current={page}
            total={user[1].totalUser}
            pageSize={5}
            onChange={handleOnChange}
          />
        )}
      </div>
    </>
  );
};

export default Pages;
