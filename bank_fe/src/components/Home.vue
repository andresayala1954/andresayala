<template>
<div class="contenedorhome">
  <div class="header2" >
  <div class="information">
    

    <h1>¡Bienvenido <span>{{ userDetailById.name }}</span>! a Compass Travel</h1>
    

    <div class="details">
        
      <h2>Queremos que seas parte de éste viaje, aquí encontrarás diversos planes económicos</h2>
      <h2>nuevas aventuras, desafíos, viajes y turismo </h2>   
      <br>
      <h1><span> SE PARTE DE ÉSTA AVENTURA</span></h1>
      <br>

       <table>
            <tr>
                <th><a href="/user/caminata_ecologica"><img :src="require('@/assets/caminata.png')" /></a></th>
                <th><a href="/user/explora_nuestra_naturaleza"><img :src="require('@/assets/montaña.png')" /></a></th>
                <th><a href="/user/explora_lugares_reconditos"><img :src="require('@/assets/casa.png')" /></a></th>
                <th><a href="/user/lugares_paradisiacos"><img :src="require('@/assets/isla.png')" /></a></th>
                
            </tr>
    
        </table>

    </div>
  </div>
  
  </div>
  </div>
</template>


<script>
import gql from 'graphql-tag';
import jwt_decode from 'jwt-decode';

export default {
    name: "Home",

    data: function(){
        return {
            userId : jwt_decode(localStorage.getItem("token_access")).user_id,            
            userDetailById:{
                username: "",
                name:"",
                email:"",
            }  
        }
    },
    apollo:{
        userDetailById:{
            query: gql`
                query($userId: Int!){
                    userDetailById(userId: $userId){
                        username
                        name
                        email
                    }
                }
            `,
            variables () {
                return{
                userId: this.userId
                }
            }
        }
    }
}


</script>


<style>
    .contenedorhome {
    background: url('~@/../src/assets/fondoheader2.jpg') center center no-repeat;
    height: 650px;
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
        text-align: center;
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