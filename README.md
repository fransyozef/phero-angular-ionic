# Demo Gloomhaven campaign tracker
The goal of this repo/demo is to implement Phero (Full-stack type-safety with pure TypeScript) into an Angular project.
Rather than just create a TODO app, I decided to create a demo Gloomhaven Campaign tracker app.
This demo will cover

- Angular (TypeScript)
- Ionic framework
- Phero
- NodeJS project (using TypeScript)
- Node JSON DB (flatfile json database)

## NodeJS version
You will need a minimum of NodeJS 16

## Gloomhaven
Gloomhaven is a cooperative board game for one to four players designed by Isaac Childres.
You play a campaign with one up to four players. The campaign progress can be tracked using pen and paper.
I decided to create a demo digitally campaign tracker. Not all functionality of the game is implemented here. Maybe when I have some time, I can create a production app for this (yay another side project).

For more information: https://boardgamegeek.com/boardgame/174430/gloomhaven

## Directory structure
There are 2 main folders

```
|- api
|- app
```

The api folder is the backend folder using NodeJS.
The app folder is the frontend app using Angular Ionic.

## Installation
Open your terminal and navigate to the api folder and install the node modules:

```sh
npm install
```

And also navigate to the app folder and install the node modules:

```sh
npm install
```

## Phero
Phero is a Full-stack type-safety with pure TypeScript. Phero is using RPC to communicate between frontend and backend.

For more info : http://phero.dev

## Start Phero
Open your terminal and navigate to the root folder of the poject.
Next start Phero:

```sh
npx phero@latest
```
This will 
- start the Phero Api and Phero app
- generate the phero.generated file which will be used by the frontend app

Each time you edit something in the api folder, the phero.generated will be regenerated again and the frontend app is ready to use it.

## Start the frontend app
Open your terminal and navigate to the /app folder then start the app :

```sh
npm start
```

This will compile the frontend project and the app will be server at http://localhost:4200

The frontend app has hotreloading. This also means that every time you generate a new phero.generated file, the frontend app is ready to use it right away.


## Node JSON DB
To make it this project a bit interesting, I decided to use a flat file dabatase to mimick a real database rather than a mocked JSON server. This database is just a JSON file. The database is located in 

```
/api/gloomhaven-db.json
```

For more info : https://www.npmjs.com/package/node-json-db

## Kill all proceses on port 3030
Sometimes during development the Phero server could crash because of some errors you made in your code. In some instances, the Phero server cannot reboot again, because there is another instance of Phero running on port 3030 (default port for Phero server). IF this happens, this will save your life:

```sh
lsof -P | grep ':3030' | awk '{print $2}' | xargs kill -9
```

## Disclaimer
This project is as is. Don't use this as is on production. 
