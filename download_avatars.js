'use strict'

const request = require('request')
const fs = require('fs')
const tokens = require('./.env')

let args = process.argv.slice(2)

//This function takes in the options object (includes url and headers) and a cb. You receive the body (users), parsed into objects within an array, and for each user, it downloads the avatar url and the login by calling the callback function 'downloadImageByURL'.

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

//Call the function getRepoContributors. If there are missing arguments in the command line, throw an error.

if (args.length !== 2) {
  console.log("Error: There should only be 2 arguments: 1) the repository owner and 2) the repository name!")
} else {
  getRepoContributors(args[0], args[1], (err, result) => {
    console.log("Errors: ", err)
    console.log("Result:", result)
  })
}

//Callback function that takes the image url and login and saves the images of the repo to a file called avatarsTemp.
function downloadImageByURL(imageUrl, login) {
  request.get(imageUrl)
    .pipe(fs.createWriteStream(`avatarsTemp/${login}.jpg`))
}
