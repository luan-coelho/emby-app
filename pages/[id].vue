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

    <form id="form" @submit.prevent="updateUser">
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
          label="Atualizar"
          severity="success"
          size="small"
          :disabled="false" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import EmbyUser from '~/types/embyUser';
import { useToast } from 'primevue/usetoast';

const route = useRoute();
const toast = useToast();

const user = ref({} as EmbyUser);
const userOriginal = ref({} as EmbyUser);

onMounted(async () => {
  const id = route.params.id as string;
  user.value = await getUserById(id);
});

async function getUserById(id: string) {
  const embyApiKey = '88921fc0800c4c4998740391f2b83711';
  const headers = {
    'X-Emby-Token': embyApiKey,
    'X-Emby-Client': 'Emby Client'
  };

  const response = await fetch(`http://ec2-18-229-162-63.sa-east-1.compute.amazonaws.com:8096/users/${id}`, {
    headers: headers
  });

  return await response.json();
}

function updateUser() {
  if (validateFields()) {
    const embyApiKey = '88921fc0800c4c4998740391f2b83711';
    const headers = {
      'X-Emby-Token': embyApiKey,
      'X-Emby-Client': 'Emby Client'
    };
    fetch(`http://ec2-18-229-162-63.sa-east-1.compute.amazonaws.com:8096/users/${route.params['id']}`, {
      headers: headers,
      method: 'POST',
      body: JSON.stringify({
        ...user.value,
        newName: user.value.Name,
        NewName: user.value.Name
      })
    });

    showSuccessMessage('Usuário atualizado com sucesso!');
    cleanForm();
  }
}

function validateFields() {
  let validated = true;

  if (!user.value.Name) {
    showErrorMessage('Informe o nome');
    validated = false;
  }
  return validated;
}

const disableButton = ref(true);

watch(user, (newValue) => {
  console.log(newValue);

  console.log(userOriginal.value.Name);

  if (newValue.Name != userOriginal.value.Name) {
    disableButton.value = true;
  }
});

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
