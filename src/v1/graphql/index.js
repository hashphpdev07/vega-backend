const { readFileSync } = require("fs");
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { merge } = require("lodash");

const QuerySchema = readFileSync(`${__dirname}/schemas/query.schema.graphql`).toString('utf-8');
const UserSchema = readFileSync(`${__dirname}/schemas/user.schema.graphql`).toString('utf-8');
const compositionSchema = readFileSync(`${__dirname}/schemas/composition.schema.graphql`).toString('utf-8');
const userReslover = require('./resolvers/user.resolver.js');
const compositionReslover = require('./resolvers/composition.resolver.js');

const schema = makeExecutableSchema({
    typeDefs: [ QuerySchema, UserSchema, compositionSchema],
    resolvers:  merge({}, userReslover,compositionReslover)
     
})

module.exports = {schema} 
