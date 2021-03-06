//JavaScript语法支持严格模式：”use strict”
/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @flow
 */

'use strict';

var ZDXSApp = require('ZDXSApp');
var Parse = require('parse/react-native');
var React = require('React');
var Relay = require('react-relay');

var { Provider } = require('react-redux');
var configureStore = require('./store/configureStore');

function setup(): ReactClass<{}> {
  console.disableYellowBox = true;
   Parse.initialize('oss-f8-app-2016');
  class Root extends React.Component {
    state: {
      isLoading: boolean;
      store: any;
    };

    constructor() {
      super();
      this.state = {
        isLoading: true,
        store: configureStore(() => this.setState({isLoading: false})),
      };
    }
    render() {
      if (this.state.isLoading) {
        return null;
      }
      return (
        //通过Provider将state.store对象传递给所有其他组件树中的组件，子组件中可以通过 connect函数来使用
        <Provider store={this.state.store}>
          <ZDXSApp />
        </Provider>
      );
    }
  }

  return Root;
}

global.LOG = (...args) => {
  console.log('/setup-start------------------------------\\');
  console.log(...args);
  console.log('\\setup-stop------------------------------/');
  return args[args.length - 1];
};

module.exports = setup;
