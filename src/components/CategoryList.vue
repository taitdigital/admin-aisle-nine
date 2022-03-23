<script lang="ts">
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex'
import CategoryForm from './forms/CategoryForm.vue';
import { IMG_URL } from '../constants/index';

export default {
    components: {
        CategoryForm
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
        <div v-if="!categories.length">
            <h3>No results</h3>
            <Divider />
        </div>
        <div v-if="categories.length">
            <DataTable 
                :value="categories" 
                :paginator="true" 
                :rows="5"
                paginatorTemplate=" FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                responsiveLayout="scroll"
            >
                <Column field="image" header="">
                    <template #body="slotProps">
                        <img :src="`${imagePath}/${slotProps.data.image}`" width="50"  height="50"/>
                    </template>
                </Column>
                <Column field="name" header="Name"></Column>
                <Column header="Actions" style="text-align: right;">
                    <template #body="slotProps">
                        <Button @click="toggleEditDialog(slotProps.data)" icon="pi pi-pencil" class="p-button-rounded p-button-pirmary" style="margin-right: 6px;" />
                        <Button @click="handleDelete(slotProps.data.category_id)" icon="pi pi-trash" class="p-button-rounded p-button-danger" />
                    </template>
                </Column>
            </DataTable>    
        </div>

        <Dialog header="Edit Category" :visible="displayEdit" :style="{width: '50vw'}">
            <CategoryForm :existingCategory="selectedCategory" />

            <template #footer>
                <Button label="Cancel" icon="pi pi-times" @click="toggleEditDialog" class="p-button-text"/>
            </template>
        </Dialog>
	</div>
</template>
