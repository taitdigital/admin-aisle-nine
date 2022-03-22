<script lang="ts">
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex'
import CategoryForm from './forms/CategoryForm.vue';


export default {
    components: {
        CategoryForm
    },
    data() {
        return {
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
            console.warn('toggleEditDialog', selectedCategory);
            this.selectedCategory = selectedCategory
            this.displayEdit = !this.displayEdit
        },
        handleDelete(id) {
            this.$store.dispatch("categories/delete", id).then((r) => {
                console.warn('category deleted successfully: ', r);
                
                this.$store.dispatch("categories/index").then((data) => {
                    console.warn('get categories success: ', data)
                });
            },
            (error) => {
              console.warn(error);
            }
          );  
        }
    },
    setup() {
        onMounted(() => {
            const store = useStore()

            store.dispatch("categories/index").then((data) => {
                console.warn('get categories success: ', data)
            })
        })
    }
}
</script>

<template>
	<div>
        <div class="flex justify-content-center">
            <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText type="text" v-model="searchTerm" placeholder="Search" />
            </span>
        </div>
        <DataTable 
            :value="categories" 
            :paginator="true" 
            :rows="5"
            paginatorTemplate=" FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
            responsiveLayout="scroll"
        >
            <Column field="name" header="Name"></Column>
            <Column header="Actions">

                <template #body="slotProps">
                    <Button @click="toggleEditDialog(slotProps.data)" icon="pi pi-pencil" class="p-button-rounded p-button-pirmary" style="margin-right: 6px;" />
                    <Button @click="handleDelete(slotProps.data.category_id)" icon="pi pi-trash" class="p-button-rounded p-button-danger" />
                </template>
            </Column>

            <template #paginatorstart>
                <Button type="button" icon="pi pi-refresh" class="p-button-text" />
            </template>
            <template #paginatorend>
                <Button type="button" icon="pi pi-cloud" class="p-button-text" />
            </template>
        </DataTable>    

        <Dialog header="Edit Category" :visible="displayEdit" :style="{width: '50vw'}">
            <CategoryForm :existingCategory="selectedCategory" />

            <template #footer>
                <Button label="Cancel" icon="pi pi-times" @click="toggleEditDialog" class="p-button-text"/>
            </template>
        </Dialog>
	</div>
</template>
