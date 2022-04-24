<script lang="ts">
  import UserList from '../components/UserList.vue'
  import SearchForm from '../components/forms/SearchForm.vue'

  export default {
    components: {
      UserList,
      SearchForm
    },
    methods: {
      handleUserSearch(user_id) {
        console.warn('handleSearch', user_id);
      }
    }
  }
</script>

<template>
  <div class="dashboard">

    <div class="grid mt-4">
      <div class="col-12">
      
          <Card>
            <template #content>
                <div class="flex justify-content-between align-items-center">
                    <div class="text-lg">Manage Users</div>
                    <div class="flex align-items-center">
                      <SearchForm @searchTerm="handleUserSearch(searchTerm)" />
                      <span class="ml-2">
                        <Button icon="pi pi-plus" class="p-button-rounded" />
                      </span>
                    </div>
                </div>
                <Divider />
                <UserList />
            </template>
          </Card>
      
      </div>
    </div>
  </div>
</template>
