<template>
  <div>
    <form @submit.prevent='handleSubmit'>
      <div class='flex flex-column gap-2'>
        <label for='username'>Username</label>
        <InputText id='username' v-model='user.name' aria-describedby='username-help' />
      </div>

      <div class='mt-2'>
        <Button type='submit' icon='pi pi-check' label='Create' severity='success' size='small' />
      </div>
    </form>
  </div>
</template>

<script setup lang='ts'>
import EmbyUser from '~/types/embyUser';

const user = ref({} as EmbyUser);

function handleSubmit() {
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
}
</script>
