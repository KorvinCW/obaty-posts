<template>
  <nav>
    <router-link to="/">Posts</router-link> |
    <router-link to="/personal">My profile</router-link> |
    <router-link :to="{ name: 'new-post' }">Create new post</router-link>
  </nav>
  <router-view/>
</template>

<style lang="scss">
#app {
  max-width: 600px;
  margin: 0 auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
