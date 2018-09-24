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

  this.cancel = function() {
    self.controller.emit('cancelEditRowData');      
  };

  controller.EditRowData = {
    onFieldChange: function(inputObj) {
      console.log('onFieldChange - ' + inputObj.ref + '; ' + inputObj.value);
      self[inputObj.ref] = inputObj.value;
    }
  };

  this.handleKeyDown = function(e) {
    // enter key pressed
    if (e.charCode === 13) {
      self.saveRowData();
    }
  };

  this.saveRowData = function() {

    var id = self.props.data.id || '';

    // .. validate each data property, eg:

    if (typeof self.property_1 !== 'string' || self.property_1 === '') {
      controller.displayError('You must enter a Property 1');
      return;
    }

    // send save message
    //   response handler subscription - on('saveDataRow') - will be in parent component (ATableMaint)

    controller.send({
      type: 'saveDataRow',
      params: {
        id: id,
        property_1: self.property_1,
        property_2: self.property_2,
      }
    });

  };

  return controller;
};
