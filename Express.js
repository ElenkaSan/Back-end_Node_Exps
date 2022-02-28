const express = require('express');
const ExpressError = require('./expressError')
const app = express();

const {notNumber, findMode, findMean, findMedian} = require('./helperExpress');

app.get('/', function(req, res, next) {
  return res.send('Hello World!');
});

app.get('/mean', function(req, res, next) {
    if (!req.query.nums) {
        throw new ExpressError('Numbers are required with a comma-separated list', 400)
    }
    let strings = req.query.nums.split(',');
    let nums = notNumber(strings);
      if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }
    let result = {
        operation: "mean",
        result: findMean(nums)
    }
    return res.send(result);
    });

    app.get('/median', function(req, res, next) {
      if (!req.query.nums) {
        throw new ExpressError('Numbers are required with a comma-separated list', 400)
      }
      let strings  = req.query.nums.split(',');
      let nums = notNumber(strings);
      if (nums instanceof Error) {
        throw new ExpressError(nums.message);
      }
      let result = {
        operation: "median",
        result: findMedian(nums)
      }  
      return res.send(result);
    });
    
    app.get('/mode', function(req, res, next) {
      if (!req.query.nums) {
        throw new ExpressError('Numbers are required with a comma-separated list', 400)
      }
      let strings = req.query.nums.split(',');
      let nums = notNumber(strings);
      if (nums instanceof Error) {
        throw new ExpressError(nums.message);
      }
      let result = {
        operation: "mode",
        result: findMode(nums)
      }
      return res.send(result);
    });

// 404 handler
app.use(function (req, res, next) {
    const notFoundError = new ExpressError("Not Found", 404);
    return next(notFoundError)
  });
  
// Error handler
  app.use(function(err, req, res, next) {
    // the default status is 500 Internal Server Error // I did 400, how it asked '400 Bad Request'
    let status = err.status || 400;
    let message = err.message;
  
    // set the status and alert the user
    return res.status(status).json({
      error: {message, status}
    });
  });

  // end generic handler
  app.listen(3000, function() {
    console.log('Server is listening on port 3000');
  });
  // end app.listen
  