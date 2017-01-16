'use strict'

const request = require('request')

function getRepoContributors(repoOwner, repoName, cb) {
  request("https://api.github.com/repos/jquery/jquery/contributors")
    .on('error', function (err) {
      throw err
    })
    .on('response', function (response) {
      console.log('Downloading...')
      console.log('Response Status Code:', response.statusMessage, 'Content Type:', response.headers['content-type'])
    })
}


getRepoContributors("jquery", "jquery", function(err, results) {
  console.log("Errors:", err)
  console.log("Result:", result)
})
