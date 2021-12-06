const {gql} = require('apollo-server');
 const reservasTypesDefs  = gql `
    type Reserva{
        id: String!
        idPlan: String!
        idUsuario: String!
    }
    
    input reservaInput{
        idPlan: String!
        idUsuario: String!
    }

    extend type Mutation {
        createReserva(reserva: reservaInput!): Reserva!
    }
    extend type Query {
        reservaById(id: String!): [Reserva]
    }
`;

 module.exports = reservasTypesDefs;