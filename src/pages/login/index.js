import React, {Component} from 'react';
import qs from 'qs'
import { Form, Icon, Input, Button } from 'antd';
import './index.scss'

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleSubmit = e => {
    e.preventDefault();
    // let _name = this.props.form.getFieldsValue().username;   //===values
    // let _psd = this.props.form.getFieldsValue().password; //===values
    this.props.form.validateFields((err, values) => {
      if (err) {
        return false;
      }else{
        let data = {
          name: values.username,
          password: values.password
        };
        this.$http.post("http://127.0.0.1:8686/login", qs.stringify(data), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(res => {
            if (res.data && res.data.code === 0) {
              window.localStorage.setItem("X-AUTH-TOKEN", '0000');
              this.props.history.push('/index');
            } else {
              global.commonInfo.warning('エラー')
            }
          },
          err => {
            // console.log(err);
          }
        );
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="loginpagewrap">
        <div className="box">
          <div className="loginWrap">
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'ユーザーID' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="ユーザーID"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'パスワード' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="パスワード"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button loginBtn">
                 ログインする 
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const Login = Form.create()(LoginPage);
export default Login;
