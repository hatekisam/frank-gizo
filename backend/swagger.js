const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./app.js"];

const doc = {
  info: {
    version: "1.0.0",
    title: "SHDR SWAGGER",
    description:
      "Sustainable Homes and Designs Rwanda",
  },
  securityDefinitions: {
    BearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
    },
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
  host: "localhost:8000",
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "User",
      description: "User endpoint",
    },
    {
      name: "Services",
      description: "Services endpoint",
    },
    {
      name: "Projects",
      description: "Projects endpoint",
    },
  ],
  components: {
    securitySchemas: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./app.js");
});
