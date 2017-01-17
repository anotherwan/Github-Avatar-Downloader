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

  request(options, (error, response, body) => {
    let parsedBody = JSON.parse(body)
      parsedBody.forEach((user) => {
        downloadImageByURL(user.avatar_url, user.login)
      })
  })
}

if (args.length !== 2) {
  console.log("Error: There should only be 2 arguments: 1) the repository owner and 2) the repository name!")
} else {
  getRepoContributors(args[0], args[1], (err, result) => {
    console.log("Errors: ", err)
    console.log("Result:", result)
  })
}

function downloadImageByURL(imageUrl, login) {
  request.get(imageUrl)
    .pipe(fs.createWriteStream(`avatarsTemp/${login}.jpg`))
}
