<script lang="ts">
  import { ref } from 'vue'
  import RecipeForm from '../components/forms/RecipeForm.vue'
  import RecipeList from '../components/RecipeList.vue'
  import ProgressSpinner from 'primevue/progressspinner';

  export default {
    components: {
      RecipeForm,
      RecipeList,
      ProgressSpinner
    },
    data() {
      return {
        existingRecipeId: ref(null),
        createdRecipe: ref(null)
      }
    },
    methods: {
      onSelectRecipe(recipe_id) {
        this.existingRecipeId = recipe_id
      },
      onDeleteRecipe(recipe_id) {
        this.existingRecipeId = recipe_id
      },
      onCreateRecipe(recipe) {
        this.createdRecipe = recipe
      },
      onRecipeLoading(isLoading) {
        this.isLoading = isLoading
      }
    },
    setup() {
      const isLoading = ref(false)
      return { isLoading }
    }
  }
</script>

<template>
    <div class="grid mt-4">

      <div class="col-8">
          <Card>
            <template #content>
                <div class="text-lg flex align-items-center justify-content-between">
                  <span>{{ (existingRecipeId) ? 'Update' : 'Create' }} Recipe {{ existingRecipeId }}</span>
                  <span style="width:25px; height:25px">
                    <ProgressSpinner v-if="isLoading" style="width:25px; height:25px" strokeWidth="5" animationDuration="2s"/>
                  </span>
                </div>
                <RecipeForm 
                  :existingRecipeId="existingRecipeId" 
                  @recipeCreated="onCreateRecipe" 
                  @recipeLoading="onRecipeLoading"
                />
            </template>
          </Card>

      </div>

      <div class="col-4">
          <Card>
            <template #content>
                <RecipeList 
                  @selectRecipe="onSelectRecipe" 
                  @deleteRecipe="onDeleteRecipe" 
                  :createdRecipe="createdRecipe"
                />
            </template>
          </Card>
      </div>
    </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
