#!/bin/sh
set -e

BUCKET=bark-river-preorder-handle-options

echo "Deploying to $BUCKET"

yarn build

aws --profile krapacs s3 sync build/ s3://bark-river-preorder-handle-options
