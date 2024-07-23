#!/bin/sh

# replace --identity-pool with real one
AWS_PROFILE=cb-stage aws cognito-identity list-identities --identity-pool-id us-east-1:6a6ae9ab-3f0d-4642-812f-22222222 --max-results 4 
