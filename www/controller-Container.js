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

  this.onNewProps = function(newProps) {
    self.hideContainer = (newProps.status !== self.props.eventKey);
  };

  // display the overview panel when first rendered after login

  this.hideContainer = this.props.hideByDefault;

  return controller;
};
