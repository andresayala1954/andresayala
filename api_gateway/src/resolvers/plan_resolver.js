const planResolver = {
    Query:{
        planByUsername:(_,{idPlan},{dataSources}) => {
            return dataSources.PlanAPI.planByUsername(idPlan);
            
        },
    },
    Mutation:{
        signUpPlan:async(_,{planInput},{dataSources})=>{
            const plansInput={
                idPlan:planInput.idPlan,
                descripcion:planInput.descripcion,
                lugar:planInput.lugar,
                precio:planInput.precio,
                fecha:planInput.fecha
            }
            await dataSources.PlanAPI.createPlan(plansInput);
            
        }
    }
};

module.exports = planResolver;