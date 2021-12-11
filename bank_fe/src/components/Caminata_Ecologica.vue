<template>
<div class="contenedorcaminata">
  <div class="header2" >
  <div class="information">
    
    <table>
            <tr>
                <th><a href="/user/caminata_ecologica"><img :src="require('@/assets/caminata.png')" /></a></th>
                <th><a href="/user/explora_nuestra_naturaleza"><img :src="require('@/assets/montaña.png')" /></a></th>
                <th><a href="/user/explora_lugares_reconditos"><img :src="require('@/assets/casa.png')" /></a></th>
                <th><a href="/user/lugares_paradisiacos"><img :src="require('@/assets/isla.png')" /></a></th>
                
            </tr>
    </table>
  <br>

    <div class="details">
      <h3>Plan Caminata Ecológica</h3>
      <p>Selecciona el Plan de tu preferencia</p>
      <p><span>Valor por plan $ 250.000 COP</span></p>
      <ol>
        <li>Senderismo a Cascadas cerca de Bogotá</li>
        <li>Senderismo a Lagunas cerca de Bogotá</li>
        <li>Senderismo de Avistamiento de Fauna</li>
        <li>Senderismo y Deportes Extremos Bogotá</li>
        <li>Senderismo, Canotaje y Torrentismo</li>
        <li>Senderismo y Deportes Extremos</li>
      </ol>
      <!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style="color: white; font-family: Verdana; ">
  Formulario para reservar tu plan

</button>


<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Escribe el Plan que deseas y tu Nombre</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
            <form v-on:submit.prevent ="processReserva">
                <input type ="text" v-model="createReserva.idPlan" placeholder="Plan"/>
                <br/>
                <input type ="text" v-model="createReserva.idUsuario" placeholder="Usuario"/>
                <br/><br/>
                <button type ="submit">Reservar</button>
            </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">cerrar</button>
        <br>
      </div>
     <br>
    </div>
    
    
  </div>
</div>

</div>
</div>
</div>
</div>

</template>


<script>
import gql from "graphql-tag"
export default{
    name:"Reserva",

    data: function(){
        return{
            createReserva:{
                idPlan:"",
                idUsuario: localStorage.getItem("username"),   
            }
        }
    },

    methods:{
        processReserva: async function(){
            if(localStorage.getItem("token_refresh")===null || localStorage.getItem("token_access")===null){
                this.$emit("logOut");
                return;
            }
            localStorage.setItem("token_access","");

            await this.$apollo
            .mutate({
                mutation: gql `
                mutation ($refresh: String!){
                    refreshToken(refresh: $refresh){
                        access
                    }
                }
                `,
                variables: {
                    refresh: localStorage.getItem("token_refresh"),
                },
            })
            .then ((result) => {
                localStorage.setItem("token_access",result.data.refreshToken.access);
            })
            .catch((error) => {
                this.$emit("logOut")
                return;
            });

            await this.$apollo
            .mutate({
                mutation: gql`
               mutation CreateReserva($reserva: reservaInput!) {
                createReserva(reserva: $reserva) {
                    id
                    idPlan
                    idUsuario
                }
                }
                `,
                variables:{
                    reserva: this.createReserva
                }
            })
            .then ((result)=> {
                alert("Reserva realizada correctamente")
            })
            .catch((error) =>{
                alert("No se encontro el plan o no se pudo reservar")
            })
        }
    }
}
</script>


<style>
    .contenedorcaminata {
    background: url('~@/../src/assets/fondocaminatas.jpg') center center no-repeat;
    height: 700px;
    width: 1520px;
    }


    .information {
        margin: 0;
        padding: 0%;
        width: 150%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        
    }
    .information h1 {
        font-size: 25px;
        color: #283747;
    }
    .information h2 {
        font-size: 30px;
        color: #283747;
    }
    .information span {
        color: rgb(220, 83, 20);
        font-weight: bold;
    }
    .details h3 {
        font-size: 25px;
        color: #283747;
        text-align: center;
    }
    .details h2 {
        font-size: 25px;
        color: #283747;
    }
    .details {
        border: 3px solid rgba(0, 0, 0, 0.3);
        border-radius: 20px;
        padding: 30px 80px;
        margin: 30px 0 0 0;
        background: #ecedee;
        display: grid;
        place-content: center;
    }

    .header2{
    margin: 0%;
    padding: 0;
    width: 100%;
    height: 80vh; 
    min-height: 100px;
    
    color:#131414  ;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  @import url('https://fonts.googleapis.com/css2?family=Oswald&display=swap');
    h2,h3 {
    font-family: 'Oswald', sans-serif;
    font-weight: 300;
}
 @import url('https://fonts.googleapis.com/css2?family=Oswald&display=swap');
    h4 {
    font-family: 'Oswald', sans-serif;
    font-weight: 100;
}

</style>