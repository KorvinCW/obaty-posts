<template>
  <div class="about">
    <div class="name">{{ currentUser.name }}</div>
    <div class="userName">{{ currentUser.username }}</div>
    <div class="email">{{ currentUser.email }}</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();
    const currentUser = store.state.post.currentUser;

    return { currentUser };
  },
});
</script>


