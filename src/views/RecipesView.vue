<script lang="ts">
  import RecipeForm from '../components/forms/RecipeForm.vue';
  import RecipeList from '../components/RecipeList.vue';

  export default {
    components: {
      RecipeForm,
      RecipeList
    }
  }
</script>

<template>
    <div class="grid mt-4">

      <div class="col-8">
          <Card>
            <template #content>
                <div class="text-lg text-center">
                    Create Recipe
                </div>
                <RecipeForm />
            </template>
          </Card>

      </div>

      <div class="col-4">
          <Card>
            <template #content>
                <div class="text-lg text-center">
                    Manage Recipes
                </div>
                <RecipeList />
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
