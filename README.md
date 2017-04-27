# LAS JSON parser
_for [Heroku](https://www.heroku.com/) deployment_

### ACKNOWLEDGMENTS
Many thanks to [Alan Smith](https://github.com/alanbsmith/react-node-example) for his react-node example. 


### OVERIVEW
Displays LAS 2.0 files that have been converted to JSON.

### Production Build

To build your production assets and run the server:
```
$ npm start
```

### CHANGELOG

### DEPLOYING TO HEROKU
This app is set up for deployment to Heroku!

_This assumes you have already have a Heroku account and have the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed_
```
$ heroku login
$ heroku create -a name-of-your-app
$ git push heroku master
$ heroku open
```

Heroku will follow the `build` command in your `package.json` and compile assets with `webpack.prod.config.js`. It runs the Express web server in `server.js`.

If you're unfamiliar with Heroku deployment (or just need a refresher), they have a really great walkthrough [here](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction).

### REDUX STARTER
If you're looking for a similar, minimalistic Redux starter, I would recommend Marc Garreau's [here](https://github.com/marcgarreau/redux-starter)
