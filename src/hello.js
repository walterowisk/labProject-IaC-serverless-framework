"use strict";

const hello = async (event) => {
  //module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v3.28.1! Your function executed successfully!",
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports = {
  handler: hello,
};
