const {RESTDataSource} = require('apollo-datasource-rest');
const serverConf = require ('../server');

class PlanAPI extends RESTDataSource {
    constructor(){
        super();
        this.baseURL = serverConf.plan_api_url;
    }

    async createPlan (plan){
        plan = new Object(JSON.parse(JSON.stringify(plan)));
        return await this.post('plans/',plan);
    }

    async planByUsername(idPlan){
        return await this.get(`plan/${idPlan}`);
    }

    async createReserva(reserva){
        reserva = new Object(JSON.parse(JSON.stringify(reserva)));
        return await this.post('reservas/',reserva);
    }

    async reservaByUsername(username){
        return await this.get(`reserva/${username}`);
    }

}
module.exports = PlanAPI;