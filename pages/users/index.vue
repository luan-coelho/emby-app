<template>
  <div class='m-4'>
    <div class='mt-2 flex align-content-start align-items-center justify-content-end'>
      <Button @click="router.push('/users/create')" icon='pi pi-check' label='Cadastrar' severity='success' size='small' />
    </div>

    <Card class='mt-3 card' v-for='user in users' :key='user.Id'>
      <template #title>{{ user.Name }}</template>
      <template #content>
        <p v-if='user.LastActivityDate'>Ultima atividade: {{ formattedDate(user.LastActivityDate) }}</p>
        <p v-if='user.LastActivityDate'>Ultima data de login: {{ formattedDate(user.LastLoginDate) }}</p>
        <p>Administrador?
          <Badge class='ml-1' :value="user.Policy.IsAdministrator ? 'Sim' : 'Não'"
                 :severity="user.Policy.IsAdministrator ? 'success': 'danger'"></Badge>
        </p>
      </template>
      <template #footer v-if='deletionEnabled'>
        <Button @click='handleDeleteUser(user.Id);' icon='pi pi-check' label='Deletar' severity='danger' size='small' />
      </template>
    </Card>
  </div>
</template>

<script setup lang='ts'>
import EmbyUser from '~/types/embyUser';
import { useToast } from 'primevue/usetoast';
import { Ref } from 'vue';

const toast = useToast();

const router = useRouter();

const users: Ref<EmbyUser[]> = ref([]);

const fetchUsers = async () => {
  const embyApiKey = 'a2037633a1df4438a80a971c4ea74d83';
  const headers = {
    'X-Emby-Token': embyApiKey,
    'X-Emby-Client': 'Emby Client'
  };
  const response = await $fetch('http://localhost:8096/users', { headers });
  if (Array.isArray(response)) {
    users.value = response as EmbyUser[];
  }
};

function handleDeleteUser(id: number) {
  const embyApiKey = 'a2037633a1df4438a80a971c4ea74d83';
  const headers = {
    'X-Emby-Token': embyApiKey,
    'X-Emby-Client': 'Emby Client'
  };
  fetch(`http://localhost:8096/users/${id}`, {
    method: 'DELETE',
    headers: headers
  }).then((response) => {
    if (response.status == 200 || response.status == 204) {
      fetchUsers();
      showSuccessMessage('Usuário deletado com sucesso!');
    } else {
      showErrorMessage('Erro ao deletar usuário');
    }
  }).catch(() => {
    showErrorMessage('Erro ao deletar usuário');
  });
}

function formattedDate(date: Date): string {
  const newDate = new Date(date);
  return newDate.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
}

const deletionEnabled = computed((): boolean => {
  return users.value.length > 1;
});

function showSuccessMessage(detail: string) {
  toast.add({ severity: 'success', summary: 'Sucesso', detail: detail, life: 3000 });
}

function showErrorMessage(detail: string) {
  toast.add({ severity: 'error', summary: 'Algo inesperado aconteceu', detail: detail, life: 3000 });
}

onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
.card {
    border: 1px solid;
}
</style>
