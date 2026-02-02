#!/bin/sh

git filter-branch -f --env-filter '
CORRECT_NAME="Raphasha27"
CORRECT_EMAIL="raphasha27@gmail.com"

# Re-attribute everything that isnt you
case "$GIT_AUTHOR_NAME" in
    *"dependabot"*|*"Oko"*)
        export GIT_AUTHOR_NAME="$CORRECT_NAME"
        export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
        ;;
esac

case "$GIT_COMMITTER_NAME" in
    *"dependabot"*|*"Oko"*)
        export GIT_COMMITTER_NAME="$CORRECT_NAME"
        export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
        ;;
esac

if [ "$GIT_AUTHOR_EMAIL" != "$CORRECT_EMAIL" ] && [ "$GIT_AUTHOR_EMAIL" != "raphashakoketso69@gmail.com" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi

if [ "$GIT_COMMITTER_EMAIL" != "$CORRECT_EMAIL" ] && [ "$GIT_COMMITTER_EMAIL" != "raphashakoketso69@gmail.com" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
