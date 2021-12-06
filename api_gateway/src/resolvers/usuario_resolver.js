const usuarioResolvers = {
    Query:{
        userDetailById: (_,{userId},{dataSources,userIdToken}) => {
            if (userId == userIdToken)
                return dataSources.UsuarioAPI.getUser(userId);  
            else
                return null          
        },
    },
    Mutation:{
        signUpUser: async(_,{userInput},{dataSources}) =>{
            const authInput = {
                username: userInput.username,
                password: userInput.password,
                name: userInput.name,
                email: userInput.email,
                tipo_usuario:userInput.tipo_usuario
            }

            return await dataSources.UsuarioAPI.createUser(authInput);

        },
        logIn: (_,{credentials},{dataSources}) =>{
            return dataSources.UsuarioAPI.usuarioRequest(credentials);
        },
        refreshToken: (_,{refresh},{dataSources}) =>{
            return dataSources.UsuarioAPI.refreshToken(refresh);
        }
    }
};
module.exports = usuarioResolvers;