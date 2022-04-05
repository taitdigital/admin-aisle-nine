<script lang="ts">
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import CategoryForm from './forms/CategoryForm.vue'
import { IMG_URL } from '../constants/index'
import ConfirmDialog from 'primevue/confirmdialog';

export default {
    components: {
        CategoryForm,
        ConfirmDialog
    },
    data() {
        return {
            imagePath: IMG_URL,
            searchTerm: '',
            displayEdit: false,
            selectedCategory: null
        }
    },
    computed: {
        categories() {
            return this.$store.state.categories.categories;
        }
    },
    methods: {
        toggleEditDialog(selectedCategory) {
            this.selectedCategory = selectedCategory
            this.displayEdit = !this.displayEdit
        },
        handleDelete(id) {
            this.$confirm.require({
                message: 'Categories can only be deleted if they are not in use, This action cannot be undone are you sure?',
                header: 'Delete Category',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.$store.dispatch("categories/delete", id).then((r) => {
                            this.$toast.add({severity:'success', summary: 'Deleted successful', detail: r, life: 3000})
                            this.$store.dispatch("categories/index")
                        },
                        (error) => {
                            console.warn(error);
                        }
                    );
                },
                reject: () => {}
            })  
        }
    },
    setup() {
        onMounted(() => {
            const store = useStore()
            store.dispatch("categories/index")
        })
    }
}
</script>

<template>
	<div>
        <div v-if="!categories.length">
            <h3>No results</h3>
            <Divider />
        </div>
        <div v-if="categories.length">
            <DataTable 
                :value="categories" 
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
                <Column field="name" header="Name"></Column>
                <Column header="Actions" style="text-align: right;">
                    <template #body="slotProps">
                        <Button @click="toggleEditDialog(slotProps.data)" icon="pi pi-pencil" class="p-button-text p-button-pirmary" style="margin-right: 6px;" />
                        <Button @click="handleDelete(slotProps.data.category_id)" icon="pi pi-trash" class="p-button-text p-button-danger" />
                    </template>
                </Column>
            </DataTable>    
        </div>

        <Dialog header="Edit Category" v-model:visible="displayEdit" :style="{width: '50vw'}">
            <CategoryForm :existingCategory="selectedCategory" @onClose="displayEdit = false" />
        </Dialog>
	</div>
</template>
