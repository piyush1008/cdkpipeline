import * as cdk from 'aws-cdk-lib';
//import { CodePipeline } from 'aws-cdk-lib/aws-events-targets';
//import { CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import {
  ShellStep,
  CodePipeline,
  CodeBuildStep,
  CodePipelineSource,
  ManualApprovalStep,
} from "aws-cdk-lib/pipelines";

export class CdkpipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'MyFirstPipeline', {
      pipelineName: 'MyPipeline',
      synth: new ShellStep('Synth',{
        input:CodePipelineSource.gitHub('piyush1008/cdkpipeline','main'),
        commands:['npx npm ci',
                  'npm run build',
                  'npx cdk synth']
      }),
    });
  }
}
