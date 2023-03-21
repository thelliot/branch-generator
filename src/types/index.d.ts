import VueClipboard from 'vue-clipboard2'

declare module 'vue/types/vue' {
  interface vue {
    $copyText(text: string, container?: object | HTMLElement): Promise<{
      action: string,
      text: string,
      trigger: String | HTMLElement | HTMLCollection | NodeList,
      clearSelection: () => void
    }>
  }
}