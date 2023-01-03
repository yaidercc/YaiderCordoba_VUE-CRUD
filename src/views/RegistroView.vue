<script>
import { createUser, renovateToken} from "@/logic/auth";
export default {
  data: () => ({
    error: false,
    errMsg: "",
    nombre: "",
    correo: "",
    password: "",
    passwordRepeat: ""
  }),
  beforeCreate() {
    // Valida si hay un token
    renovateToken(localStorage.getItem("token"))
      .then(resp=>{
          this.$router.push("/");
      })
  },
  methods: {

    async register() {
      this.error = false;
      this.errMsg = '';
      if (this.password == this.passwordRepeat) {
        try {
          await createUser(this.nombre, this.correo, this.password);
          alert("Usuarios creado con exito.");
          // Redireccionar al login
          this.$router.push("/login");
        } catch (error) {
          // Se valide si son errores de middlewares 
          this.errMsg = error.response.data.msg || error.response.data.errors[0].msg;
          this.error = true;
        }

      } else {
        this.error = true;
        this.errMsg = 'Las contraseñas no coinciden';
      }
    }
  }
};
</script>

<template>
  <div>
    <h1>Registrarse</h1>
    <form action @submit.prevent="register">

      <div>
        <label for="email">Ingresa tu nombre</label>
        <input v-model="nombre" type="text" id="email" placeholder="juanito13@gmail.com" />
      </div>

      <div>
        <label for="clave">Ingresa tu correo</label>
        <input v-model="correo" type="email" id="clave" placeholder="Juan123" />
      </div>

      <div>
        <label for="clave">Ingresa tu contraseña</label>
        <input v-model="password" type="password" id="clave" placeholder="Juan123" />
      </div>

      <div>
        <label for="clave">Repite tu contraseña</label>
        <input v-model="passwordRepeat" type="password" id="clave" placeholder="Juan123" />
      </div>
      <p v-if="error" class="error">{{ errMsg }}</p>
      <input type="submit" value="Entrar">
      <p>Ya tienes cuenta? <router-link to="/login">Inicia sesion</router-link></p>
    </form>
  </div>
</template>

<style scoped>

</style>
