#!/bin/sh

git filter-branch -f --env-filter '
OLD_EMAIL_OKO="okomwezo@gmail.com"
OLD_EMAIL_BOT="49699333+dependabot[bot]@users.noreply.github.com"
CORRECT_NAME="Raphasha27"
CORRECT_EMAIL="raphasha27@gmail.com"

if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL_OKO" ] || [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL_BOT" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL_OKO" ] || [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL_BOT" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
