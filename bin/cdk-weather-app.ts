#!/usr/bin/env node
import * as cdk from "@aws-cdk/core";
import { WeatherStack } from "../lib/cdk-weather-app-stack";

const app = new cdk.App();

new WeatherStack(app, `WeatherStack`, {
  systemSlug: "com.myclubs.weather",
});
