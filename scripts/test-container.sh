#!/usr/bin/env bash
set -euo pipefail
image=${1:?Usage: test-container.sh IMAGE}
container=$(docker run --detach --read-only --cap-drop=ALL --security-opt=no-new-privileges --tmpfs /tmp:rw,noexec,nosuid,size=64m --tmpfs /app/.next/cache:rw,nosuid,uid=1000,gid=1000,size=128m --publish 127.0.0.1::3000 "$image")
cleanup() {
  status=$?
  if [ "$status" -ne 0 ]; then docker logs "$container"; fi
  docker rm --force "$container" >/dev/null
  exit "$status"
}
trap cleanup EXIT
healthy=false
for attempt in $(seq 1 45); do
  status=$(docker inspect --format '{{.State.Health.Status}}' "$container")
  if [ "$status" = healthy ]; then healthy=true; break; fi
  if [ "$status" = unhealthy ]; then break; fi
  sleep 2
done
if [ "$healthy" != true ]; then exit 1; fi
port=$(docker inspect --format '{{(index (index .NetworkSettings.Ports "3000/tcp") 0).HostPort}}' "$container")
node scripts/smoke-container.mjs "http://127.0.0.1:$port"
