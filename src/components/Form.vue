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
    // Funcion que se ejecuta al renderizar el componente
    mounted() {
        this.resetValues()
        if (Object.keys(this.dataProductToEdit).length > 0) {
            this.nombre = this.dataProductToEdit.nombre;
            this.precio = this.dataProductToEdit.precio;
            this.imagen = this.dataProductToEdit.imagen;
        }
    },
    methods: {
        // Funcion encargada de enviar los datos ingresados en el formulario, al home
        emitEvent() {
            this.$emit('custom-event', {
                nombre: this.nombre,
                precio: this.precio,
                imagen: this.imagen,
            })
            this.resetValues()
        },
        // Funcion encargada de cerrar la modal de crear productos
        closeModal() {
            this.$emit('custom-event2', false)
        },
        // Funcion encargada de limpiar valores de un formulario
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
