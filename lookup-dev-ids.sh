#!/bin/sh

# replace --identity-pool with real one
AWS_PROFILE=cb-stage aws cognito-identity lookup-developer-identity  --identity-pool-id us-east-1:626fe9ab-3e0c-4642-812f-6666666 --identity-id $1 --max-results 20
