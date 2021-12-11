

<template>
  <div id="app" class="app">

    <div class="header">
      <img :src="require('./assets/LOGO.png')" />
     
      <nav>
        <button v-if="is_auth" v-on:click="loadHome"> Planes turísticos </button>
        <button v-if="is_auth" v-on:click="loadRegistrar_plan"> Registrar Plan </button>
        <button v-if="is_auth" v-on:click="logOut"> Cerrar Sesión </button>
        <button v-if="!is_auth" v-on:click="loadLogIn" > Iniciar Sesión </button>
        <button v-if="!is_auth" v-on:click="loadSignUp" > Registrarse </button>
      </nav>
    </div>

    <div class="main-component">
      <router-view  
        v-on:completedLogIn="completedLogIn"
        v-on:completedSignUp="completedSignUp"
        v-on:logOut="logOut"
      >
      </router-view>
    </div>
    

    <div class="footer">
      <h2>COMPASS TRAVEL GRUPO 7-2021</h2>
    </div>

  </div>
</template>



<script>

export default {
  name: 'App',

  computed: {
    is_auth: {
      get: function() {
        return this.$route.meta.requiresAuth;
      },
      set: function() { }
    }
  },

  methods:{

    loadLogIn: function(){
      this.$router.push({name: "logIn"})
    },

    loadSignUp: function(){
      this.$router.push({name: "signUp"})
    },

    completedLogIn: function(data) {
			localStorage.setItem("username", data.username);
			localStorage.setItem("token_access", data.token_access);
			localStorage.setItem("token_refresh", data.token_refresh);
			alert("Autenticación Exitosa");
			this.loadHome();
    },

    completedSignUp: function(data) {
			alert("Registro Exitoso");
			this.completedLogIn(data);
    },

    loadHome: function() {
      this.$router.push({ name: "home" });
    },

    loadAccount: function () {
			this.$router.push({ name: "account" });
		},

    loadTransaction: function(){
      this.$router.push({ name: "transaction" });
    },

    loadRegistrar_plan: function(){
      this.$router.push({ name: "registrar_plan" });
    },

    logOut: function () {
			localStorage.clear();
			alert("Sesión Cerrada");
      this.loadLogIn();
		},
  }
}
</script>

<style>

  body{
    margin: 0 0 0 0;
    
  }

  .header{
    margin: 0%;
    padding: 0;
    width: 100%;
    height: 10vh; 
    min-height: 100px;

    background-color: #eaf3f0 ;
    color:#131414  ;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header h1{
    width: 20%;
    text-align: center;
  }

  .header nav {
    height: 100%;
    width: 30%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 20px;
  }

  .header nav button{
    color: #E5E7E9;
    background: #2A5982;
    border: 1px solid #3a7ab3 ;
    border-radius: 3px;
    padding: 5px 10px;
  }

  .header nav button:hover{
    color: #93b1d1;
    background: #2A5982;
    border: 1px solid #E5E7E9;
  }

  .main-component {
    height: 80vh;
    margin: 0%;
    padding: 0%;
    background: url('~@/../src/assets/fondologin.jpg') center center no-repeat;
  }

 
  .footer{
    margin: 0;
    padding: 5;
    width: 100%;
    height: 5vh;
    min-height: 80px; 
    background-color: #F14726;
    color: #E5E7E9;

  }

  .footer h2{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

    .imagen{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @import url('https://fonts.googleapis.com/css?family=Proza+Libre');
  h1 {
    font-family: 'Oswald', sans-serif;
    color: seagreen;
    font-weight: 300;
}
  
</style>
