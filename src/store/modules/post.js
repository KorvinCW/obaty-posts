export default {
    state: {
      currentUser: {},
      postsList: [],
      postComments: []
    },
    getters: {
      allPosts(state) {
        return state.postsList
      },
      postComments(state) {
        return state.postComments
      },
      getPostById: (state) => (id) => {
        return state.postsList.find(post => post.id == id)
      },
      // getCurrentUser(state) {
      //   return state.usersList.find(user => user.id == 4)
      // },
    },
    mutations: {
      loadUser(state, currentUser) {
        state.currentUser = currentUser;
      },
      loadPosts(state, posts) {
        state.postsList = posts;
      },
      createPost(state, post) {
        state.postsList.unshift(post);
      },
      updatePost(state, updatingPost) {
        const postList = state.postsList;
        const currentPost = postList.findIndex((item) => item.id === updatingPost.id);

        if (currentPost !== -1) {
          postList.splice(currentPost, 1, updatingPost);
        }
      },
      loadPostComments(state, comments) {
        state.postComments = comments;
      },
      addPostComment(state, comment) {
        state.postComments.unshift(comment);
      },
      deletePost(state, postId) {
        const postList = state.postsList;
        const currentPost = postList.findIndex((item) => item.id === postId);

        postList.splice(currentPost, 1);
      }
    },
    actions: {
      async loadUser(context) {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/4')
        const currentUser = await response.json();
  
        context.commit('loadUser', currentUser);
      },

      async loadPosts(context) {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        const postsList = await response.json();
  
        context.commit('loadPosts', postsList);
      },

      async loadPostComments(context, postId) {
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${Number(postId)}`)
        const postComments = await response.json();
  
        context.commit('loadPostComments', postComments);
      },

      async addPostComment(context, params) {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({ params }),
        });
        const newComment = await response.json();
        context.commit('addPostComment', newComment.params);
      },

      async createPost(context, params) {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({ params }),
        });
        const newPost = await response.json();
        context.commit('createPost', newPost.params);
      },

      async updatePost(context, params) {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({ params }),
        });
        const updatedPost = await response.json();
        context.commit('updatePost', updatedPost.params);
      },

      async deletePost(context, postId) {
        await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
          method: 'DELETE'
        });
        context.commit('deletePost', postId);
      },
    },
  }