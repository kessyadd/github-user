import React from "react";
import { Col, Layout, Row, Space } from "antd";
import LOGO from "../assets/img/github.png";

const { Header, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: "left",
  color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#24292f",
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "60px",
  marginTop: "50px",
};

type Props = {
  children: JSX.Element;
};

const CustomLayout: React.FC<Props> = ({ children }) => (
  <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
    <Layout style={{ height: "100vh", overflow: "auto" }}>
      <Header style={headerStyle}>
        <div className="logo">
          <img src={LOGO} alt="logo" />
        </div>
      </Header>
      <Content style={contentStyle}>
        <Row>
          <Col
            xs={{ span: 20, offset: 2 }}
            md={{ span: 16, offset: 4 }}
            lg={{ span: 12, offset: 6 }}
            xl={{ span: 8, offset: 8 }}
          >
            {children}
          </Col>
        </Row>
      </Content>
    </Layout>
  </Space>
);

export default CustomLayout;
