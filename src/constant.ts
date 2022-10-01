import * as jwt from 'jsonwebtoken'


export const authSettings = {
  algorithms: [process.env.AuthAlgorithm ?? ('HS256' as const)] as jwt.Algorithm[],
  secret: process.env.AuthSecret ?? '',
}

export const storageSettings = {
  database: "test",
  username: "root",
  password: "root",
  host: "localhost",
};
