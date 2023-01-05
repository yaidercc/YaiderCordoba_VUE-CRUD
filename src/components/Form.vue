<script>
export default {
    name: 'FormComponent',
    props: {
        dataProductToEdit:{}
    },
    data: () => ({
        nombre: '',
        precio: '',
        imagen: 'imgaen.jpg'
    }),
    mounted() {
        this.resetValues()
        if(Object.keys(this.dataProductToEdit).length>0){
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
        resetValues(){
            this.nombre = ''
            this.precio = ''
            this.imagen = ''
        }
    },
}

</script>

<template>
    <div class="overlay">
        <div class="modal">
            
            <form action @submit.prevent="emitEvent">
                <div>
                    <label for="nombre">Ingresa el nombre</label>
                    <input v-model="nombre" type="text" id="nombre" placeholder="arroz" required/>
                </div>
                <div>
                    <label for="precio">Ingresa el precio</label>
                    <input v-model="precio" type="number" id="precio" placeholder="1000" required/>
                </div>
                <div>
                    <label for="imagen">Ingresa la imagen</label>
                    <input v-model="imagen" type="text" id="imagen" placeholder="image.jpg" required/>
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
    height: 100%;
    display: flex;
    justify-content: center;

    .modal {
        margin-top: 100px;
    }
}
</style>
