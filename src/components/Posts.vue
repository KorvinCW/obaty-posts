<template>
  <div>
    <div class="filters">
      <label>
        <input type="radio" v-model="filters.sortBy" value="asc"> From new to old
      </label>
      <label>
        <input type="radio" v-model="filters.sortBy" value="desc"> From old to new
      </label>
      <label>
        <input type="checkbox" v-model="filters.showOnlyCurrentUser"> My posts
      </label>
    </div>
    <ul>
      <li v-for="post of filteredPosts" :key="post.id">
        <router-link :to="{ name:'post-form', params: {id: post.id} }">
          <div class="content">
            <h2 class="postTitle">{{ post.title }}</h2>
            <p>{{ post.body }}</p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, computed, onMounted, reactive } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'AllPosts',
  setup() {
    const store = useStore();
    const currentUser = computed(() => store.state.post.currentUser.id);
    const allPosts = computed(() => store.getters.allPosts);

    const filters = reactive({
      sortBy: 'asc',
      showOnlyCurrentUser: false,
    });

    const filterPosts = (posts) => {
      if (filters.showOnlyCurrentUser) {
        posts = posts.filter(post => post.userId === currentUser.value);
      }

      if (filters.sortBy === 'asc') {
        return [...posts].sort((a, b) => a.id - b.id);
      } else if (filters.sortBy === 'desc') {
        return [...posts].sort((a, b) => b.id - a.id);
      }

      return posts;
    };

    const filteredPosts = computed(() => filterPosts(allPosts.value));

    onMounted(async () => {
      if (!store.state.post.postsList.length) {
        await store.dispatch('loadPosts');
      }
      if (!Object.keys(store.state.post.currentUser).length) {
        await store.dispatch('loadUser');
      }
    });

    return { filteredPosts, filters };
  },
});
</script>
<style scoped>
ul {
  text-align: left;
  list-style-type: none;
}

.content {
  color: #000000;
}
</style>