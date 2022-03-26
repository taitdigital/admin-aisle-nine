<script lang="ts">
import { onMounted } from 'vue';
import { useStore } from 'vuex'
import { IMG_URL } from '../constants/index';

export default {
    emits: ['selectStep'],
    props: ['recipeId'],
    data() {
        return {
            imagePath: IMG_URL,
            searchTerm: '',
            displayEdit: false,
            selectedStep: null
        }
    },
    computed: {
        steps() {
            return this.$store.state.recipeSteps.recipeSteps;
        }
    },
    methods: {
        toggleEditDialog(selectedStep) {
            this.$emit("selectStep", selectedStep)
        },
        handleDelete(id) {
            this.$store.dispatch("recipeSteps/delete", id).then((r) => {
                this.$toast.add({severity:'success', summary: 'Delete Successful', detail: r, life: 3000})
                this.$store.dispatch("recipeSteps/index", this.props.recipeId)
            },
            (error) => {
              console.warn(error);
            }
          );  
        }
    },
    setup(props) {
        const store = useStore()

        onMounted(() => {
            store.dispatch("recipeSteps/index", props.recipeId)
        })

        return {store, props }
    }
}
</script>

<template>
	<div>
        <div v-if="!steps.length">
            <h3>No Steps</h3>
            <Divider />
        </div>
        <div v-if="steps.length">
            <DataTable 
                :value="steps" 
                responsiveLayout="scroll"
            >
                <Column field="image" header="">
                    <template #body="slotProps">
                        <img v-if="slotProps.data.image" :src="`${imagePath}/${slotProps.data.image}`" width="50"  height="50"/>
                    </template>
                </Column>
                <Column field="name" header="Name"></Column>
                <Column field="description" header="Description"></Column>
                <Column field="timer" header="Timer"></Column>
                <Column header="Actions" style="text-align: right;">
                    <template #body="slotProps">
                        <Button @click="toggleEditDialog(slotProps.data)" icon="pi pi-pencil" class="p-button-text p-button-pirmary" style="margin-right: 6px;" />
                        <Button @click="handleDelete(slotProps.data.step_id)" icon="pi pi-trash" class="p-button-text p-button-danger" />
                    </template>
                </Column>
            </DataTable>    
        </div>
	</div>
</template>
