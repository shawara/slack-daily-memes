const {parse} = require('node-html-parser')
const axios = require("axios")
const {WebClient} = require('@slack/web-api')


const SLACK_CHANNELS = process.env.SLACK_CHANNELS
const TOKEN = process.env.SLACK_TOKEN

const client = new WebClient(TOKEN)

const uploadFileToSlack = async (fileUrl, title) => {
    const file = await axios({method: 'get', url: fileUrl, responseType: 'stream'})

    await client.files.upload({
        channels: SLACK_CHANNELS,
        filename: title,
        file: file.data
    });
}

const getTodayPost = async () => {
    const response = await axios('https://thecodinglove.com/random');
    const root = parse(response.data)
    const title = root.querySelector('.blog-post-title').text
    const fileUrl = root.querySelector('.blog-post-content object').rawAttributes.data
    return {title, fileUrl};
}

async function main() {
    const post = await getTodayPost()
    await uploadFileToSlack(post.fileUrl, post.title)
}

main().then(() => {
    console.log("Done Successfully")
    process.exit(0)
}).catch(err => {
    console.log("Failed", err)
    process.exit(1)
})
