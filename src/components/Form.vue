<script>
export default {
    name: 'FormComponent',
    data: () => ({
        nombre: '',
        precio: '',
        imagen: ''
    }),
    methods: {
        logout() {
            deleteToken();
            this.$router.push("/login");
        },
        emitEvent() {
            this.$emit('custom-event', {
                nombre: this.nombre,
                precio: this.precio,
                imagen: this.imagen,
            })
            this.nombre = ''
            this.precio = ''
            this.imagen = ''
        },
    },
}

</script>

<template>
    <div class="overlay">
        <div class="modal">
            <form action @submit.prevent="emitEvent">
                <div>
                    <label for="nombre">Ingresa el nombre</label>
                    <input v-model="nombre" type="text" id="nombre" placeholder="arroz" />
                </div>
                <div>
                    <label for="precio">Ingresa el precio</label>
                    <input v-model="precio" type="number" id="precio" placeholder="1000" />
                </div>
                <div>
                    <label for="imagen">Ingresa la imagen</label>
                    <input v-model="imagen" type="text" id="imagen" placeholder="image.jpg" />
                </div>
                <input type="submit" value="Entrar">
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;

    .modal {
        margin-top: 100px;
    }
}
</style>
