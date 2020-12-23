<template>
    <main>
        <nav class="navbar navbar-dark bg-dark">
            <a href="/" class="navbar-brand">MEVN Stack</a>
        </nav>

        <div class="container">
            <div class="row pt-5">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="SendTask">
                                <div class="form-group">
                                    <input v-model="task.title" type="text" placeholder="Título  de la Tarea" class="form-control">
                                </div>
                                <div class="form-group">
                                    <textarea v-model="task.descripcion" cols="30" rows="10" class="form-control" placeholder="Descripción de la Tarea"></textarea>
                                </div>

                                <template v-if="editing === false">
                                    <button class="btn btn-danger btn-block">Enviar</button>
                                </template>
                                <template v-if="editing === true">
                                    <button class="btn btn-danger btn-block">Actualizar</button>
                                </template>

                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-md-7">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Tarea</th>
                                <th>Descripción</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="task of tasks">
                                <td> {{ task.title }} </td>
                                <td> {{ task.descripcion }} </td>
                                <td>
                                    <button class="btn btn-danger" @click="DeleteTask(task._id)">Delete</button>
                                </td>
                                <td>
                                    <button class="btn btn-warning" @click="EditTask(task._id)">Editar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {
            task: {
                title: '',
                descripcion: ''
            },
            tasks: [],
            editing: false,
            id_task_edit: ''
        }
    },

    created() {
        this.GetTask();
    },
    methods: {

        GetTask() {
            fetch('/')
            .then(res => res.json())
            .then(data => {
                this.tasks = data
                console.log(this.tasks)    
            })
        },

        SendTask() {

            if ( this.editing === false ) {

                fetch('/', {
                    method: 'POST',
                    body: JSON.stringify(this.task),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => this.GetTask()) // Volver a get para que se actualice)

            } else {

                fetch('/'+this.id_task_edit , {
                method: 'PUT',
                body: JSON.stringify(this.task),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
                })
                .then(res => res.json())
                .then(data => {
                    this.GetTask()
                    this.editing = false;
                }) // Volver a get para que se actualice)
            }
        },
        DeleteTask(id) {
            fetch('/'+id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => this.GetTask()) // Volver a get para que se actualice)
        },

        EditTask(id){

            this.editing = true;
            this.id_task_edit = id;

            fetch('/'+id)
            .then(res => res.json())
            .then(data => {
                // Datos del campo a actualizar en los inputs
                this.task.title = data.title;
                this.task.descripcion = data.descripcion
            })            
        }
    }
}
</script>