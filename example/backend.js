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
