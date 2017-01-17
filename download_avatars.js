'use strict'

const request = require('request')
const fs = require('fs')
const tokens = require('./.env')

let args = process.argv.slice(2)


function getRepoContributors(repoOwner, repoName, cb) {
  let options = {
    url: `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
              'User-Agent': "Github Avatar Downloader - Student Project"
              }
    }

  request(options, function(error, response, body) {
    let parsedBody = JSON.parse(body)
      parsedBody.forEach((user) => {
        downloadImageByURL(user.avatar_url, user.login)
      })
  })
}

if (args.length !== 2) {
  console.log("Error: an argument was not entered!")
} else {
  getRepoContributors(args[0], args[1], function(err, result) {
    console.log("Errors: ", err)
    console.log("Result:", result)
  })
}

function downloadImageByURL(imageUrl, login) {
  request.get(imageUrl)
    .pipe(fs.createWriteStream(`avatarsTemp/${login}.jpg`))
}
