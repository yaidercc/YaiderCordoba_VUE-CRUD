<script>
import { loginUser, renovateToken,sendEmailUser } from "../services/services";
export default {
  data: () => ({
    error: false,
    errMsg: "",
    correo: "",
  }),

  methods: {

    async sendEmail() {
      try {
        this.errMsg = '';
        this.error = false;
        const resp = await sendEmailUser(this.correo);
        alert("correo enviado, revisa tu bandeja de entrada o tu carpeta de spam.")
        // Redireccionar al login
        this.$router.push("/login");
      } catch (error) {
        // Se valide si son errores de middlewares 
        this.errMsg = error.response.data.msg || error.response.data.errors[0].msg;
        this.error = true;
      }
    }
  },
  name: 'sendEmailComponent',
};
</script>

<template>
  <div class="container-login">
    <div class="container-logo d-flex justify-center align-center">
      <h1>TIENDA</h1>
    </div>
    <div class="container-form">
      <h1>Recuperar contraseña</h1>
      <form action @submit.prevent="sendEmail">
        <div>
          <label for="email">Ingresa tu correo</label>
          <input v-model="correo" type="email" id="email" placeholder="juanito13@gmail.com" required/>
        </div>
        <p v-if="error" class="error">{{ errMsg }}</p>
        <div class="d-flex w-100"><input type="submit" value="Enviar" class="btn"></div>
        <router-link to="/login">Volver al login</router-link>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-login {
  display: flex;
  align-items: center;
  height: 100vh;

  .container-form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    flex-basis: 80%;
    height: 100%;

    form {
      width: 400px;
    }
  }

  .container-logo {
    flex-basis: 20%;
    height: 100%;
    background-color: #248AFF;
    color: #fff;
  }

  .mt-10 {
    margin-top: 10px;
  }
}
</style>
