<template>
  <div>
    <Card>
      <template #title>{{ props.user.Name }}</template>
      <template #content>
        <p>Ultima atividade: {{ formattedDate(props.user.LastActivityDate) }}</p>
        <p>Ultima data de login: {{ formattedDate(props.user.LastLoginDate) }}</p>
        <p>Administrador?
          <Badge class='ml-3' :value="props.user.Policy.IsAdministrator ? 'Sim' : 'Não'"
                 :severity="props.user.Policy.IsAdministrator ? 'success': 'danger'"></Badge>
        </p>
      </template>
    </Card>
  </div>
</template>

<script setup lang='ts'>
import User from '~~/types/user';

interface Props {
  user: User;
  bar?: number;
}

function formattedDate(date: Date): string {
  const newDate = new Date(date);
  return newDate.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
}

const props = defineProps<Props>();
</script>

<style scoped></style>
