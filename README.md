# Slack daily memes

Serverless based on github actions as a crone job for posting daily memes to a slack channel from `thecodinglove.com`
and any `reddit` channels you will assign to the `REDDIT_CHANNELS` in repo Secretes

## How to use it
1. Create a slack app https://api.slack.com/apps
2. Go to Slack apps `OAuth & Permissions` > `Bot Token Scopes` 
3. Give it permission `files:write`
4. Invite the app you created to the channel you want to post in memes `/invite @{YOUR_BOT_NAME}`
5. Fork this repo
6. Go to forked repo `Settings` > `Secretes`  https://github.com/{USERNAME}/slack-daily-memes/settings/secrets/actions
   1. Add `SLACK_TOKEN` : slack bot secret token
   2. Add `SLACK_CHANNELS` : channel names or ids comma separated
   3. Add `REPO` : repo name `{USERSNAME}/slack-daily-memes`
   4. Add `REPO_ACCESS_TOKEN`: [create GitHub token](https://github.com/settings/tokens/new) with permission `public_repo`
   5. Optional Add `REDDIT_CHANNELS`: to fetch memes from reddit channels you want comma seprated ex. `workchronicles,ProgrammerHumor`
---
P.S to make sure it is configured correctly go to https://github.com/{USERNAME}/slack-daily-memes/actions/workflows/main.yml
And clike `Run Workflow` to trigger it manualy.

