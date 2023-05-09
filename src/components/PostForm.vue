<template>
  <div>
    <h1>{{ pageTitle }}</h1>
    <form>
      <div class="editFormBlock" v-if="isCurrentUsersPost || !isEditMode">
        <div>
          <label for="title">Title</label>
          <input id="title" type="text" v-model="title" />
        </div>
        <div>
          <label for="body">Text</label>
          <textarea id="body" v-model="body"></textarea>
        </div>
        <button @click="submitPost">
          {{ buttonName }}
        </button>
        <button @click="deletePost" v-if="isEditMode">
          Delete
        </button>
      </div>
      <div v-else>
        <strong>{{ title }}</strong>
        <div>{{ body }}</div>
      </div>
    </form>
    <router-link to="/">Back</router-link>
    <PostComments v-if="isEditMode"/>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import PostComments from './PostComments.vue';

export default defineComponent({
  components: {
    PostComments
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const isEditMode = !!route.params.id;
    const buttonName = isEditMode ? 'Update' : 'Create';
    const pageTitle = isEditMode ? 'Edit post' : 'New post';
    const currentPost = store.getters.getPostById(route.params.id);
    const isCurrentUsersPost = isEditMode && (store.state.post.currentUser.id === currentPost.userId);

    const title = ref(currentPost?.title || '');
    const body = ref(currentPost?.body || '');

    const submitPost = () => {
      const postData = {
        title: title.value,
        body: body.value,
        id: isEditMode ? Number(route.params.id) : Date.now(),
        userId: currentPost?.userId || store.state.post.currentUser.id,
      };
      const mutationName = isEditMode ? 'updatePost' : 'createPost';

      store.dispatch(mutationName, postData)
      .then(navigateToPosts());
    };

    const deletePost = () => {
        const postId = Number(route.params.id);

        store.dispatch('deletePost', postId)
        .then(navigateToPosts());
    };

    onMounted(async () => {
      if (!store.state.post.postsList.length) {
        await store.dispatch('loadPosts');
      }
      if (!Object.keys(store.state.post.currentUser).length) {
        await store.dispatch('loadUser');
      }
    });

    const navigateToPosts = () => router.push('/')

    return { title, body, isEditMode, pageTitle, submitPost, isCurrentUsersPost, deletePost, buttonName, onMounted };
  },
});
</script>