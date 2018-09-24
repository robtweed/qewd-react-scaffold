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

  console.log('this.props.formModule = ' + this.props.formModule);

  if (this.props.formModule && this.props.value && this.props.fieldname) {
    controller[this.props.formModule].onFieldChange({
      value: self.props.value,
      ref: self.props.fieldname
    });
  }

  this.newProps = function(newProps) {
    self.value = newProps.value || '';

    if (newProps.formModule && newProps.value && newProps.fieldname) {
      controller[newProps.formModule].onFieldChange({
        value: newProps.value,
        ref: newProps.fieldname
      });
      console.log('updated controller[' + newProps.formModule + ']: value = ' + newProps.value);
    }

  };

  this.handleChange = function(e) {
    // update display of field in input component:

    var fieldName = self.props.fieldname;
    self.value = e.target.value;

    self.setState({
      status: 'updated'
    });

    // and then pass up to parent component:

    controller[self.props.formModule].onFieldChange({
      value: self.value,
      ref: fieldName
    });
  };

  this.validationState = function() {
    if (self.value.length === 0) return 'error';
  };

  this.autofocus = this.props.focus;
  this.value = this.props.value || '';

  return controller;
};
