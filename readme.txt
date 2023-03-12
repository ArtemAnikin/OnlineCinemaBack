yarn add @nestjs/config                                         //for working with env files

yarn add @typegoose/typegoose mongoose nestjs-typegoose

yarn add -D @types/mongoose

yarn add @nestjs/jwt

// auth
nest g mo auth
nest g s auth
nest g co auth

auth module                                                     //guards(check role)/Pipe(validation init data)

// users
nest g mo user
nest g s user
nest g co user

yarn add @nestjs/jwt @nestjs/passport class-validator class-transformer passport passport-jwt bcryptjs

yarn add -D @types/bcryptjs @types/passport-jwt

//genres
nest g mo genre
nest g s genre
nest g co genre

//file
nest g mo file
nest g s file
nest g co file

yarn add @nestjs/serve-static app-root-path fs-extra

yarn add -D @types/app-root-path @types/fs-extra @types/multer

import ServeStaticModule from server-static,
path from app-root-path,
forRoot({rootPath: ${path}}),

//actor
nest g mo actor
nest g s actor
nest g co actor

//movie
nest g mo movie
nest g s movie
nest g co movie
video 9