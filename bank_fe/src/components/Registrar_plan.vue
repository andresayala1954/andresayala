<template>
<div class="contenedorregistro">
  <div class="header2" >
  <div class="information">
    
    <div class="details">
      <h3><span>¿QUEREMOS QUE SEAS PARTE DE NOSOTROS!</span></h3><br>
      <h4>SI ERES AGENCIA Y QUIERES OFERTAR CON NOSOTROS</h4><br>
      <p>Registra tu plan que desees ofertar en el siguiente formulario dejando tus datos</p>
      <p>Nosotros lo revisaremos y te contactaremos lo más pronto posible</p>
      <br>
      
      <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style="color: white; font-family: Verdana; ">
        REGISTRA TU PLAN</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Por favor diligencia el siguiente formulario</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
            <form v-on:submit.prevent ="processReserva">
                <input type ="text" v-model="createTransaction.usernameDestiny" placeholder="Plan"/><br/>
                <br/>
                 <input type ="text" v-model="createTransaction.usernameDestiny" placeholder="Descripción"/><br/>
                <br/>
                <input type ="text" v-model="createTransaction.usernameDestiny" placeholder="Lugar"/><br/>
                <br/>
                <input type ="number" v-model="createTransaction.usernameDestiny" placeholder="Precio"/><br/>
                <br/>
                Fecha <input type ="date" v-model="createTransaction.usernameDestiny" placeholder="Fecha"/><br/>
                <br/>
                <button type ="submit">Reservar</button>
            </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">cerrar</button>
        
      </div>
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
    name:"Transaction",

    data: function(){
        return{
            createTransaction:{
                usernameOrigin: localStorage.getItem("username"),
                usernameDestiny:"",
                value:0,
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
                mutation ($transaction: transactionInput!){
                    createTransaction(transaction: $transaction){
                        id
                        date
                        usernameOrigin
                        usernameDestiny
                        value
                    }
                }
                `,
                variables:{
                    transaction: this.createTransaction
                }
            })
            .then ((result)=> {
                alert("Transacción realizada correctamente")
            })
            .catch((error) =>{
                alert("Saldo insuficiente o usuario de destino incorrecto")
            })
        }
    }
}
</script>


<style>
    .contenedorregistro {
    background: url('~@/../src/assets/fondoregistro.jpg') center center no-repeat;
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
    ol {
        text-align: left;
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
    font-weight: 600;
}
 @import url('https://fonts.googleapis.com/css2?family=Oswald&display=swap');
    h4 {
    font-family: 'Oswald', sans-serif;
    font-weight: 100;
}
textarea {
  resize: none;
}

</style>