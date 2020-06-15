import React, {Component} from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link}  from 'react-router-dom';
const { Sider } = Layout;

class Siderl extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Sider trigger={null} collapsible collapsed={this.props.collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to={"/index"}>
              <Icon type="user" />
              <span>スタッフ</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to={"/index/case"}>
              <Icon type="user" />
              <span>案件</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to={"/index/tool"}>
              <Icon type="video-camera" />
              <span>引合</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to={"/index/demo"}>
              <Icon type="video-camera" />
              <span>領収書</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}

export default Siderl;
