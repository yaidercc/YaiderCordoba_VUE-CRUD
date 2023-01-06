<script>
import { deleteToken } from "../services/services";
export default {
  name: 'NavigationComponent',
  props: {
    nombre: String
  },
  methods: {
    logout() {
      deleteToken();
      this.$router.push("/login");
    },
    emitEvent() {
      this.$emit('custom-event', 'Hello, world!')
    },
  },
}

</script>

<template>
  <div class="container">
    <nav class="d-flex align-center justify-between nav-menu">
      <h2>LOGO</h2>
      <div class="links d-flex align-center">
        <h4>{{this.nombre}}</h4>
        <button @click="emitEvent" class="btn"><i class="fa-solid fa-magnifying-glass"></i> Agregar </button>
        <button @click="logout" class="btn salir-btn">Salir</button>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>

.nav-menu{
  padding: 15px 0;
  .links{
    *{
      margin-right: 5px;
      
    }
  }
}
.btn{
  width: 100px;
}
.salir-btn{
  background-color: red;
  width: 50px;
}
</style>
