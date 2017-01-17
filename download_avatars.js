'use strict'

const request = require('request')
const tokens = require('./.env')


function getRepoContributors(repoOwner, repoName, cb) {
  let options = {
    url: `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
              'User-Agent': "Github Avatar Downloader - Student Project"
              }
    }

  request(options, function(error, response, body) {
    let parsedBody = JSON.parse(body)
      for (let i = 0; i < parsedBody.length; i++) {
        console.log(parsedBody[i].avatar_url)
      }
    })
  }
// }

getRepoContributors("jquery", "jquery", function(err, results) {
  console.log("Errors:", err)
  console.log("Result:", result)
})
