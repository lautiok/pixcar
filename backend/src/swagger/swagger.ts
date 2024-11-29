import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "pixcar API",
      descripcion: "API para el backend de pixcar",
      version: "1.0.0",
    },
  },
  apis: ["./src/docs/*.yaml"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
