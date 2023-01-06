<script>
export default {
    name: 'FormComponent',
    props: {
        dataProductToEdit: {}
    },
    data: () => ({
        nombre: '',
        precio: '',
        imagen: 'imgaen.jpg'
    }),
    mounted() {
        this.resetValues()
        if (Object.keys(this.dataProductToEdit).length > 0) {
            this.nombre = this.dataProductToEdit.nombre;
            this.precio = this.dataProductToEdit.precio;
            this.imagen = this.dataProductToEdit.imagen;
        }
    },
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
            this.resetValues()
        },
        closeModal() {
            this.$emit('custom-event2', false)
        },
        resetValues() {
            this.nombre = ''
            this.precio = ''
            this.imagen = 'imgaen.jpg'
        }
    },
}

</script>

<template>
    <div class="overlay">
        <div class="modal">
            <div class="header-modal"><button @click="closeModal">X</button></div>
            <form action @submit.prevent="emitEvent">
                <div>
                    <label for="nombre">Ingresa el nombre</label>
                    <input v-model="nombre" type="text" id="nombre" placeholder="arroz" required />
                </div>
                <div>
                    <label for="precio">Ingresa el precio</label>
                    <input v-model="precio" type="number" id="precio" placeholder="1000" required />
                </div>
                <div>
                    <label for="imagen">Ingresa la imagen</label>
                    <input type="file" id="imagen" placeholder="image.jpg" />
                </div>
                <input type="submit" value="Guardar" class="btn">
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.overlay {
    position: fixed;
    width: 100%;
    display: flex;
    justify-content: center;

    .modal {
        padding: 10px;
        width: 600px;
        background-color: #fff;
        border: 1px solid #000;

        button {
            background-color: transparent;
            border: 0;
            font-size: 20px;
            cursor: pointer;
        }
    }

    .header-modal {
        display: flex;
        justify-content: flex-end;
    }
}
</style>
