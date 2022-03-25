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
        existingRecipeId: null
      }
    },
    methods: {
      onSelectRecipe(recipe_id) {
        this.existingRecipeId = recipe_id
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
                    {{ (existingRecipeId) ? 'Update' : 'Create' }} Recipe
                </div>
                <RecipeForm :existingRecipeId="existingRecipeId" />
            </template>
          </Card>

      </div>

      <div class="col-4">
          <Card>
            <template #content>
                <div class="text-lg text-center">
                    Manage Recipes
                </div>
                <Divider />
                <RecipeList @selectRecipe="onSelectRecipe" />
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
