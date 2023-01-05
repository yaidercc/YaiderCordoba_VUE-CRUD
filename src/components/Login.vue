<script>
import { loginUser,renovateToken } from "../services/services";
export default {
  data: () => ({
    error: false,
    errMsg: "",
    correo: "",
    password: ""
  }),
  beforeCreate() {
    renovateToken(localStorage.getItem("token"))
      .then(resp=>{
          this.$router.push("/");
      })
  },
  methods: {
   
    async login() {
      try {
        this.errMsg = '';
        this.error = false;
        const resp = await loginUser(this.correo, this.password);
        // Se guarda el token en el localstorage
        localStorage.setItem("token",resp.data.token);
        // Redireccionar al home
        this.$router.push("/");
      } catch (error) {
        // Se valide si son errores de middlewares 
        console.log(error);
        this.errMsg = error.response.data.msg || error.response.data.errors[0].msg;
        this.error = true;
      }
    }
  },
  name: 'LoginComponent',
};
</script>

<template>
  <div class="container-login">
    <div class="container-logo d-flex justify-center align-center">
      <h1>LOGO</h1>
    </div>
    <div class="container-form">
      <h1>Iniciar sesion</h1>
      <form action @submit.prevent="login">
  
        <div>
          <label for="email">Ingresa tu correo</label>
          <input v-model="correo" type="email" id="email" placeholder="juanito13@gmail.com" />
        </div>
  
        <div >
          <label for="clave">Ingresa tu contraseña</label>
          <input v-model="password" type="password" id="clave" placeholder="Juan123" />
        </div>
  
        <p v-if="error" class="error">{{ errMsg }}</p>
        <div class="d-flex w-100"><input type="submit" value="Entrar" class="btn"></div>
        <p class="mt-10">No tienes cuenta? <router-link to="/singup">Registrate</router-link></p>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-login { 
  display: flex;
  align-items: center;
  height: 100vh;
  .container-form{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    
    flex-basis: 80%;
    height: 100%;
    form{
      width: 400px;
    }
  }
  .container-logo{
    flex-basis: 20%;
    height: 100%;
    background-color: #248AFF;
    color: #fff;
  }
  .mt-10{
    margin-top: 10px;
  }
}
</style>
