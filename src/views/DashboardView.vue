<script lang="ts">
  import CategoryForm from '../components/forms/CategoryForm.vue';
  import CategoryList from '../components/CategoryList.vue';
  
  import IngredientForm from '../components/forms/IngredientForm.vue';
  import IngredientList from '../components/IngredientList.vue';

  export default {
    components: {
      CategoryForm,
      CategoryList,
      IngredientForm,
      IngredientList
    }
  }
</script>


<template>
  <div class="dashboard">

    <div class="grid mt-4">
      <div class="col-6">
      
          <Card>
            <template #content>
                <div class="text-lg text-center">
                    Manage Categories
                </div>
                <CategoryForm />
                <CategoryList />
            </template>
          </Card>
      
      </div>
      <div class="col-6">
      
          <Card>
            <template #content>
                <div class="text-lg text-center">
                    Manage Ingredients
                </div>
                <IngredientForm />
                <IngredientList />
            </template>
          </Card>

      </div>

    </div>

    <div class="grid mt-4">

      <div class="col-12">

          <Card>
            <template #title>
                Recipes
            </template>
            <template #content>
                <p>@todo add recipe form in modal</p>
                <p>@todo list of recipes</p> 
            </template>
            <template #footer>
       
            </template>
          </Card>

      </div>

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
