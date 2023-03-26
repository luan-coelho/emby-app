<template>
  <div>
    <Button @click="router.push('/users/create')" icon='pi pi-check' aria-label='New' />
    <UserCard :user='user' v-for='(user, index) in users' :key='index' />
  </div>
</template>

<script setup lang='ts'>
import User from '~/types/user';

const router = useRouter();

const users = ref([] as User[]);

const embyApiKey = 'a2037633a1df4438a80a971c4ea74d83';

const fetchUsers = async () => {
  const headers = {
    'X-Emby-Token': embyApiKey,
    'X-Emby-Client': 'Emby Client'
  };
  const response = await $fetch('http://localhost:8096/users', { headers });
  if (Array.isArray(response)) {
    users.value = response as User[];
  }
};

onMounted(() => {
  fetchUsers();
});
</script>
