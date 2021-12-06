const {gql} = require('apollo-server');
const planTypesDefs  = gql `
    type Plan{
        idPlan: String!
        descripcion:String!
        lugar:String!
        precio:Int!
        fecha:String!
    }
    input planInput{
        idPlan: String!
        descripcion:String!
        lugar:String!
        precio:Int!
        fecha:String!
    }
    extend type Mutation{
        signUpPlan(plansInput: planInput!): Plan!
        
    }
    extend type Query {
        planByUsername(idPlan: String!): Plan
    }
    
`;
module.exports = planTypesDefs;