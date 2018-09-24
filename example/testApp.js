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

  22 September 2018

*/

module.exports = {

  handlers: {
    login: function(messageObj, session, send, finished) {
      var password = messageObj.params.password;
      if (!password || password === '') {
        finished({error: 'You must enter a password'});
        return;
      }

      if (true) {
        // no authentication database set up, so use QEWD management password

        if (password === this.userDefined.config.managementPassword) {
          session.timeout = 20 * 60;
          session.authenticated = true;
          finished({ok: true});    
        }
        else {
          finished({error: 'Invalid login attempt'});
        }
        return;
      }
      else {
        // use your own authentication credentials document
        var username = messageObj.params.username;
        if (!username || username === '') {
          finished({error: 'You must enter a username'});
          return;
        }
        var userCredentials = credentialsDoc.$(username);
        if (!userCredentials.exists) {
          // username not recognised
          finished({error: 'Invalid login attempt'});
          return;
        }
        if (digest(password) !== userCredentials.$('password').value) {
          // username ok but wrong password
          finished({error: 'Invalid login attempt'});
          return;
        }
        session.timeout = 20 * 60;
        session.authenticated = true;
        finished({ok: true});
        return;
      }
    }
  }
};
