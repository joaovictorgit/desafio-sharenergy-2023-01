import { NextFunction, Request, Response } from "express";
const jwt = require("jsonwebtoken");

function authentication(request: any, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return response.status(400).json(`Don't have token`);
  }

  const token = authHeader.replace(`Bearer`, "").trim();
  jwt.verify(token, "sharenergy", (err: unknown, decoded: any) => {
    if (err) {
      return response.status(400).json(`Invalid or expired token`);
    }
    request.userId = decoded._id;
    return next();
  });
}

export default authentication;
