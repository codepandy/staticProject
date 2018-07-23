import React from 'react';
import { connect } from 'dva';
import { formatter } from '../utils/utils';

const BaseApp = WrappedComponent => {
  @connect(({ global }) => ({
    global,
  }))
  class App extends React.Component {
    componentDidMount() {
      // this.props.dispatch({
      //   type: 'global/fetchMenus',
      // });
    }

    render() {
      const { menus: { data = [] } } = this.props.global;
      return <WrappedComponent {...this.props} menus={formatter(data)} />;
    }
  }

  return App;
};
export default BaseApp;
