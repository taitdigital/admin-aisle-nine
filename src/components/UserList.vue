<script lang="ts">
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import { IMG_URL } from '../constants/index'

export default {
    data() {
        return {
            imagePath: IMG_URL,
            searchTerm: '',
            displayEdit: false,
            selectedUser: null
        }
    },
    computed: {
        users() {
            return this.$store.state.users.users
        }
    },
    methods: {
        toggleAdmin(is_admin) {
            console.warn('toggleAdmin', is_admin)
        },
        handleEdit(user_id) {
            console.warn('handleEdit', user_id)
        },
        handleDelete(id) {
            this.$confirm.require({
                message: 'Warning: this action cannot be undone',
                header: 'User Category',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.$store.dispatch("users/delete", id).then((r) => {
                            if (r.exception) {
                                this.$toast.add({
                                    severity:'error', 
                                    summary: 'Delete Failed', 
                                    detail: r.message, 
                                    life: 3000
                                })
                            } else {
                                this.$toast.add({
                                    severity:'success', 
                                    summary: 'Delete Successful', 
                                    detail: r.data.name + ' was deleted successfully', 
                                    life: 3000
                                })
                            }
                            this.$store.dispatch("users/index")
                        },
                        (error) => {
                            console.warn(error)
                        }
                    )
                },
                reject: () => {}
            })  
        }
    },
    setup() {
        onMounted(() => {
            const store = useStore()
            store.dispatch("users/index")
        })
    }
}
</script>

<template>
	<div>
        <div v-if="!users.length">
            <h3>No results</h3>
            <Divider />
        </div>
        <div v-if="users.length">
            <DataTable 
                :value="users" 
                :paginator="true" 
                :rows="5"
                paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                responsiveLayout="scroll"
            >
                <Column field="image" header="">
                    <template #body="slotProps">
                        <img v-if="slotProps.data.image" :src="`${imagePath}/${slotProps.data.image}`" width="50"  height="50"/>
                    </template>
                </Column>
                <Column field="id" header="ID"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="email" header="Email"></Column>
                <Column field="is_admin" header="Admin">
                    <template #body="slotProps">
                        <Checkbox v-model="slotProps.data.is_admin" :binary="true" />
                    </template>
                </Column>
                <Column header="Actions" style="text-align: right">
                    <template #body="slotProps">
                        <Button @click="handleEdit(slotProps.data)" icon="pi pi-pencil" class="p-button-text p-button-pirmary" style="margin-right: 6px" />
                        <Button @click="handleDelete(slotProps.data.category_id)" icon="pi pi-trash" class="p-button-text p-button-danger" />
                    </template>
                </Column>
            </DataTable>    
        </div>

	</div>
</template>
