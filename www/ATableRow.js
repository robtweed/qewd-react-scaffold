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

var {
  Button,
  ButtonGroup,
  Glyphicon,
  OverlayTrigger,
  Tooltip
} = ReactBootstrap;

var ATableRow = createReactClass({

  getInitialState: function() {
    return {
      status: 'initial'
    }
  },

  componentWillMount: function() {
    this.controller = require('./controller-ATableRow').call(this, this.props.controller);

    this.editTooltip = (
      <Tooltip 
        id = "editBtn"
      >
        Edit this Client
      </Tooltip>
    );

    this.deleteTooltip = (
      <Tooltip 
        id = "untagBtn"
      >
        Delete This Client
      </Tooltip>
    );

  },

  componentWillReceiveProps: function(newProps) {
    this.onNewProps(newProps);
  },

  render: function() {

    console.log('Rendering ATableRow');
    //var componentPath = this.controller.updateComponentPath(this);

    return (
      <tr>
        <td>
            {this.props.data.col1}
        </td>
        <td>
            {this.props.data.client_col2}
        </td>
        <td>
          <ButtonGroup
            bsClass="pull-right"
          >
            <OverlayTrigger 
              placement="top" 
              overlay={this.editTooltip}
            >
              <Button 
                bsStyle="info"
                onClick = {this.editRowData}
                bsSize="small"
              >
                <Glyphicon 
                  glyph="info-sign"
                />
              </Button>
            </OverlayTrigger>

            <OverlayTrigger 
              placement="top" 
              overlay={this.deleteTooltip}
            >
              <Button 
                bsStyle="danger"
                onClick = {this.deleteRowData}
                bsSize="small"
              >
                <Glyphicon 
                  glyph="scissors"
                />
              </Button>
            </OverlayTrigger>
          </ButtonGroup>
        </td>
      </tr>
    );
  }
});

module.exports = ATableRow;
