const axios = require("axios");
const { uploadFileToSlack } = require("./slack");

const LAST_REDDIT_ID = process.env.LAST_REDDIT_ID


const fixImgUrl = url => {
    return url.replace(/amp;/g, "")
}

const getLastPost = async () => {
    const response = await axios('https://www.reddit.com/r/workchronicles.json')
    const lastPost = response.data.data.children[0].data
    const imageUrl = fixImgUrl(lastPost.preview.images[0].source.url)
    return { id: lastPost.id, title: lastPost.title, imageUrl }
}

async function main() {
    const { id, title, imageUrl } = await getLastPost()
    if (id !== LAST_REDDIT_ID) await uploadFileToSlack(imageUrl, title)
    return id
}


main().then((id) => {
    console.log(id)
    process.exit(0)
}).catch(err => {
    console.log("Failed", err)
    process.exit(1)
})
