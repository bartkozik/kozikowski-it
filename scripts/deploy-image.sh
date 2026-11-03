#!/usr/bin/env bash
set -euo pipefail
: "${DEPLOY_HOST:?Missing DEPLOY_HOST}"
: "${DEPLOY_SSH_KEY:?Missing DEPLOY_SSH_KEY}"
: "${DEPLOY_KNOWN_HOSTS:?Missing DEPLOY_KNOWN_HOSTS}"
: "${IMAGE_DIGEST:?Missing IMAGE_DIGEST}"
[[ "$DEPLOY_HOST" =~ ^[a-zA-Z0-9][a-zA-Z0-9.-]*$ ]]
[[ "$IMAGE_DIGEST" =~ ^sha256:[a-f0-9]{64}$ ]]
umask 077
key_dir=$(mktemp -d)
trap 'rm -rf "$key_dir"' EXIT
printf '%s\n' "$DEPLOY_SSH_KEY" > "$key_dir/key"
printf '%s\n' "$DEPLOY_KNOWN_HOSTS" > "$key_dir/known_hosts"
ssh -T -o BatchMode=yes -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes -o UserKnownHostsFile="$key_dir/known_hosts" -o ConnectTimeout=20 -o ServerAliveInterval=15 -o ServerAliveCountMax=3 -i "$key_dir/key" "portfolio-deploy@$DEPLOY_HOST" "deploy $IMAGE_DIGEST"
