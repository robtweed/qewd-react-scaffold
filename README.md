# qewd-react-scaffold: Quick and Easy Scaffolding for React/React Bootstrap/WebSocket QEWD.js Apps
 
Rob Tweed <rtweed@mgateway.com>  
25 January 2017, M/Gateway Developments Ltd [http://www.mgateway.com](http://www.mgateway.com)  

Twitter: @rtweed

Google Group for discussions, support, advice etc: [http://groups.google.co.uk/group/enterprise-web-developer-community](http://groups.google.co.uk/group/enterprise-web-developer-community)

# What is it?

A simple set of React components that create the basic pattern for a QEWD.js/React Bootstrap/WebSocket
application, based around the UI look and feel used by the QEWD-Monitor application.

It includes:

- everything needed to initialise and register your QEWD.js back-end session
- a customisable banner (allowing you to define your own Nav options)
- a customisable login modal panel
- a logout Nav option
- a main content panel, which provides the starting point for your own application

The benefit is that using this scaffold cuts out the main work in creating the framework and
lead-in for your applications (assuming you're happy with the UI look and feel).


# How to Use

1) Clone the repository.

2) Create a new QEWD.js application folder, eg:

     cd ~/qewd/www
     mkdir myNewApp

3) Copy the contents of the repo's www directory into your new application folder

4) Create a file named app.js in your application folder - this will define your configuration
for your particular application.

See the repo's /example directory for a worked example.  This contains:

- an example app.js, showing how you define an application
- backend.js which is an example of the back-end QEWD.js module for your application, defining the message handler functions.  Copy this to your ~/qewd/node_modules directory and rename it to correspond with the application name you define in your app.js file's *applicationName* property.


In the app.js example you'll see this section:

      navs: [
        {
          text: 'Main',
          eventKey: 'main',
          default: true,  // default=true to make this display by default
          panel: {
            title: 'This is the Main Panel',
            bsStyle: 'warning',
            contentComponent: require('./TestContent')
          }
        }, ...etc

This adds a Nav to the banner with the text "Main" and makes it the default main panel to appear after a successful login.  The contents of the panel are defined by a React component named TestContent (the name of the module is up to you).  In the /example directory you'll see a simple version of this TestContent.js component - it simply creates a grid display with 3 empty columns.  

You build out your application from this initial component and via any other Navs that you want to define.

# Additional Stuff you'll Need

You'll need to be able to compile your application's components into a single bundle.js file.  See
[this presentation](https://www.slideshare.net/robtweed/ewd-3-training-course-part-37-building-a-reactjs-application-with-ewdxpress-part-4)

In summary, you'll need to do the following to install the necessary stuff:

- You'll need to have installed QEWD.js of course
- Do the following:

        cd ~/qewd
        npm install react react-dom babelify babel-preset-react react-bootstrap 
        npm install react-toastr react-select socket.io-client
        npm install jquery ewd-client ewd-react-tools qewd-react
        npm install -g browserify
        npm install -g uglify-js

- Switch to your application folder, eg:

        cd ~/qewd/www/myNewApp

- Then:

        npm install babel-preset-es2015


That's usually enough to get you going.

To bundle your application:

        cd ~/qewd/www/myNewApp
        browserify -t [ babelify --compact false --presets [es2015 react] ] app.js > bundle.js

You should now see bundle.js in the ~/qewd/www/myNewApp folder

Try the application out in your browser:

        http://192.168.1.100:8080/myNewApp/index.html

        Note: Change the IP address and port to match your QEWD.js setup.

Note: every time you make a change to your components, you must re-bundle.


## License

 Copyright (c) 2017 M/Gateway Developments Ltd,                           
 Redhill, Surrey UK.                                                      
 All rights reserved.                                                     
                                                                           
  http://www.mgateway.com                                                  
  Email: rtweed@mgateway.com                                               
                                                                           
                                                                           
  Licensed under the Apache License, Version 2.0 (the "License");          
  you may not use this file except in compliance with the License.         
  You may obtain a copy of the License at                                  
                                                                           
      http://www.apache.org/licenses/LICENSE-2.0                           
                                                                           
  Unless required by applicable law or agreed to in writing, software      
  distributed under the License is distributed on an "AS IS" BASIS,        
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
  See the License for the specific language governing permissions and      
   limitations under the License.      




