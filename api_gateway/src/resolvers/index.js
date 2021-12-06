const planResolver = require('./plan_resolver');
const reservaResolver = require('./reserva_resolver');
const usuariosResolvers = require('./usuario_resolver');
const lodash = require('lodash');

const resolvers = lodash.merge(planResolver,reservaResolver,usuariosResolvers);

module.exports = resolvers;