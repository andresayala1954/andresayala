const {gql} = require('apollo-server');
 const usuarioTypesDefs  = gql `
    type Tokens{
        refresh: String!
        access: String!
    }

    type Access{
        access: String!
    }

    input CredentialsInput{
        username: String!
        password: String!
    }

    input SignUpInput{
        username: String!
        password: String!
        name: String!
        email:String!
        tipo_usuario:String!
    }

    type UserDetail{
        id: Int!
        username: String!
        password: String!
        name: String!
        email: String!
        tipo_usuario:String!

    }

    type Mutation{
        signUpUser(userInput: SignUpInput!): Tokens!
        logIn(credentials: CredentialsInput!): Tokens!
        refreshToken(refresh:String!): Access!
    }
    type Query{
        userDetailById(userId:Int!):UserDetail!
    }
 `;
 module.exports = usuarioTypesDefs;