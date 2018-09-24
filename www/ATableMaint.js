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

  Component that controls a table for CRUD actions on a data structure

*/

"use strict"

var React = require('react');
var createReactClass = require('create-react-class');
var ReactBootstrap = require('react-bootstrap');

var ATableRow = require('./ATableRow');
var EditRowData = require('./EditRowData');

var {
  Button,
  Glyphicon,
  Modal,
  OverlayTrigger,
  Panel,
  Table,
  Tooltip
} = ReactBootstrap;

var ATableMaint = createReactClass({

  getInitialState: function() {
    return {
      status: 'initial'
    }
  },

  componentWillMount: function() {
    this.controller = require('./controller-ATableMaint').call(this, this.props.controller);

      this.tooltip = (
        <Tooltip 
          id = "addRowBtn"
        >
          Add a new Data Row
        </Tooltip>
      );

      this.title = (
        <span>
          <b>Data Items</b>

          <OverlayTrigger 
            placement="top" 
            overlay={this.tooltip}
          >
            <Button 
              bsClass="btn btn-success pull-right"
              onClick = {this.addDataRow}
            >
              <Glyphicon 
                glyph="plus"
              />
            </Button>
          </OverlayTrigger>
        </span>
      );

  },
  
  componentWillReceiveProps: function(newProps) {
    console.log('ATableMaint receiving new props: ' + JSON.stringify(newProps));
  },

  render: function() {

    console.log('Rendering ATableMaint');

    if (this.table.length === 0) {
      console.log('Empty table array');

      return (
        <span>
          <div
            className = {this.show.table}
          >
            <Panel
              bsStyle="info"
            >
              <Panel.Heading>
    	         <Panel.Title>
                  {this.title}
        	  </Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                No Data Defined Yet
              </Panel.Body>
            </Panel>
          </div>

          <EditDataRow
            controller = {this.props.controller}
            show = {this.show.editDataRow}
            data = {this.dataRow}
            conductor = {this.conductor}
            title = {this.editDataRowTitle}
          />
        </span>

      );
    }

    var rows = [];
    var row;

    var self = this;
    this.table.forEach(function(data) {
      row = (
        <ATableRow
          key = {data.id}
          data = {data}
          controller={self.controller}
        />
      );
      rows.push(row);
    });    

    return (
      <span>

        <Modal
          container = {document.body}
          show = {this.show.confirm}
        >
          <Modal.Header>
            <Modal.Title>Warning!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You are about to delete this Data Row ({this.dataToDelete.name}) 
            Are you sure you want to do this?
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick = {this.cancelDelete}
            >
              No - Cancel
            </Button>
            <Button
              bsStyle="danger"
              onClick = {this.confirmDelete}
            >
              Yes - Delete
            </Button>
          </Modal.Footer>
        </Modal>

        <div
          className = {this.show.table}
        >
          <Panel
            bsStyle="info"
          > 
            <Panel.Heading>
              <Panel.Title>
                {this.title}
              </Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <Table 
                responsive  
                className = "ATable"
              >
                <thead>
                  <tr>
                    <th>Property 1</th>
                    <th>Property 2</th>
                    <th>&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  {rows}
                </tbody>
              </Table>
            </Panel.Body>
          </Panel>
        </div>

        <EditRowData
          controller = {this.props.controller}
          show = {this.show.editDataRow}
          data = {this.dataRow}
          conductor = {this.conductor}
          title = {this.editDataRowTitle}
        />
      </span>

    );
  }
});

module.exports = ATableMaint;
