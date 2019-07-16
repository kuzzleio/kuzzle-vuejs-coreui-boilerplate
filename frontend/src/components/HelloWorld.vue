<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Check out the
      <a
        href="https://github.com/kuzzleio/kuzzle-vuejs-coreui-boilerplate"
        target="_blank"
        rel="noopener"
      >
        Readme
      </a>
      to learn more about this Kuzzle / Vue.js / CoreUI application boilerplate
    </p>
    <h3>Essential Links</h3>
    <ul>
      <li>
        <a
          href="https://docs.kuzzle.io/sdk/js/6/getting-started/webpack/"
          target="_blank"
          rel="noopener"
        >
          Kuzzle JS SDK docs
        </a>
      </li>
      <li>
        <a href="https://vuejs.org" target="_blank" rel="noopener">
          Vue.js Docs
        </a>
      </li>
      <li>
        <a href="https://coreui.io/vue/" target="_blank" rel="noopener">
          CoreUI
        </a>
      </li>
    </ul>
    <h3>Need help ?</h3>
    <ul>
      <li>
        <a
          href="https://gitter.im/kuzzleio/kuzzle"
          target="_blank"
          rel="noopener"
        >
          Community chat
        </a>
      </li>
      <li>
        <a
          href="https://stackoverflow.com/questions/ask?guided=false&title=[Kuzzle]"
          target="_blank"
          rel="noopener"
        >
          Ask your question on Stack Overflow
        </a>
      </li>
      <li>
        <a
          href="https://www.youtube.com/channel/UCHcEzVQoH10YSyxc7jD3SMw"
          target="_blank"
          rel="noopener"
        >
          Check out our tutorial videos
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
h1
  margin: 1em 0 0

h3
  margin: 2em 0 0.5em

ul
  list-style-type: none
  padding: 0

li
  display: inline-block
  margin: 0 10px

a
  color: #42b983
</style>
