/*

 ------------------------------------------------------------------------------------
 | qewd-react-scaffold: React.js-based QEWD application scaffolding                 |
 |                                                                                  |
 | Copyright (c) 2017-18 M/Gateway Developments Ltd,                                |
 | Redhill, Surrey UK.                                                              |
 | All rights reserved.                                                             |
 |                                                                                  |
 | http://www.mgateway.com                                                          |
 | Email: rtweed@mgateway.com                                                       |
 |                                                                                  |
 |                                                                                  |
 | Licensed under the Apache License, Version 2.0 (the "License");                  |
 | you may not use this file except in compliance with the License.                 |
 | You may obtain a copy of the License at                                          |
 |                                                                                  |
 |     http://www.apache.org/licenses/LICENSE-2.0                                   |
 |                                                                                  |
 | Unless required by applicable law or agreed to in writing, software              |
 | distributed under the License is distributed on an "AS IS" BASIS,                |
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.         |
 | See the License for the specific language governing permissions and              |
 |  limitations under the License.                                                  |
 ------------------------------------------------------------------------------------

 10 September 2018

*/

module.exports = function (controller) {

  this.log = true;
  var self = this;

  controller.formFieldHandler = function(formModuleName, fieldName) {
    var self = this;
    this.controller[formModuleName] = {
      onFieldChange: function(inputObj) {
        console.log('FieldChange - ' + inputObj.ref + '; ' + inputObj.value);
        self[inputObj.ref] = inputObj.value;
        self.controller[formModuleName][fieldName] = inputObj.value;
      }
    };
    this.controller[formModuleName][fieldName] = '';
  };

  controller.toastr = function(type, text) {
    if (type && type !== '' && self.toastContainer && self.toastContainer[type]) {
      self.toastContainer[type](text);
    }
  };

  controller.displayError = function(error) {
    controller.toastr('error', error);
  };

  // display generic EWD.js errors using toastr:

  controller.on('error', function(messageObj) {
    console.log('&&& error event: messageObj = ' + JSON.stringify(messageObj));
    var error = messageObj.message.error || messageObj.message;
    console.log('displayError: ' + error);
    controller.displayError(error);
  });

  // publish the login response handler in this
  // component to force re-render of main page

  controller.on('login', function(messageObj) {
    console.log('login event triggered');
    if (!messageObj.message.error && messageObj.message.ok) {
      // logged in

      self.showLoginModal = false;
      var status = messageObj.message.mode || 'loggedIn';

      controller.userMode = messageObj.message.mode || 'unknown';
      console.log('status = ' + status);
      self.setState({
        status: status
      });
    }
  });


  controller.on('logout', function() {
    controller.disconnectSocket();
    self.setState({
      status: 'shutdown'
    });
  });


  this.navs = [
    {
      text: 'Main',
      eventKey: 'main',
      default: true,
      panel: {
        title: 'Main Panel'
      }
    }
  ];

  if (this.props.config && this.props.config.navs) {
    this.navs = this.props.config.navs
  }

  this.navs.forEach(function(nav) {
    controller.on(nav.eventKey, function() {
      self.setState({
        status: nav.eventKey
      });
    });
    if (!nav.text) nav.text = 'Unspecified';
    if (!nav.eventKey) nav.eventKey = 'unspecified';
    if (!nav.panel) nav.panel = {};
    if (!nav.panel.bsStyle) nav.panel.bsStyle = 'primary';
    if (!nav.panel.title) nav.panel.title = nav.text + ' Panel';
    if (!nav.panel.titleComponentClass) nav.panel.titleComponentClass = 'h3';
  });

  if (this.navs.length === 1) {
    if (!this.navs[0].default) this.navs[0].default = true;
  }

  controller.navOptionSelected = function(eventKey) {
    controller.emit(eventKey);
  };

  controller.app = this.props.config || {};
  if (!controller.app.navs) controller.app.navs = this.navs;
  if (!controller.app.title) controller.app.title = 'Un-named Application';

  if (controller.app.loginModal && controller.app.mode !== 'local') {
    this.showLoginModal = true;
  }
  else {
    this.showLoginModal = false;
    this.setState({
      status: 'loggedIn'
    });
  }

  return controller;
};
