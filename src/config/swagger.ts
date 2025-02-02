import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "eCommerce REST API",
      version: "1.0.0",
      description: "Documentation for the REST API of the eCommerce application",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Dev server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ["./src/modules/**/*.routes.ts"],
};


const swaggerSpec = swaggerJsdoc(swaggerOptions);


export function setupSwagger(app: Express) {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Docs available on: http://localhost:3000/api/docs");
}
