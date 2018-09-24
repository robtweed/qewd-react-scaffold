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

  var self = this;

  this.table = [];
  this.show = {
    table: 'visible',
    editDataRow: 'hidden',
    confirm: false
  }

  this.dataRow = {
    property_1: '',
    property_2: ''
  };
  this.dataToDelete = {
    id: '',
    name: ''
  };
  this.editDataRowTitle = 'Add a New Data Row';

  // handler for QEWD message response event resulting from getData requests

  controller.on('getData', function(responseObj) {
    if (!responseObj.message.error) {
      self.table = responseObj.message.dataRow;
      self.setState({
        status: 'gotData'
      });
    }
  });

  controller.send({
    type: 'getData'
  });

  this.addDataRow = function() {
    self.show = {
      table: 'hidden',
      editDataRow: 'visible',
      confirm: false
    }

    // initialise new data row properties.  Empty id signals new record to back-end

    self.table = {
      id: '',
      property_1: '',
      property_2: ''
    };

    self.editDataRowTitle = 'Add a New Data Row';

    self.setState({
      status: 'addDataRow'
    });
  };

  // bubbled-up event from EditDataRow

  controller.on('cancelAddRowData', function() {
    self.show = {
      table: 'visible',
      editDataRow: 'hidden'
    }
    self.setState({
      status: 'cancelAddClient'
    });
  });

  // bubbled-up event from ATableRow

  controller.on('editRowData', function(data) {
    self.show = {
      table: 'hidden',
      editDataRow: 'visible',
      confirm: false
    };
    self.dataRow = data;
    self.editClientTitle = 'Edit Data';

    self.setState({
      status: 'editRowData'
    });
  });

  // bubbled-up event from ATableRow

  controller.on('deleteRowData', function(data) {
    self.show = {
      table: 'visible',
      editDataRow: 'hidden',
      confirm: true
    };
    
    self.dataToDelete = {
      id: data.id,
      name: data.property_1 // or whatever is the visually identifying relevant property / text
    };
    self.setState({
      status: 'confirmDeleteRowData'
    });
  });

  // event handler for saveDataRow response.  Request message was sent by EditRowData

  controller.on('saveDataRow', function(responseObj) {
    if (!responseObj.message.error) {
      self.show = {
        table: 'visible',
        editDataRow: 'hidden',
        confirm: false
      }

      // fetch the data again, which will force a re-render of the updated data set

      controller.send({
        type: 'getData'
      });
    }
  });


  // from modal confirmation window in ATableMaint

  this.cancelDelete = function() {
    self.show = {
      table: 'visible',
      editDataRow: 'hidden',
      confirm: false
    };
    self.setState({
      status: 'deleteCancelled'
    });
  };

  // event handler for deleteDataRecord response.  Request message was sent here (see below)

  controller.on('deleteDataRecord', function() {
    self.show = {
      table: 'visible',
      editDataRow: 'hidden',
      confirm: false
    }

    // fetch data from backend, which will force a re-render of new dataset with deleted record removed

    controller.send({
      type: 'getData'
    });
  });

  // from modal confirmation window in ATableMaint

  this.confirmDelete = function() {
    controller.send({
      type: 'deleteDataRecord',
      params: {
        id: self.dataToDelete.id
      }
    });
  };

  return controller;
};
