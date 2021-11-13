const { parse } = require('node-html-parser')
const axios = require("axios")
const { WebClient } = require('@slack/web-api')


const SLACK_CHANNELS = process.env.SLACK_CHANNELS
const TOKEN = process.env.SLACK_TOKEN
const LAST_POST_TITLE = process.env.LAST_POST

const BASE_URL = 'https://thecodinglove.com'

const client = new WebClient(TOKEN)

const uploadFileToSlack = async (fileUrl, title) => {
    const file = await axios({ method: 'get', url: fileUrl, responseType: 'stream' })

    await client.files.upload({
        channels: SLACK_CHANNELS,
        filename: title,
        file: file.data
    });
}

const getPost = async (random = false) => {
    const postsUrl = random ? `${ BASE_URL }/random` : BASE_URL
    const response = await axios(postsUrl)
    const root = parse(response.data)
    const title = root.querySelector(`.blog-post h1`).text.trim()
    const fileObj = root.querySelector('.blog-post-content object')
    if (title === LAST_POST_TITLE || !fileObj) return await getPost(true)
    return { title, fileUrl: fileObj.rawAttributes.data, random }
}

async function main() {
    const { title, fileUrl, random } = await getPost()
    await uploadFileToSlack(fileUrl, title)
    return random ? LAST_POST_TITLE : title
}

main().then((title) => {
    console.log(title)
    process.exit(0)
}).catch(err => {
    console.log("Failed", err)
    process.exit(1)
})
