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
      <div class="links">
        <button @click="emitEvent">Agregar</button>
        <a href="#">{{this.nombre}}</a>
        <button @click="logout">Hola</button>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 1200px;
  max-width: 90%;
  margin-right: auto;
  margin-left: auto;
}
.nav-menu{
  padding: 15px;
}
.d-flex {
  display: flex;

  &.align-center {
    align-items: center;
  }

  &.justify-between {
    justify-content: space-between;
  }
}
</style>
