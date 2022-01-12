const axios = require("axios")
const { WebClient } = require('@slack/web-api')


const SLACK_CHANNELS = process.env.SLACK_CHANNELS
const TOKEN = process.env.SLACK_TOKEN


const client = new WebClient(TOKEN)

const uploadFileToSlack = async (fileUrl, title) => {
    const file = await axios({ method: 'get', url: fileUrl, responseType: 'stream' })

    await client.files.upload({
        channels: SLACK_CHANNELS,
        filename: title,
        file: file.data
    });
}

module.exports = {
    uploadFileToSlack
}