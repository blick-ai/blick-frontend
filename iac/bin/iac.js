#!/usr/bin/env node
const cdk = require('aws-cdk-lib')
const { IacStack } = require('../lib/iac-stack')

const app = new cdk.App()

const env = {
  account: process.env.AWS_ACCOUNT_ID,
  region: process.env.AWS_REGION
}

const stackName = process.env.STACK_NAME || 'BlickWebStackFrontdev'

new IacStack(app, stackName, { env })