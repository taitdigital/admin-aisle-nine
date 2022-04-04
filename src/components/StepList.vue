<script lang="ts">
import { onMounted, watch } from 'vue';
import { useStore } from 'vuex'
import { IMG_URL } from '../constants/index';

export default {
    emits: ['selectStep'],
    props: ['recipe'],
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
        formatTimerValue(timerRawValue) {
            return timerRawValue.split(':').map(t => (t.length < 2) ? `0${t}` : t).join(':')
        },
        toggleEditDialog(selectedStep) {
            this.$emit("selectStep", selectedStep)
        },
        handleDelete(id) {
            this.$store.dispatch("recipeSteps/delete", id).then((r) => {
                this.$toast.add({
                    severity:'success', 
                    summary: 'Delete Successful', 
                    detail: 'The step was deleted.', 
                    life: 3000
                })
                console.warn('debug:: ', r)

                this.$store.dispatch("recipeSteps/index", this.props.recipe.recipe_id)
            },
            (error) => {
              console.warn('debug:: ', error)
            }
          );  
        }
    },
    setup(props) {
        const store = useStore()

        onMounted(() => {
            store.dispatch("recipeSteps/index", props.recipe.recipe_id)
        })

        watch(() => props.recipe, (newValue, oldValue) => {
            store.dispatch("recipeSteps/index", newValue.recipe_id)
        });

        return { store, props }
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
                <Column field="step_order" header="" :rowReorder="true">
                </Column>
                <Column field="step_order" header="Step">
                    <template #body="slotProps">
                        {{ slotProps.data.step_order }}
                    </template>
                </Column>
                <Column field="image" header="Image">
                    <template #body="slotProps">
                        <img v-if="slotProps.data.image" :src="`${imagePath}/${slotProps.data.image}`" width="50"  height="50"/>
                    </template>
                </Column>
                <Column field="name" header="Name"></Column>
                <Column field="timer" header="Timer">
                    <template #body="slotProps">
                        {{ formatTimerValue(slotProps.data.timer) }}
                    </template>
                </Column>
                <Column header="Actions" style="text-align: right;">
                    <template #body="slotProps">
                        <Button @click="toggleEditDialog(slotProps.data)" icon="pi pi-pencil" class="p-button-text p-button-pirmary" style="margin-right: 6px;" />
                        <Button @click="handleDelete(slotProps.data.recipe_step_id)" icon="pi pi-trash" class="p-button-text p-button-danger" />
                    </template>
                </Column>
            </DataTable>    
        </div>
	</div>
</template>
