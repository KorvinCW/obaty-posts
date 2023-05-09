<template>
  <div class="commentsWrapper">
    <h2>Comments</h2>
    <AddComment :postId="route.params.id"/>
    <ul>
      <li v-for="comment of postComments" :key="comment.id">
        <div class="content">
          <div class="titleComment">
            <strong>Title: </strong>
            {{ comment.name }}
          </div>
          <div class="bodyComment">
            {{ comment.body }}
          </div>
          <div class="userEmail">
            <strong>Email: </strong>
            {{ comment.email }}
        </div>
        </div>
      </li>
    </ul>
  </div>
</template>
  
<script>
import { defineComponent, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import AddComment from './AddComment.vue';

export default defineComponent({
  components: {
    AddComment
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const postComments = computed(() => store.getters.postComments);

    onMounted(async () => {
      await store.dispatch('loadPostComments', route.params.id);
    });

    return { postComments, route };
  },
});
</script>

<style scoped>
  ul {
    text-align: left;
    list-style-type: none;
  }

  li {
    margin-bottom: 20px;
  }
</style>