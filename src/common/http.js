import axios from "axios";
import qs from "qs";
import { Component } from 'react';
// import MProgress from './spin';
// import { createHashHistory } from 'history'; 
// or
// import { createBrowserHistory } from 'history';

const TIMEOUT = 10000;
// const history = createHashHistory();

let baseUrl = 'http://127.0.0.1:8686';


axios.interceptors.request.use(
  config => {
    // MProgress.start();
    return config;
  },
  err => {
    // MProgress.done();
    console.log("エラー");
    return Promise.reject(err);
  }
);


axios.interceptors.response.use(
  data => {
    // MProgress.done();
    if (data.data.code === 2001 || data.data.code === 2002) {
      setTimeout( ()=>{
        global.commonInfo.warning(
          'もう一度ログインしてください', 1.5,
          onClose => {
            window.localStorage.removeItem('X-AUTH-TOKEN');
            // history.push('/login') 
            window.location.href = '/login'
          })
      },1500)

    }
    return data;
  },
  err => {
    // MProgress.done();
    if (err.response.status === 504 || err.response.status === 404) {
      console.log("エラー１");
      global.commonInfo.commonInfo.warning('エラー２')
    } else if (err.response.status === 401) {
      console.log("エラー３");
      global.commonInfo.warning('エラー４')
    } else if (err.response.status === 500) {
      console.log("エラー５");
      global.commonInfo.warning('エラー６')
    }
    return Promise.reject(err);
  }
);

function dataFormat(types) {
  let dataFormat = "";
  if (!types) {
    dataFormat = "application/x-www-form-urlencoded; charset=UTF-8";
  } else if(types.type === 'json') {
    dataFormat = "application/" + types.type + "; charset=UTF-8";
  } else if(types.type === 'form-data') {
    dataFormat = "multipart/" + types.type;
  }
  return dataFormat;
}


const post = (url, params, types) => {
  return axios({
    method: "post",
    url: `${baseUrl}${url}?r=${new Date().getTime()}`,
    data: !types ? qs.stringify(params) : params,
    timeout: TIMEOUT,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": dataFormat(types),
      token: window.localStorage.getItem("X-AUTH-TOKEN")
    }
  });
};


const postRequestParam = (url, params, types) => {
  return axios({
    method: "post",
    url: `${baseUrl}${url}?r=${new Date().getTime()}`,
    data: params,
    timeout: TIMEOUT,
    transformRequest: [
      function(data) {
        let ret = "";
        for (let it in data) {
          ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
        }
        return ret;
      }
    ],
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": dataFormat(types),
      token: window.localStorage.getItem("X-AUTH-TOKEN")
    }
  });
};

const get = (url, params) => {
  return axios({
    method: "get",
    url: `${baseUrl}${url}?r=${new Date().getTime()}`,
    params,
    timeout: TIMEOUT,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      token: window.localStorage.getItem("X-AUTH-TOKEN")
    }
  });
};

const multiple = function(requsetArray, callback) {
  axios.all(requsetArray).then(axios.spread(callback));
};

Component.prototype.get = get;
Component.prototype.post = post;
Component.prototype.postRequestParam = postRequestParam;
Component.prototype.multiple = multiple;
