import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  Context,
} from "aws-lambda";
import { API_URL, WEATHER_API_URL } from "../../constants/api.constant";
import { GetWeatherRequestBody } from "../../models/request.model";
import {
  AwsWorkoutResponse,
  Location,
  LocationAndDate,
} from "../../models/workout.model";
require("dotenv").config();
import fetch from "node-fetch";
import { URL, URLSearchParams } from "url";
import { stringify } from "query-string";

/**
 * - Product Owner Notes -
 *
 * Here's some example data containing `ActivityDate`s you can use for your implementation:
 * Workout Data:
 *
 * You can use a package like https://www.npmjs.com/package/node-fetch#json to fetch the data.
 * For the forecast to work, it is fine to mock/replace the `start` date of an `ActivityDate` with a random date in the future so you can get an actual forecast.
 */
export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  context: Context
) => {
  if (!event.body)
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `request body is missing`,
      }),
    };
  const req: GetWeatherRequestBody = JSON.parse(event.body);

  if (!req.body.id || typeof req.body.id !== "string")
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "id is missing in body or not a string",
      }),
    };

  const response = await fetch(API_URL);
  const json: AwsWorkoutResponse = await response.json();

  let location: LocationAndDate | undefined;
  json.hits.hits.forEach((hit) => {
    if (req.body.id === hit._source.activityDate.objectId) {
      if (!hit._source.location) {
        return {
          statusCode: 400,
          body: JSON.stringify({
            message: `Object with the id ${req.body.id} does not posses geo-location coordiantes`,
          }),
        };
      }

      location = {
        location: hit._source.location,
        start: hit._source.activityDate.start.iso.toString(),
        end: hit._source.activityDate.end.iso.toString(),
      };
    }
  });

  if (!location) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Location for object-id: ${id} was not found",
      }),
    };
  }

  const params = {
    lat: location.location.latitude,
    lon: location.location.longitude,
    start: location.start.slice(0, 10),
    end: location.end.slice(0, 10),
  };

  try {
    const weatherResponse = await fetch(
      `${WEATHER_API_URL}?${stringify(params)}`,
      {
        headers: {
          "X-RapidAPI-Key": `${process.env.WEATHER_API_KEY}`,
          "X-RapidAPI-Host": "meteostat.p.rapidapi.com",
        },
      }
    );
    const weatherJson = await weatherResponse.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ data: weatherJson }),
    };
  } catch (ex) {
    return {
      statusCode: 403,
      body: JSON.stringify({ err: (ex as Error).message }),
    };
  }
};
