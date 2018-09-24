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

"use strict"

var React = require('react');
var createReactClass = require('create-react-class');
var ReactBootstrap = require('react-bootstrap');
var FormField = require('./FormField');

var {
  Button,
  Panel
} = ReactBootstrap;

var EditRowData = createReactClass({

  getInitialState: function() {
    return {
      status: 'initial'
    }
  },

  componentWillMount: function() {
    this.controller = require('./controller-EditRowData').call(this, this.props.controller);

    this.title = (
      <span>
          <b>{this.props.title}</b>
          <Button 
            bsClass="btn btn-primary pull-right"
            onClick = {this.cancel}
          >
            Cancel
          </Button>
      </span>
    );
  },

  componentDidMount: function() {
  },
  
  componentWillReceiveProps: function(newProps) {
    console.log('EditClient receiving new props: ' + JSON.stringify(newProps));
    this.title = (
      <span>
          <b>{newProps.title}</b>
          <Button 
            bsClass="btn btn-primary pull-right"
            onClick = {this.cancel}
          >
            Cancel
          </Button>
      </span>
    );
  },

  render: function() {

    console.log('rendering EditRowData - show = ' + this.props.show);

    return (
      <div
        className = {this.props.show}
      >
        <Panel
          bsStyle="info"
        >
          <Panel.Heading>
   	     {this.title}
          </Panel.Heading>
          <Panel.Body>

            <FormField
              fieldname='property_1'
              label='Property 1'
              type='text'
              controller = {this.controller}
              focus={true}
              value = {this.props.data.property_1}
              formModule = 'EditRowData'
            />
            <FormField
              fieldname='property_2'
              label='Property 2'
              type='static'
              controller = {this.controller}
              focus={false}
              value = {this.props.property_2}
            />

            <Button 
              bsClass="btn btn-success"
              onClick = {this.saveRowData}
            >
              Save
            </Button>

          </Panel.Body>
        </Panel>
      </div>
    );
  }
});

module.exports = EditRowData;
