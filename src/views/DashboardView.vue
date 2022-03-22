<script lang="ts">
  import CategoryForm from '../components/forms/CategoryForm.vue';
  import CategoryList from '../components/CategoryList.vue';

  export default {
    components: {
      CategoryForm,
      CategoryList
    }
  }
</script>


<template>
  <div class="dashboard">
    <br /><br />
    <div class="grid">
      <div class="col">
      
          <Card>
            <template #title>
                Categories
            </template>
            <template #content>
                <CategoryForm />
                <CategoryList />
            </template>
            <template #footer>
           
            </template>
          </Card>
      
      </div>
      <div class="col">
      
          <Card>
            <template #title>
                Ingredients
            </template>
            <template #content>
                <p>@todo add ingredient form</p>
                <p>@todo list of Ingredients</p> 
            </template>
            <template #footer>
          
            </template>
          </Card>

      </div>
      <div class="col">

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
