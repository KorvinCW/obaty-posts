<template>
  <form @submit.prevent="submitComment">
    <label for="name">Title:</label>
    <input id="name" type="text" v-model="name" required><br/>

    <label for="comment">Comment:</label>
    <textarea id="comment" v-model="comment" maxlength="300" required></textarea><br/>

    <label for="email">Email:</label>
    <input id="email" type="email" :value="currentUser.email" disabled><br/>

    <button type="submit">Add comment</button>
  </form>
</template>
  
<script>
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup(props) {
    const store = useStore();
    const name = ref('');
    const comment = ref('');

    const currentUser = store.state.post.currentUser;

    const submitComment = () => {
      const commentData = {
        postId: props.postId,
        id: Date.now(),
        name: name.value,
        body: comment.value,
        email: currentUser.email,
      };
      store.dispatch('addPostComment', commentData);

      name.value = '';
      comment.value = '';
    };

    return { name, comment, submitComment, currentUser };
  },
});
</script>
<style scoped>
  input {
    display: inline-block;
  }
</style>