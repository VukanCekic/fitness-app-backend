import * as apigateway from "@aws-cdk/aws-apigateway";
import * as lambda from "@aws-cdk/aws-lambda";
import * as cdk from "@aws-cdk/core";
import * as path from "path";
require("dotenv").config();

interface WeatherStackProps extends cdk.StackProps {
  systemSlug: string;
}

export interface MyClubsLambdaProps {
  /**
   * Name of the handler for the function.
   * Put a "handler" method in a file under handler/<handlerName>/<handlerName>.ts
   */
  handlerName: string;
  lambdaOpts?: lambda.FunctionOptions; // they aren't included directly in MyClubsLambdaProps so that when using the class you'll first see the custom fields
}

export class MyClubsLambda extends lambda.Function {
  constructor(scope: cdk.Stack, id: string, props: MyClubsLambdaProps) {
    super(scope, id, {
      ...props.lambdaOpts,
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: `${props.handlerName}.handler`,
      code: lambda.Code.fromAsset(path.join("dist", props.handlerName)),
    });
  }
}

export class WeatherStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props: WeatherStackProps) {
    super(scope, id, props);

    const getWeatherFn = new MyClubsLambda(this, "getWeather", {
      handlerName: "getWeather",
      lambdaOpts: {
        environment: {
          WEATHER_API_KEY: process.env.WEATHER_API_KEY as string,
        },
      },
    });
    const api = new apigateway.RestApi(this, `weather-api`, {
      deployOptions: { tracingEnabled: true },
    });
    const baseResource = api.root.addResource("api").addResource("v1");

    baseResource
      .resourceForPath("getWeather")
      .addMethod("POST", new apigateway.LambdaIntegration(getWeatherFn));

    new cdk.CfnOutput(this, "HTTP API URL", {
      value: api.url + "api/v1/getWeather" ?? "Error",
    });
  }
}
