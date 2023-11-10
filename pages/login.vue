<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";

const state = ref({
    email: undefined,
    password: undefined,
    otp:undefined
});

const validate = (state: any): FormError[] => {
    const errors = [];
    if (!state.email) errors.push({ path: "email", message: "Required" });
    if (!state.password) errors.push({ path: "password", message: "Required" });
    if (!state.otp) errors.push({ path: "email", message: "Required" });
    return errors;
};

async function initiate_submit(event: FormSubmitEvent<any>) {
    // Do something with data
    console.log(event.data);
}


</script>
<template>
    <section>
        <UContainer>
            <UForm :validate="validate" :state="state" @submit="initiate_submit" class="space-y-4">
              <h2>Add your swarm credentials here, this is the only way</h2>
                <UFormGroup label="Email" name="email">
                    <UInput v-model="state.email" />
                </UFormGroup>
                <UFormGroup label="Password" name="password">
                    <UInput v-model="state.password" type="password" />
                </UFormGroup>
                <UFormGroup v-if="state.otp" label="otp" name="otp">
                    <UInput v-model="state.otp" type="text" />
                </UFormGroup>
                <UButton type="submit">Submit</UButton>
            </UForm>
        </UContainer>
    </section>
</template>
