#!/bin/sh

git filter-branch -f --env-filter '
CORRECT_NAME="Raphasha27"
CORRECT_EMAIL="raphasha27@gmail.com"

# Re-attribute everything that isnt you
if [ "$GIT_AUTHOR_EMAIL" != "$CORRECT_EMAIL" ] || [ "$GIT_COMMITTER_EMAIL" != "$CORRECT_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
