<template>
  <main class="container mx-auto flex flex-col justify-center items-center h-screen">
    <img alt="Vue logo" src="./assets/Octocat.png" class="w-56">
    <form @submit.prevent="generateName" class="mt-6">
      <select name="type" id="prefix" v-model="type" :class="typeClasses" class="bg-transparent">
        <option v-for="{ item } in types" :key="item">{{ item }}</option>
      </select>
      <select name="prefix" id="prefix" v-model="prefix" :class="prefixClasses" class="bg-transparent">
        <option v-for="{ item } in prefixes" :key="item">{{ item }}</option>
      </select>
      <input type="text" placeholder="123 my branch" v-model="branchName" class="bg-transparent w-64" :class="prefixClasses">
      <button type="submit" class="ml-4 px-2 py-1 transition rounded text-gray-300 border-current border hover:text-gray-400 focus:text-gray-400">
        Copy
      </button>
    </form>
    <div v-if="branchName.length" class="p-4">
      <p class="select-all font-semibold">
        <span :class="typeClasses">{{type}}</span><span :class="prefixClasses">/{{prefix}}-{{branchName.toLowerCase().split(' ').join('-')}}</span>
      </p>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Item } from './models/branch'

const prefixes: Item[] = [
  { item: 'TTG', color: 'green', shade: '700' },
  { item: 'GP', color: 'yellow', shade: '600' },
  { item: 'KD', color: 'blue', shade: '700' },
  { item: 'FIN', color: 'purple' },
]
const types: Item[] = [
  { item: 'feature', color: 'green' },
  { item: 'bug', color: 'red' },
  { item: 'task', color: 'blue' },
  { item: 'hotfix', color: 'yellow' },
]

export default defineComponent({
  name: 'App',
  data() {
    return {
      type: types[0].item,
      prefix: prefixes[1].item,
      branchName: '',
      branch: '',
      status: '',
      generatedBranchName: '',
    }
  },
  computed: {
    prefixes(): Item[] {
      return prefixes
    },
    types(): Item[] {
      return types
    },
    typeClasses(): object {
      return this.generateTextColors(this.types, this.type)
    },
    prefixClasses(): object {
      return this.generateTextColors(this.prefixes, this.prefix)
    },
  },
  methods: {
    formatName(name: string): string {
      return name.trim().toLowerCase().split(' ').join('-')
    },
    generateTextColors(array: Item[], matches: string) {
      const colorClass = (color: string, shade: string = '500') => `text-${color}-${shade}`
      return array.map((x) => ({ [colorClass(x.color, x.shade)]: x.item === matches }))
    },
    async generateName() {
      if (!this.branchName.trim().length) return
      const formattedName = this.formatName(this.branchName)
      const branch = `${this.type}/${this.prefix}-${formattedName}`
      this.branch = formattedName
      await (this as any).$copyText(branch)
      this.generatedBranchName = branch
    },
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color:#2f2f2f;
}
</style>
