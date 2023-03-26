import React from "react";
import { CaretRightOutlined } from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Collapse,
  Divider,
  Space,
  theme,
  Typography,
} from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const { Panel } = Collapse;

const CustomCollapse = () => {
  const { token } = theme.useToken();
  const { Text, Link } = Typography;

  const panelStyle = {
    marginBottom: 10,
    background: token.colorBgContainer,
    borderRadius: token.borderRadiusLG,
  };

  interface User {
    login: string;
    avatar_url: string;
    html_url: string;
    repositories: {
      name: string;
      description: string;
      html_url: string;
      login: string;
      stargazers_url: string;
      visibility: any;
      language: any;
      updated_at: any;
    }[];
  }

  const state = useSelector((state: RootState) => state.userSearchSlice);
  const userData: User[] = { ...state.data };
  const page = state.page;
  let start = page * 5 - 5;
  let end = page * 5;
  return (
    <>
      {Object.entries(userData).length > 0 ? (
        Object.entries(userData)
          .slice(1)
          .slice(start, end)
          .map(([key, value]) => (
            <Collapse
              defaultActiveKey={["1"]}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
              style={{ background: token.colorBgContainer, textAlign: "left" }}
            >
              <Panel header={value.login} key={key} style={panelStyle}>
                <>
                  <a href={value.html_url} target="_blank" rel="noreferrer">
                    <Space size="middle">
                      <Avatar
                        size={64}
                        src={<img src={value.avatar_url} alt={value.login} />}
                      />
                      <Text strong>{value.login}</Text>
                    </Space>
                  </a>
                  {value.repositories &&
                    value.repositories.slice(1).map((repo) => {
                      return (
                        <>
                          <Divider />
                          <Space>
                            <Link
                              strong
                              href={repo.html_url}
                              target="_blank"
                              style={{ fontSize: 20 }}
                              key={repo.name}
                            >
                              {repo.name}
                            </Link>
                            <Text code>{repo.visibility}</Text>
                          </Space>
                          <p>{repo.description}</p>
                          <Space size="large">
                            {repo.language && (
                              <Badge text={repo.language} color="green"></Badge>
                            )}
                            <Text type="secondary">
                              Updated on {repo.updated_at.slice(0, 10)}
                            </Text>
                          </Space>
                        </>
                      );
                    })}
                  {!value.repositories && <p>There are no repository</p>}
                </>
              </Panel>
            </Collapse>
          ))
      ) : (
        <p></p>
      )}
    </>
  );
};

export default CustomCollapse;
