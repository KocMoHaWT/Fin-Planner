export const options = {
    "swagger": "2.0",
    "info": {
        "description": "This is a simple example NodeJS API project to demonstrate Swagger Documentation",
        "version": "1.0.0",
        "title": "Tasks API",
        "contact": {
            "email": "abc@gmail.com"
        },
        "license": {
            "name": "Apache 2.0",
            "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        }
    },
    "schemes": ["http"],
    "host": "localhost:3080",
    "basePath": "",
    "paths": {
        "/users": {
            "get": {
                tags: ['user'],
                "summary": "Get user info",
                "description": "Gets user info when authorised",
                "produces": ["application/json"],
                "parameters": [''],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "$ref": "#/definitions/User"
                        }
                    },
                    "400": {
                        "description": "Invalid credentials",
                    }
                }
            }
        },
        "/users/update": {
            "post": {
                tags: ['user'],
                "summary": "Update User",
                "description": "Update user",
                "produces": ["application/json"],
                "consumes": ["application/json"],
                "parameters": [
                    {
                        "name": "user",
                        "in": "body",
                        "description": "update user body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/NewUser"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "$ref": "#/definitions/UpdateUser"
                        }
                    },
                    "400": {
                        "description": "Invalid status value",
                        "schema": {
                            "$ref": "#/definitions/InvalidResponse"
                        }
                    }
                }
            }
        },
        "/auth/register": {
            "post": {
                tags: ['user-auth'],
                "summary": "register new User",
                "description": "Update user",
                "produces": ["application/json"],
                "consumes": ["application/json"],
                "parameters": [
                    {
                        "in": "body",
                        "name": "user info",
                        "description": "user object",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/NewUser"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "$ref": "#/definitions/Tokens"
                        }
                    },
                    "400": {
                        "description": "Invalid status value",
                        "schema": {
                            "$ref": "#/definitions/InvalidResponse"
                        }
                    }
                }
            }
        },
        "/auth/login": {
            "post": {
                tags: ['user-auth'],
                "summary": "Login",
                "description": "Update user",
                "produces": ["application/json"],
                "consumes": ["application/json"],
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "login credentials",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "email": {
                                    "type": "string"
                                },
                                "paswsword": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "$ref": "#/definitions/Tokens"
                        }
                    },
                    "400": {
                        "description": "Invalid status value",
                        "schema": {
                            "$ref": "#/definitions/InvalidResponse"
                        }
                    }
                }
            }
        },
        "/auth/refresh": {
            "post": {
                tags: ['user-auth'],
                "summary": "Refresh tokens",
                "description": "Update user",
                "produces": ["application/json"],
                "consumes": ["application/json"],
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "login credentials",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "accessToken": {
                                    "type": "string"
                                },
                            }
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "$ref": "#/definitions/Tokens"
                        }
                    },
                    "400": {
                        "description": "Invalid status value",
                        "schema": {
                            "$ref": "#/definitions/InvalidResponse"
                        }
                    }
                }
            }
        },
        "/auth/logout": {
            "post": {
                tags: ['user-auth'],
                "summary": "Update User",
                "description": "Update user",
                "produces": ["application/json"],
                "consumes": ["application/json"],
                "responses": {
                    "200": {
                        "description": "successful operation",
                    },
                    "400": {
                        "description": "Invalid status value",
                        "schema": {
                            "$ref": "#/definitions/InvalidResponse"
                        }
                    }
                }
            }
        },
        "/buckets/": {
            "post": {
                tags: ['buckets'],
                "description": "create bucket",
                "produces": ["application/json"],
                "consumes": ["application/json"],
                "parameters": [
                    {
                        "name": "bucket",
                        "in": "body",
                        "description": "update bucket body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/Bucket"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "$ref": "#/definitions/Bucket"
                        }
                    },
                    "400": {
                        "description": "Invalid status value",
                        "schema": {
                            "$ref": "#/definitions/InvalidResponse"
                        }
                    }
                }
            }
        },
        "/buckets/{id}/update": {
            "post": {
                tags: ['buckets'],
                "summary": "update bucket",
                "description": "update bucket",
                "produces": ["application/json"],
                "consumes": ["application/json"],
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "bucket object",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/Bucket"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "$ref": "#/definitions/Bucket"
                        }
                    },
                    "400": {
                        "description": "Invalid status value",
                        "schema": {
                            "$ref": "#/definitions/InvalidResponse"
                        }
                    }
                }
            }
        },
        "/buckets/transfer": {
            "post": {
                tags: ['buckets'],
                "summary": "Update User",
                "description": "Update user",
                "produces": ["application/json"],
                "consumes": ["application/json"],
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "task object",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/ActivityLog"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                    },
                    "400": {
                        "description": "Invalid status value",
                        "schema": {
                            "$ref": "#/definitions/InvalidResponse"
                        }
                    }
                }
            }
        },
        "/buckets/types": {
            "get": {
                tags: ['buckets'],
                "description": "Get bucket type list",
                "produces": ["application/json"],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/BucketType"
                            }
                        }
                    },
                    "400": {
                        "description": "Invalid credentials",
                        "schema": {
                            "$ref": "#/definitions/InvalidResponse"
                        }
                    }
                }
            }
        },
        "/buckets/list": {
            "get": {
                tags: ['buckets'],
                "description": "Get bucket list",
                "produces": ["application/json"],
                "parameters": ['para,'],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Bucket"
                            }
                        }
                    },
                    "400": {
                        "description": "Invalid credentials",
                        "schema": {
                            "$ref": "#/definitions/InvalidResponse"
                        }
                    }
                }
            }
        },
        "/buckets/{id}": {
            "get": {
                tags: ['buckets'],
                "summary": "Get bucket info",
                "description": "Gets bucket info when authorised",
                "produces": ["application/json"],
                "parameters": [
                    {
                        "in": "path",
                        "name": "bucket id",
                        "required": true,
                        type: 'number'
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "$ref": "#/definitions/Bucket"
                        }
                    },
                    "400": {
                        "description": "Invalid credentials",
                        "schema": {
                            "$ref": "#/definitions/InvalidResponse"
                        }
                    }
                }
            },
            "delete": {
                tags: ['buckets'],
                "summary": "Delete the task",
                "description": "Delete the bucket",
                "produces": ["application/json"],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "bucket id that needs to be deleted",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                    },
                    "400": {
                        "description": "Invalid status value",
                        "schema": {
                            "$ref": "#/definitions/InvalidResponse"
                        }
                    }
                }
            }
        },
        "/buckets/{id}/logs": {
            "get": {
                tags: ['buckets'],
                "summary": "Get bucket logs",
                "description": "Get bucket logs",
                "produces": ["application/json"],
                "parameters": [
                    {
                        "in": "path",
                        "name": "bucket id",
                        "required": true,
                        type: 'number'
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "type": "oject",
                            "items": {
                                "$ref": "#/definitions/ActivityLog"
                            }
                        }
                    },
                    "400": {
                        "description": "Invalid credentials",
                        "schema": {
                            "$ref": "#/definitions/InvalidResponse"
                        }
                    }
                }
            }
        },
        "/incomes/": {
            "post": {
                tags: ['incomes'],
                "description": "create income",
                "produces": ["application/json"],
                "consumes": ["application/json"],
                "parameters": [
                    {
                        "name": "user",
                        "in": "body",
                        "description": "update user body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/Income"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "$ref": "#/definitions/Income"
                        }
                    },
                    "400": {
                        "description": "Invalid status value",
                        "schema": {
                            "$ref": "#/definitions/InvalidResponse"
                        }
                    }
                }
            }
        },
        "/incomes/list": {
            "get": {
                tags: ['incomes'],
                "description": "Get income list",
                "produces": ["application/json"],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Income"
                            }
                        }
                    },
                    "400": {
                        "description": "Invalid credentials",
                        "schema": {
                            "$ref": "#/definitions/InvalidResponse"
                        }
                    }
                }
            }
        },
        "/incomes/{id}/update": {
            "post": {
                tags: ['incomes'],
                "summary": "update income",
                "description": "update income",
                "produces": ["application/json"],
                "consumes": ["application/json"],
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "income object",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/Income"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "$ref": "#/definitions/Income"
                        }
                    },
                    "400": {
                        "description": "Invalid status value",
                        "schema": {
                            "$ref": "#/definitions/InvalidResponse"
                        }
                    }
                }
            }
        },
        "/incomes/{id}": {
            "get": {
                tags: ['incomes'],
                "summary": "Get income info",
                "description": "Gets income info when authorised",
                "produces": ["application/json"],
                "parameters": [
                    {
                        "in": "path",
                        "name": "income id",
                        "required": true,
                        type: 'number'
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "$ref": "#/definitions/Income"
                        }
                    },
                    "400": {
                        "description": "Invalid credentials",
                        "schema": {
                            "$ref": "#/definitions/InvalidResponse"
                        }
                    }
                }
            },
            "delete": {
                tags: ['incomes'],
                "summary": "Delete the income",
                "description": "Delete the income",
                "produces": ["application/json"],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "income id that needs to be deleted",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                    },
                    "400": {
                        "description": "Invalid status value",
                        "schema": {
                            "$ref": "#/definitions/InvalidResponse"
                        }
                    }
                }
            }
        },
    },
    components: {
        securitySchemas: [
            {
                type: 'http',
                description: 'Enter JWT Token',
                scheme: 'berear',
                berearFormat: 'JWT'
            },

        ]
    },
    "definitions": {
        "User": {
            "type": "object",
            "required": [
                "email", "password"
            ],
            "properties": {
                "id": {
                    "type": "integer"
                },
                "name": {
                    "type": "string"
                },
                "email": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                },
                "defaultCurrency": {
                    "type": "string"
                }
            }
        },
        "NewUser": {
            "type": "object",
            "required": [
                "email", "password"
            ],
            "properties": {
                "name": {
                    "type": "string"
                },
                "email": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                },
            }
        },
        "UpdateUser": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "defaultCurrency": {
                    "type": "string"
                }
            }
        },
        "Tokens": {
            "type": "object",
            "properties": {
                "accessToken": {
                    "type": "string"
                },
                "registerToken": {
                    "type": "string"
                }
            }
        },
        "InvalidResponse": {
            "type": "object",
            "properties": {
                "statusCode": {
                    "type": "string"
                },
                "message": {
                    "type": "string"
                }
            }

        },
        "Bucket": {
            "type": "object",
            "required": [
                "userId", "bucketType", 'period'
            ],
            "properties": {
                "id": {
                    "type": "integer"
                },
                bucketType: {
                    "$ref": "#/definitions/BucketType"
                },
                "userId": {
                    "type": "number"
                },
                "status": {
                    "type": "string"
                },
                "period": {
                    "type": "string"
                },
                "date": {
                    "type": "date"
                },
                "linkedIncome": {
                    "type": "number"
                },
                "tags": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/Tag"
                    }
                },
                "logs": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/ActivityLog"
                    }
                }
            }
        },
        BucketType: {
            type: 'object',
            "properties": {
                "title": {
                    "type": "string"
                },
                "planned": {
                    "type": "boolean"
                },
                "regular": {
                    "type": "boolean"
                },
                "strict": {
                    "type": "boolean"
                },
                "leftover ": {
                    "type": "boolean"
                },
            }
        },
        ActivityLog: {
            type: 'object',
            "properties": {
                "bucketId": {
                    "type": "number"
                },
                "incomeId": {
                    "type": "number"
                },
                "ammount": {
                    "type": "number"
                },
                "direction": {
                    "type": "string"
                },
                "currencyValue": {
                    "type": "string"
                },
                start_currency: {
                    type: "string",
                },
                end_currency: {
                    type: "string",
                }
            }
        },
        Tag: {
            type: 'object',
            "properties": {
                "value": {
                    "type": "string"
                },
            }
        },
        Income: {
            type: 'object',
            "properties": {
                "id": {
                    "type": "number"
                },
                "ammount": {
                    "type": "number"
                },
                "title": {
                    "type": "string"
                },
                "currency": {
                    "type": "string"
                },
                userId: {
                    type: "string",
                },
                regular: {
                    type: "boolean",
                },
                "logs": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/ActivityLog"
                    }
                }
            }
        },
    }
}