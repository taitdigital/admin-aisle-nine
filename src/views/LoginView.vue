<script lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

export default {
    data() {
      return {
        email: '',
        password: '',
        submitted: ref(false),
        state: reactive({
            email: '',
            password: ''
        }),
        rules: {
            email: { required, email },
            password: { required }
        }
      }
    },
    methods: {
      handleSubmit(isFormValid) {
          if (!isFormValid) {
            return;
          }
              
          this.$store.dispatch("auth/login", this.state).then((r) => {
              this.$router.push("/dashboard");
            },
            (error) => {
              this.message =
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
    <div class="login-form">
        <div class="flex justify-content-center">
            <div class="card">
                <h5 class="text-center">Login</h5>

                <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
                    <div class="field">
                        <div class="p-float-label p-input-icon-right">
                            <i class="pi pi-envelope" />
                            <InputText id="email" v-model="v$.email.$model" :class="{'p-invalid':v$.email.$invalid && submitted}" aria-describedby="email-error"/>
                            <label for="email" :class="{'p-error':v$.email.$invalid && submitted}">Email*</label>
                        </div>

                        <span v-if="v$.email.$error && submitted">
                            <span id="email-error" v-for="(error, index) of v$.email.$errors" :key="index">
                            <small class="p-error">{{error.$message}}</small>
                            </span>
                        </span>

                        <small v-else-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response" class="p-error">
                          {{v$.email.required.$message.replace('Value', 'Email')}}
                        </small>
                    </div>
                    
                    <div class="field">
                        <div class="p-float-label">
                            <Password id="password" :feedback="false" v-model="v$.password.$model" :class="{'p-invalid':v$.password.$invalid && submitted}" /> 
                            <label for="password" :class="{'p-error':v$.password.$invalid && submitted}">Password*</label>
                        </div>

                        <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response" class="p-error">
                          {{v$.password.required.$message.replace('Value', 'Password')}}
                        </small>
                    </div>

                    <Button type="submit" label="Submit" class="mt-2" />
                </form>
            </div>
        </div>
    </div>
</template>

