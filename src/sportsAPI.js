(function () {
  "use strict";

  var request = require('request');
  var querystring = require('querystring');
  var url = require('url');
  var path = require('path');
  var sprintf = require('sprintf').sprintf;

  var baseUrl = "http://10.17.1.111:80/jibosports";
  //var baseUrl = "http://localhost:6677/jibosports";

  var sportsAPI = {
    getGameResponse: function (gameParams, success, failure) {
      var postUrl = url.parse(baseUrl);
      postUrl.pathname = path.join(postUrl.path, "findgame");
      var payload = {
        rule: gameParams.rule,
        date: gameParams.date,
        team: gameParams.team
      };
      var options = {
          url: postUrl.format(),
          headers: {
              'User-Agent': 'request',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
      };
      request.post(options, function (error, response, body) {
            if (error) {
              failure(error, response);
            }
            else if (response.statusCode !== 200) {
                error = new Error(sprintf("Invalid response code returned getting game info: %s %s",
                    response.statusCode, response.statusMessage));
                failure(error, response);
            }
            else {
                success(JSON.parse(body));
            }
        });
    },

    getStandingsResponse: function(gameParams, success, failure) {
      var postUrl = url.parse(baseUrl);
      postUrl.pathname = path.join(postUrl.path, "findstanding");
      var payload = {
        team: gameParams.team
      };
      var options = {
          url: postUrl.format(),
          headers: {
              'User-Agent': 'request',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
      };
      request.post(options, function (error, response, body) {
            if (error) {
              failure(error, response);
            }
            else if (response.statusCode !== 200) {
                error = new Error(sprintf("Invalid response code returned getting standings info: %s %s",
                    response.statusCode, response.statusMessage));
                failure(error, response);
            }
            else {
                success(JSON.parse(body));
            }
        });
    },

    findGameResponse: function (gameParams, success, failure) {
      var postUrl = url.parse(baseUrl);
      postUrl.pathname = path.join(postUrl.path, "findgamebetween");
      var payload = {
        rule: gameParams.rule,
        teams: gameParams.teams
      };
      var options = {
          url: postUrl.format(),
          headers: {
              'User-Agent': 'request',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
      };
      request.post(options, function (error, response, body) {
            if (error) {
              failure(error, response);
            }
            else if (response.statusCode !== 200) {
                error = new Error(sprintf("Invalid response code returned getting game info: %s %s",
                    response.statusCode, response.statusMessage));
                failure(error, response);
            }
            else {
                success(JSON.parse(body));
            }
        });
    }
  };

  module.exports = sportsAPI;
})(module.exports);
