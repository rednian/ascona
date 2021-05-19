# Hygienization.com
    This repository contain installation for  fleet hygienization web application and RESTful API.

## Requirements
    Node.js v14.16.1 or higher
    NPM 7.8.0 or higher
    GIT (stable version)


### Running Local
    I assume the requirements mentioned above are ready in your local machine.
    
    If so, then follow these several steps:

    ```bash
    $ cd ~/path-to-your-working-directory
    $ git clone https://chris1091@bitbucket.org/chris1091/hygienization.git
    $ cd hygienization
    ```

    Install all dependencies, run:

```
npm install
```


### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Project Deployment

    - For the first deployment to a new server (Plesk Server).

    I assume you already login to your plesk server.

    1. In the Dashboard click the Websites & Domains menu in the left side.

    2. Select the Node.js option and you will see inside the node.js menu the following list:
        
        * Node.js Version
        * Document Root
        * Application Mode
        * Application URL
        * Application Root
        * Application Startup File

        * Node.js Version - Select the latest version of node.js

        * Document Root - Point your directory to this path: /fleet.hygienization.com/dist     

        * Application Mode - By default it is selected as production mode. you can select Deployment or Production.

        * Application URL - http://fleet.hygienization.com - This the domain name of your application.  You can change in the main menu. 

        *  Application Root - Point your directory to /fleet.hygienization.com

        * Application Startup File - Since we are using vuejs point this to src/main.js


    - If you done all the configuration correctly under step 2, you should see the the following options:

        * Restart App
        * NPM Install 
        * Run script 
        * Disable Node.js

    
    3. Select NPM Install

    4. Select Run script, there will be a popup dialog.

    5. In the textfield (script name and parameters) write 'build' and hit Run button. This will compile the application.

    
    - For Continuous Integration and Continuous Delivery (CI/CD). 

       I assume you already update the files by FTP or by  Git.

       You can start from step 3 if you have new dependecies otherwise you can start from step 4.


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
