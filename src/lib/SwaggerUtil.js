class SwaggerUtil {
  constructor() {
    this.paths = {};
    this.servers = [
      {
        url: "http://localhost:8080",
        description: "local server",
      },
      {
        url: "http://local.com/",
        description: "Staging server",
      },
      {
        url: "http://local.com/",
        description: "Live server",
      },
    ];
  }
  generateRequestBody(properties) {
    return {
      description: "Default Request Body",
      required: false,
      content: {
        "application/json": {
          schema: {
            allOf: [
              {
                type: "object",
                properties: {
                  API_VERSION: {
                    type: "string",
                    default: "1.0",
                  },
                  timezone: {
                    type: "string",
                    default: "Asia/Kolkata",
                  },
                  ...properties,
                },
              },
            ],
          },
        },
      },
    };
  }
  defaultResponse() {
    return {
      200: {
        description: "OK",
      },
    };
  }
  addPath(
    path,
    summary,
    requestProperties,
    method = "post",
    requiresAuth = true
  ) {
    if (!this.paths[path]) {
      this.paths[path] = {};
    }
    this.paths[path][method] = {
      summary: summary,
      security: requiresAuth ? [{ bearerAuth: [] }] : [],
      requestBody: this.generateRequestBody(requestProperties),
      responses: this.defaultResponse(),
    };
  }
  getDocument() {
    return {
      openapi: "3.0.0",
      info: {
        version: "3.0.0",
        title: "Chat 2 Met End User API",
        description:
          "## Authorization\nPass `bearerAuth` in header. `Authorization: Bearer [auth token]\nToken provided by email\n _All personal data are encrypted_\n ## Responses\n All responses are json object with following keys\n 1. `statuscode` - if success is false, this will be > 0\n 2. `statusmessage` - if success is false, this will be description of the error\n 3. `data` - when successful, this will contain json object of the data\n",
        termsOfService: "",
        contact: {
          name: "API",
          email: "",
          url: "",
        },
        license: {
          name: "MIT",
          url: "https://opensource.org/licenses/MIT",
        },
      },
      servers: this.servers,
      paths: this.paths,
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    };
  }
}
export default SwaggerUtil;
