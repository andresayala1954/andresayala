const {ApolloServer, ApolloError} = require('apollo-server');
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const UsuarioAPI = require('./dataSources/usuario_api')
const PlanAPI = require('./dataSources/plan_api')
const Authentication = require('./utils/authentication')

const server = new ApolloServer({
    context: Authentication,
    typeDefs,
    resolvers,
    dataSources: () =>({
        PlanAPI: new PlanAPI(),
        UsuarioAPI: new UsuarioAPI(),
    }),
    introspection: true,
    playground: true
});

server.listen(process.env.PORT || 4000).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
    });
    