# Slack daily memes

A script for posting daily meme from https://thecodinglove.com/ website

## How to use it
1. Create a slack app https://api.slack.com/apps
2. Go to `OAuth & Permissions` > `Bot Token Scopes` 
3. Give it permission `files:write`
4. Invite the app you created to the channel you want to post in memes `/invite @{YOUR_BOT_NAME}`
5. Fork this repo
6. Go to forked repo `Settings` > `Secretes`  https://github.com/{USERNAME}/slack-daily-memes/settings/secrets/actions
7. Add 2 env vars `SLACK_TOKEN` , `SLACK_CHANNELS` to your secrets

