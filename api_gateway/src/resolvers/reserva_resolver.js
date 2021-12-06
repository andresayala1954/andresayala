const reservaResolver = {
    Query: {
        reservaById: async(_,{username},{dataSources,userIdToken}) =>{
            usernameToken = (await dataSources.UsuarioAPI.getUser(userIdToken)).username
            if (username == usernameToken)
                return dataSources.AccountAPI.reservaByUsername(username)
            else
                return null
        }
    },
    Mutation: {
        createReserva: async (_,{reserva},{dataSources,userIdToken}) => {
            usernameToken = (await dataSources.UsuarioAPI.getUser(userIdToken)).username
            if (reserva.idUsuario == usernameToken)
                return dataSources.PlanAPI.createReserva(reserva)
            else
                return null
        }
    }
};

module.exports = reservaResolver;