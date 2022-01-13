const axios = require("axios");
const { uploadFileToSlack } = require("./slack");

const LAST_REDDIT_IDS = process.env.LAST_REDDIT_IDS || ""
const REDDIT_CHANNELS = process.env.REDDIT_CHANNELS || ""
const BASE_URL = "https://www.reddit.com/r"

const fixImgUrl = url => {
    return url.replace(/amp;/g, "")
}

const getLastPost = async (channelUrl) => {
    const response = await axios(channelUrl)
    const lastPost = response.data.data.children[0].data
    const imageUrl = fixImgUrl(lastPost.preview.images[0].source.url)
    return { id: lastPost.id, title: lastPost.title, imageUrl }
}

async function main() {
    if (REDDIT_CHANNELS === "") return ""
    const channelsUrls = REDDIT_CHANNELS.split(",").map(channel => `${ BASE_URL }/${ channel }.json`)
    const ChannelsLastId = LAST_REDDIT_IDS.split(",")
    let resultIds = []
    for (let i = 0; i < channelsUrls.length; i++) {
        const { id, title, imageUrl } = await getLastPost(channelsUrls[i])
        if (ChannelsLastId.length <= i || id !== ChannelsLastId[i]) await uploadFileToSlack(imageUrl, title)
        resultIds.push(id)
    }
    return resultIds.join(",")
}


main().then((ids) => {
    console.log(ids)
    process.exit(0)
}).catch(err => {
    console.log("Failed", err)
    process.exit(1)
})
