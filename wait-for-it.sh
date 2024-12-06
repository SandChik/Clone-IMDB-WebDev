#!/usr/bin/env bash
# wait-for-it.sh

set -e

host="$1"
shift
port="$1"
shift

until nc -z "$host" "$port"; do
  >&2 echo "Database is unavailable - sleeping"
  sleep 1
done

>&2 echo "Database is up - executing command"
exec "$@"