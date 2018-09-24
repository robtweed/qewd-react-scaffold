/*

 ----------------------------------------------------------------------------
 | qewd-oidc-admin: Administration Interface for QEWD OpenId Connect Server |
 |                                                                          |
 | Copyright (c) 2018 M/Gateway Developments Ltd,                           |
 | Redhill, Surrey UK.                                                      |
 | All rights reserved.                                                     |
 |                                                                          |
 | http://www.mgateway.com                                                  |
 | Email: rtweed@mgateway.com                                               |
 |                                                                          |
 |                                                                          |
 | Licensed under the Apache License, Version 2.0 (the "License");          |
 | you may not use this file except in compliance with the License.         |
 | You may obtain a copy of the License at                                  |
 |                                                                          |
 |     http://www.apache.org/licenses/LICENSE-2.0                           |
 |                                                                          |
 | Unless required by applicable law or agreed to in writing, software      |
 | distributed under the License is distributed on an "AS IS" BASIS,        |
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. |
 | See the License for the specific language governing permissions and      |
 |  limitations under the License.                                          |
 ----------------------------------------------------------------------------

 10 September 2018

*/

"use strict"

var React = require('react');
var createReactClass = require('create-react-class');
var ReactBootstrap = require('react-bootstrap');

var {
  Tab,
  Tabs
} = ReactBootstrap;

var TabPortal = createReactClass({

  getInitialState: function() {
    return {
      status: 'initial'
    }
  },

  componentWillMount: function() {
    //this.controller = require('./controller-tab-portal')(this.props.controller, this);
  },

  componentDidMount: function() {
  },
  
  componentWillReceiveProps: function(newProps) {
    //this.onNewProps(newProps);
  },

  render: function() {

    //var componentPath = this.controller.updateComponentPath(this);

    console.log('rendering TabPortal - loginStatus = ' + this.props.loginStatus);


    return (
      <Tabs defaultActiveKey={1} id="Options">
        <Tab eventKey={1} title="Tab 1">
          Tab 1 Content goes here
        </Tab>
        <Tab eventKey={1} title="Tab 2">
          Tab 2 Content goes here
        </Tab>
        <Tab eventKey={1} title="Tab 3">
          Tab 3 Content goes here
        </Tab>
      </Tabs>
    );    
  }
});

module.exports = TabPortal;
