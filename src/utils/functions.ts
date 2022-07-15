import { Context } from "@azure/functions";

// function results
export const funcSuccess = <T>(context: Context, value?: T) => {
  context.res = {
    status: 200,
    body: value,
  };
};
export const funcUnauthorized = (
  context: Context,
  message = "Unauthorized to perform this action"
) => {
  context.res = {
    status: 401,
    body: message,
  };
};
export const funcValidationError = (context: Context, message: string) => {
  context.res = {
    status: 400,
    body: message,
  };
};
export const func404NotFound = (context: Context, error?: any) => {
  context.res = {
    status: 404,
    body: error,
  };
};
export const func500Error = (context: Context, error?: any) => {
  context.res = {
    status: 500,
    body: error,
  };
};
