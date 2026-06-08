"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("graphql-http/lib/use/express");
const cors_1 = __importDefault(require("cors"));
const schema_1 = require("@graphql-tools/schema");
const typeDefs_generated_1 = require("./generated/typeDefs.generated");
const resolvers_generated_1 = require("./generated/resolvers.generated");
const PORT = process.env.PORT ?? 4000;
const schema = (0, schema_1.makeExecutableSchema)({
    typeDefs: typeDefs_generated_1.typeDefs,
    resolvers: resolvers_generated_1.resolvers,
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.all('/graphql', (0, express_2.createHandler)({
    schema,
}));
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
