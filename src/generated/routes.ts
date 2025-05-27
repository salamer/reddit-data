/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PostController } from './../post.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './../user.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { InteractionController } from './../interaction.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthController } from './../auth.controller';
import { expressAuthentication } from './../auth.middleware';
// @ts-ignore - no great way to install types from subpackage
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';

const expressAuthenticationRecasted = expressAuthentication as (req: ExRequest, securityName: string, scopes?: string[], res?: ExResponse) => Promise<any>;


// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "PostResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "imageUrl": {"dataType":"string","required":true},
            "title": {"dataType":"string","required":true},
            "content": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "subreddit": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "userId": {"dataType":"double","required":true},
            "username": {"dataType":"string","required":true},
            "avatarUrl": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreatePostBase64Input": {
        "dataType": "refObject",
        "properties": {
            "imageBase64": {"dataType":"string","required":true},
            "imageFileType": {"dataType":"string","required":true},
            "title": {"dataType":"string","required":true},
            "content": {"dataType":"string","required":true},
            "subreddit": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserProfileResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "username": {"dataType":"string","required":true},
            "bio": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "avatarUrl": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommentResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "text": {"dataType":"string","required":true},
            "userId": {"dataType":"double","required":true},
            "postId": {"dataType":"double","required":true},
            "username": {"dataType":"string","required":true},
            "avatarUrl": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateCommentInput": {
        "dataType": "refObject",
        "properties": {
            "text": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserPublicProfile": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "username": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserRegistrationInput": {
        "dataType": "refObject",
        "properties": {
            "username": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AuthResponse": {
        "dataType": "refObject",
        "properties": {
            "user": {"dataType":"nestedObjectLiteral","nestedProperties":{"email":{"dataType":"string","required":true},"username":{"dataType":"string","required":true},"id":{"dataType":"double","required":true}},"required":true},
            "token": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserLoginInput": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsPostController_createPost: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                body: {"in":"body","name":"body","required":true,"ref":"CreatePostBase64Input"},
                badRequestResponse: {"in":"res","name":"400","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
                serverErrorResponse: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
        };
        app.post('/api/v1/posts',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(PostController)),
            ...(fetchMiddlewares<RequestHandler>(PostController.prototype.createPost)),

            async function PostController_createPost(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPostController_createPost, request, response });

                const controller = new PostController();

              await templateService.apiHandler({
                methodName: 'createPost',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPostController_searchPosts: Record<string, TsoaRoute.ParameterSchema> = {
                query: {"in":"query","name":"query","required":true,"dataType":"string"},
                limit: {"default":10,"in":"query","name":"limit","dataType":"double"},
                offset: {"default":0,"in":"query","name":"offset","dataType":"double"},
                badRequestResponse: {"in":"res","name":"400","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
        };
        app.get('/api/v1/posts/search',
            ...(fetchMiddlewares<RequestHandler>(PostController)),
            ...(fetchMiddlewares<RequestHandler>(PostController.prototype.searchPosts)),

            async function PostController_searchPosts(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPostController_searchPosts, request, response });

                const controller = new PostController();

              await templateService.apiHandler({
                methodName: 'searchPosts',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPostController_getPostById: Record<string, TsoaRoute.ParameterSchema> = {
                postId: {"in":"path","name":"postId","required":true,"dataType":"double"},
                notFoundResponse: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
        };
        app.get('/api/v1/posts/:postId',
            ...(fetchMiddlewares<RequestHandler>(PostController)),
            ...(fetchMiddlewares<RequestHandler>(PostController.prototype.getPostById)),

            async function PostController_getPostById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPostController_getPostById, request, response });

                const controller = new PostController();

              await templateService.apiHandler({
                methodName: 'getPostById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPostController_getFeedPosts: Record<string, TsoaRoute.ParameterSchema> = {
                limit: {"default":10,"in":"query","name":"limit","dataType":"double"},
                offset: {"default":0,"in":"query","name":"offset","dataType":"double"},
        };
        app.get('/api/v1/posts',
            ...(fetchMiddlewares<RequestHandler>(PostController)),
            ...(fetchMiddlewares<RequestHandler>(PostController.prototype.getFeedPosts)),

            async function PostController_getFeedPosts(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPostController_getFeedPosts, request, response });

                const controller = new PostController();

              await templateService.apiHandler({
                methodName: 'getFeedPosts',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPostController_getPostsBySubreddit: Record<string, TsoaRoute.ParameterSchema> = {
                subreddit: {"in":"path","name":"subreddit","required":true,"dataType":"string"},
                notFoundResponse: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
        };
        app.get('/api/v1/posts/r/:subreddit',
            ...(fetchMiddlewares<RequestHandler>(PostController)),
            ...(fetchMiddlewares<RequestHandler>(PostController.prototype.getPostsBySubreddit)),

            async function PostController_getPostsBySubreddit(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPostController_getPostsBySubreddit, request, response });

                const controller = new PostController();

              await templateService.apiHandler({
                methodName: 'getPostsBySubreddit',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_getUserProfile: Record<string, TsoaRoute.ParameterSchema> = {
                userId: {"in":"path","name":"userId","required":true,"dataType":"double"},
                notFound: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
        };
        app.get('/api/v1/users/:userId/profile',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getUserProfile)),

            async function UserController_getUserProfile(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_getUserProfile, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'getUserProfile',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_getUserLikes: Record<string, TsoaRoute.ParameterSchema> = {
                userId: {"in":"path","name":"userId","required":true,"dataType":"double"},
                notFound: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
        };
        app.get('/api/v1/users/:userId/likes',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getUserLikes)),

            async function UserController_getUserLikes(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_getUserLikes, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'getUserLikes',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsInteractionController_likePost: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                postId: {"in":"path","name":"postId","required":true,"dataType":"double"},
                notFoundResponse: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
        };
        app.post('/api/v1/posts/:postId/like',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(InteractionController)),
            ...(fetchMiddlewares<RequestHandler>(InteractionController.prototype.likePost)),

            async function InteractionController_likePost(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInteractionController_likePost, request, response });

                const controller = new InteractionController();

              await templateService.apiHandler({
                methodName: 'likePost',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsInteractionController_unlikePost: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                postId: {"in":"path","name":"postId","required":true,"dataType":"double"},
        };
        app.delete('/api/v1/posts/:postId/unlike',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(InteractionController)),
            ...(fetchMiddlewares<RequestHandler>(InteractionController.prototype.unlikePost)),

            async function InteractionController_unlikePost(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInteractionController_unlikePost, request, response });

                const controller = new InteractionController();

              await templateService.apiHandler({
                methodName: 'unlikePost',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsInteractionController_createComment: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                postId: {"in":"path","name":"postId","required":true,"dataType":"double"},
                body: {"in":"body","name":"body","required":true,"ref":"CreateCommentInput"},
                notFoundResponse: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
        };
        app.post('/api/v1/posts/:postId/comments',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(InteractionController)),
            ...(fetchMiddlewares<RequestHandler>(InteractionController.prototype.createComment)),

            async function InteractionController_createComment(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInteractionController_createComment, request, response });

                const controller = new InteractionController();

              await templateService.apiHandler({
                methodName: 'createComment',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsInteractionController_getComments: Record<string, TsoaRoute.ParameterSchema> = {
                postId: {"in":"path","name":"postId","required":true,"dataType":"double"},
                limit: {"default":10,"in":"query","name":"limit","dataType":"double"},
                offset: {"default":0,"in":"query","name":"offset","dataType":"double"},
                notFoundResponse: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
        };
        app.get('/api/v1/posts/:postId/comments',
            ...(fetchMiddlewares<RequestHandler>(InteractionController)),
            ...(fetchMiddlewares<RequestHandler>(InteractionController.prototype.getComments)),

            async function InteractionController_getComments(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInteractionController_getComments, request, response });

                const controller = new InteractionController();

              await templateService.apiHandler({
                methodName: 'getComments',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthController_register: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"UserRegistrationInput"},
                badRequest: {"in":"res","name":"400","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
                conflict: {"in":"res","name":"409","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
        };
        app.post('/api/v1/auth/register',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.register)),

            async function AuthController_register(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_register, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'register',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthController_login: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"UserLoginInput"},
                unauthorized: {"in":"res","name":"401","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
        };
        app.post('/api/v1/auth/login',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.login)),

            async function AuthController_login(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_login, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'login',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            try {
                request['user'] = await Promise.any(secMethodOrPromises);

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }

                next();
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }
                next(error);
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
