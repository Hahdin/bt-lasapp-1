# LAS JSON parser
_for [Heroku](https://www.heroku.com/) deployment_
-- Might be found at [Las App](https://las-app.herokuapp.com/) link.

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
I am using axios to get the json file. axios depends on a native ES6 Promise implementation.
To support IE I will use babel's pollyfill'
