<template>
  <nav class="flex align-items-center justify-content-center">
    <h1>Emby Redes II</h1>
    <ul>
      <li @click="$router.push(item.url)" v-for="item in items" :key="item.url">
        {{ item.label }}
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
const items = [
  {
    label: 'Usuários',
    url: '/'
  }
];
</script>

<style scoped>
h1 {
  margin: 0;
}

nav {
  background-color: #282936;
}

nav h1 {
  font-size: 1rem !important;
}

nav ul {
  list-style: none;
  text-decoration: none;
  font-weight: bold;
}

nav ul li {
  cursor: pointer;
}

nav ul li:hover {
  color: #93deac;
  transition: 0.3s;
}
</style>
