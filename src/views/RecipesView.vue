<script lang="ts">
  import { ref } from 'vue'
  import RecipeForm from '../components/forms/RecipeForm.vue'
  import RecipeList from '../components/RecipeList.vue'

  export default {
    components: {
      RecipeForm,
      RecipeList
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
      }
    }
  }
</script>

<template>
    <div class="grid mt-4">

      <div class="col-8">
          <Card>
            <template #content>
                <div class="text-lg text-center">
                    {{ (existingRecipeId) ? 'Update' : 'Create' }} Recipe {{ existingRecipeId }}
                </div>
                <RecipeForm :existingRecipeId="existingRecipeId" @recipeCreated="onCreateRecipe" />
            </template>
          </Card>

      </div>

      <div class="col-4">
          <Card>
            <template #content>
                <RecipeList @selectRecipe="onSelectRecipe" @deleteRecipe="onDeleteRecipe" :createdRecipe="createdRecipe"/>
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
