import React, {Component} from 'react';
import { Pagination } from 'antd';

class Pagina extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: props.pagination,
      total: props.pagination.total,
      pageSize: props.pagination.params.pageSize,
      pageSizeOptions: props.pagination.pageSizeOptions,
      showQuickJumper: props.pagination.showQuickJumper,  
      showSizeChanger: props.pagination.showSizeChanger,  
      showTotal: props.pagination.showTotal,       
    };
  }
  
  componentWillReceiveProps(nextProps,prevProps){
    this.setState({
      pagination:nextProps.pagination,
      total: nextProps.pagination.total,
      pageSizeOptions: nextProps.pagination.pageSizeOptions,
      pageSize: nextProps.pagination.params.pageSize,
      showQuickJumper: nextProps.pagination.showQuickJumper,  
      showSizeChanger: nextProps.pagination.showSizeChanger,  
      showTotal: nextProps.pagination.showTotal,        
    })
  }

  onShowSizeChange(current, pageSize) {
    let pagination = this.state.pagination;
    let params = pagination.params;
    params.pageNum = current;
    params.pageSize = pageSize;
    let config = {
      url: pagination.url,
      method: pagination.method || 'post'
    };
    if (config.method === 'get') {
      config.params = params;
    } else {
      config.data = params;
    }
    this.setState({
      pageSize: pageSize
    })
    this.paginationRequest(config, params);
  }

  onChange(current, pageSize) {
    let pagination = this.state.pagination;
    let params = pagination.params;
    params.pageNum = current;
    params.pageSize = this.state.pageSize;
    let config = {
      url: pagination.url,
      method: pagination.method || 'post'
    };
    if (config.method === 'get') {
      config.params = params;
    } else {
      config.data = params;
    }
    this.paginationRequest(config, params);
  }

  async paginationRequest(config, params) {
    this.props.handleOpenLoading();
    let res = '';
    if(config.method === 'post'){
      res = await this.post(config.url,config.data,{type: "json"});
    }else if(config.method === 'get'){
      res = await this.get(config.url,config.params,{type: "json"});
    }
    if(res.data && res.data.code === 0){
      let data = res.data.data;
      let result = data.listData;
      let newPagination = {
        total: data.total,
        params: params
      };
      this.props.handleSubmitPagination({result, newPagination});
    }else{
      global.commonInfo.error('获取分页数据失败');
    };
  }
  render() {
    return (
      <div>
        <Pagination
          showSizeChanger={this.state.showSizeChanger}
          showQuickJumper={this.state.showQuickJumper}
          showTotal={ this.state.showTotal ? total => `共 ${total} 条` : false}
          onChange = {this.onChange.bind(this)}
          onShowSizeChange = {this.onShowSizeChange.bind(this)}
          defaultCurrent= {1}
          total = {this.state.total}
          pageSizeOptions={this.state.pageSizeOptions}
          hideOnSinglePage={true}
          defaultPageSize={ parseInt(this.state.pageSizeOptions[0])}
        />
      </div>
    )
  }
}

export default Pagina;
