<script lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

export default {
    data() {
      return {
        errorMessage: ref(''),
        email: '',
        password: '',
        submitted: ref(false)
      }
    },
    methods: {
      handleSubmit(isFormValid) {
          if (!isFormValid) {
            this.submitted = true
            return;
          }
              
          this.$store.dispatch("auth/login", this.state).then((r) => {
              if (r?.message) {
                this.errorMessage = r.message
              } else {
                this.$router.push("/dashboard")
              }
            },
            (error) => {
              this.errorMessage =
                  ( 
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                  ) 
                  || error.message 
                  || error.toString();
            }
          );  
        }
    },
    setup() {
      const state = reactive({
          email: '',
          password: ''
      });

      const rules: any = {
          email: { required, email },
          password: { required }
      }

      const v$ = useVuelidate(rules, state);
      return { v$, state, rules }
    }
}
</script>

<template>
    <div class="login-form mt-4">
        <div class="flex justify-content-center">

          <Card>
            <template #content>
                <div class="text-lg text-center mb-4">Login</div>

                <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
                  <div class="field pb-3">
                      <div class="p-input-icon-right">
                          <label for="email" :class="{'p-error':v$.email.$invalid} + ' text-sm'">Email *</label>
                          <i class="pi pi-envelope mt-1" />
                          
                          <InputText id="email" 
                            v-model="v$.email.$model" 
                            :class="{'p-invalid':v$.email.$invalid} + ' text-sm mt-2'" 
                            aria-describedby="email-error"
                          />
                      </div>

                      <span v-if="v$.email.$error && submitted || v$.email.$invalid && submitted">
                          <span id="email-error" :key="index">
                            <small class="p-error">A registered email address is required</small>
                          </span>
                      </span>

                      <small v-else-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response" class="p-error">
                        {{error.$message.replace('Value', 'A valid email address')}}
                      </small>
                  </div>
                    
                  <div class="field pb-3">
                      <div>
                          <label for="password" :class="{'p-error':v$.password.$invalid && submitted} + ' text-sm'">Password *</label>
                          
                          <Password id="password" 
                            :feedback="false" 
                            v-model="v$.password.$model" 
                            :class="{'p-invalid':v$.password.$invalid && submitted} + ' text-sm mt-2'" 
                          /> 
                      </div>

                      <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response" class="p-error">
                        {{v$.password.required.$message.replace('Value', 'Password')}}
                      </small>
                  </div>

                  <div>
                    <p v-if="errorMessage" class="text-xs text-center p-0 m-0 text-pink-500">{{ errorMessage }}</p>
                  </div>

                  <Button type="submit" label="Submit" />
                </form>

            </template>
          </Card>

        </div>
    </div>
</template>

