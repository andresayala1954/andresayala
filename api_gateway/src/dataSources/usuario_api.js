const {RESTDataSource} = require('apollo-datasource-rest');
const serverConf = require ('../server');

class UsuarioAPI extends RESTDataSource {
    constructor(){
        super();
        this.baseURL = serverConf.usuario_api_url;
    }

    async createUser (user){
        user = new Object(JSON.parse(JSON.stringify(user)));
        return await this.post(`user/`,user);
    }

    async getUser(userId){
        return await this.get(`user/${userId}/`);
    }

    async usuarioRequest (credentials){
        credentials = new Object(JSON.parse(JSON.stringify(credentials)));
        return await this.post(`login/`,credentials);
    }
    
    async refreshToken (token){
        token = new Object(JSON.parse(JSON.stringify({refresh: token}))); 
        return await this.post (`refresh/`,token);
    }
}

module.exports = UsuarioAPI;
