<template>
    <Menubar :model="items">
        <template #start>
            <img alt="logo" src="/emby.png" height="40" class="mr-4" />
        </template>
    </Menubar>
</template>

<script setup lang="ts">
import Menubar from 'primevue/menubar';

const items = [{
    label: 'Usuários',
    icon: 'pi pi-fw pi-users',
    url: '/users'
}]
</script>
