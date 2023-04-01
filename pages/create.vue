<template>
  <div class="m-4">
    <div>
      <div
        class="mt-2 mb-4 flex align-content-start align-items-center justify-content-start">
        <Button
          @click="$router.push('/')"
          type="submit"
          label="Voltar"
          severity="info"
          size="small" />
      </div>
    </div>

    <form id="form" @submit.prevent="handleSubmit">
      <div class="flex flex-column gap-2">
        <label for="username">Username</label>
        <InputText
          id="username"
          v-model="user.Name"
          aria-describedby="username-help" />
      </div>

      <div
        class="mt-2 flex align-content-start align-items-center justify-content-end">
        <Button
          type="submit"
          icon="pi pi-check"
          label="Cadastrar"
          severity="success"
          size="small" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import EmbyUser from '~/types/embyUser';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const user = ref({} as EmbyUser);

function handleSubmit() {
  if (validateFields()) {
    const embyApiKey = 'a2037633a1df4438a80a971c4ea74d83';
    const headers = {
      'X-Emby-Token': embyApiKey,
      'X-Emby-Client': 'Emby Client'
    };
    $fetch('http://localhost:8096/users/new', {
      headers: headers,
      method: 'POST',
      body: JSON.stringify(user.value)
    });
    showSuccessMessage('Usuário cadastrado com sucesso!');
    cleanForm();
  }
}

function validateFields() {
  let validated = true;

  console.log(user.value.Name);
  if (!user.value.Name) {
    showErrorMessage('Informe o nome');
    validated = false;
  }
  return validated;
}

function cleanForm() {
  let form = document.getElementById('form') as HTMLFormElement;
  form.reset();
}

function showSuccessMessage(detail: string) {
  toast.add({
    severity: 'success',
    summary: 'Sucesso',
    detail: detail,
    life: 3000
  });
}

function showErrorMessage(detail: string) {
  toast.add({
    severity: 'error',
    summary: 'Validação falhou',
    detail: detail,
    life: 3000
  });
}
</script>
