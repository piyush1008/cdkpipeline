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
import {
  Stage,
  Stack,
  Duration,
  StackProps,
  DefaultStackSynthesizer,
} from "aws-cdk-lib";
import {
  BuildSpec,
  LinuxBuildImage,
  BuildEnvironmentVariableType,
} from "aws-cdk-lib/aws-codebuild";

export class CdkpipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new CodePipeline(this, 'MyFirstPipeline', {
      pipelineName: 'MyPipeline',
      codeBuildDefaults: {  
        buildEnvironment: {      //this  is done for env sync up
          buildImage: LinuxBuildImage.STANDARD_5_0,
        },
        timeout: Duration.minutes(480),
      },
      synth: new ShellStep('Synth',{
        input:CodePipelineSource.gitHub('piyush1008/cdkpipeline','main'),
        commands:[
                  'node --version',
                  'npm ci',
                  'npm run build',
                  'npx cdk synth']
      }),
    });
  }
}
