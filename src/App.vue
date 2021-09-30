<template>
  <main class="container mx-auto flex flex-col justify-center items-center h-screen">
    <img alt="Vue logo" src="./assets/logo.png" class="w-50">
    <form @submit.prevent="generateName" class="mt-6">
      <select name="type" id="prefix" v-model="type" :class="typeClasses">
        <option v-for="{ item } in types" :key="item">{{ item }}</option>
      </select>
      <select name="prefix" id="prefix" v-model="prefix" :class="prefixClasses">
        <option v-for="{ item } in prefixes" :key="item">{{ item }}</option>
      </select>
      <input type="text" placeholder="123 my branch" v-model="branchName">
      <button type="submit" class="ml-4 px-2 py-1 bg-green-400 hover:bg-green-500 transition rounded">Generate</button>
    </form>
    <div v-if="status" class="p-4">
      <p class="select-all font-semibold" :class="typeClasses">
        {{ status }}
      </p>
    </div>
  </main>
</template>

<script>

const prefixes = [
  { item: 'TTG', color: 'green' },
  { item: 'GP', color: 'yellow' },
  { item: 'FIN', color: 'purple' },
]
const types = [
  { item: 'feature', color: 'green' },
  { item: 'bug', color: 'red' },
  { item: 'task', color: 'blue' },
  { item: 'hotfix', color: 'yellow' },
]


export default {
  name: 'App',
  data() {
    return {
      type: types[0].item,
      prefix: prefixes[1].item,
      branchName: '',
      status: '',
    }
  },
  computed: {
    format() {
      return this.branchName.trim().toLowerCase().split(' ').join('-')
    },
    prefixes() {
      return prefixes
    },
    types() {
      return types
    },
    typeClasses() {
      return this.generateTextColors(this.types, this.type)
    },
    prefixClasses() {
      return this.generateTextColors(this.prefixes, this.prefix)
    },
  },
  methods: {
    generateTextColors(array, matches, shade = '500') {
      return array.map((arrayItem) => ({ [`text-${arrayItem.color.toLowerCase()}-${shade}`]: arrayItem.item === matches }))
    },
    generateName() {
      if (!this.branchName.trim().length) return
      const branch = `${this.type}/${this.prefix}-${this.format}`
      this.$copyText(branch).then(() => this.status = 'successfully copied to clipboard')
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
