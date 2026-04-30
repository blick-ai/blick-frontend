const cdk = require('aws-cdk-lib')
const s3 = require('aws-cdk-lib/aws-s3')
const amplify = require('aws-cdk-lib/aws-amplify')
const iam = require('aws-cdk-lib/aws-iam')
const { Construct } = require('constructs')

class IacStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props)

    const stage = process.env.GITHUB_REF_NAME || 'dev'

    cdk.Tags.of(this).add('environment', 'GRADUACAO')
    cdk.Tags.of(this).add('project', 'TCC')
    cdk.Tags.of(this).add('group', 'CMD04')
    cdk.Tags.of(this).add('creator', 'MAUROROCHA_22006672')
    cdk.Tags.of(this).add('owner', 'BOSSINI')

    const s3Bucket = new s3.Bucket(this, 'BlickWebBucket' + stage, {
      versioned: false,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      accessControl: s3.BucketAccessControl.PRIVATE,
      autoDeleteObjects: true
    })

    const amplifyRole = new iam.Role(this, 'BlickWebAmplifyRole' + stage, {
      roleName: `aluno_22.00667-2_blickweb_amplify_s3_${stage}`,
      assumedBy: new iam.ServicePrincipal('amplify.amazonaws.com'),
      description: 'Role para o Amplify acessar o bucket S3 do blick-web'
    })

    amplifyRole.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: [
          's3:GetObject',
          's3:ListBucket'
        ],
        resources: [
          s3Bucket.bucketArn,
          s3Bucket.arnForObjects('*')
        ]
      })
    )

    const amplifyApp = new amplify.CfnApp(this, 'BlickWebAmplifyApp' + stage, {
      name: `blick-web-${stage}`,
      description: `Blick Web Frontend - ${stage} | TCC CMD04`,
      iamServiceRole: amplifyRole.roleArn,
      customRules: [
        {
          source: '</^((?!\\.(css|gif|ico|jpg|js|png|txt|svg|woff|ttf|map|json)$).)*$/>',
          target: '/index.html',
          status: '200'
        }
      ],
      tags: [
        { key: 'environment', value: 'GRADUACAO' },
        { key: 'project', value: 'TCC' },
        { key: 'group', value: 'CMD04' },
        { key: 'creator', value: 'MAUROROCHA_22006672' },
        { key: 'owner', value: 'BOSSINI' }
      ]
    })

    const amplifyBranch = new amplify.CfnBranch(
      this,
      'BlickWebAmplifyBranch' + stage,
      {
        appId: amplifyApp.attrAppId,
        branchName: stage === 'prod' ? 'main' : 'develop',
        enableAutoBuild: false,
        stage: stage === 'prod' ? 'PRODUCTION' : 'DEVELOPMENT',
        tags: [
          { key: 'environment', value: 'GRADUACAO' },
          { key: 'project', value: 'TCC' },
          { key: 'group', value: 'CMD04' },
          { key: 'creator', value: 'MAUROROCHA_22006672' },
          { key: 'owner', value: 'BOSSINI' }
        ]
      }
    )

    new cdk.CfnOutput(this, 'BlickWebBucketName' + stage, {
      value: s3Bucket.bucketName,
      description: 'Nome do bucket S3 do blick-web'
    })

    new cdk.CfnOutput(this, 'BlickWebAmplifyAppId' + stage, {
      value: amplifyApp.attrAppId,
      description: 'ID do Amplify App'
    })

    new cdk.CfnOutput(this, 'BlickWebAmplifyDomain' + stage, {
      value: `${amplifyBranch.branchName}.${amplifyApp.attrDefaultDomain}`,
      description: 'URL pública do Amplify'
    })
  }
}

module.exports = { IacStack }