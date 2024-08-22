import { getDic } from '@/api/dictionary'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
export const useDictionaryStore = defineStore('dictionary', () => {
  const dictionary = reactive<Record<string, any>>({})

  const getDictionary = async (dicType: string) => {
    const res = await getDic({ dicType }).catch((err) => {})
    dictionary[dicType] = res?.data || []
  }
  const getDictionaryTer = async (dicType: string) => {
    if (!dictionary[dicType]) {
      await getDictionary(dicType)
    }
    return dictionary[dicType]
  }
  const getDictionaryRefreshTer = async (dicType: string) => {
    await getDictionary(dicType)
    return dictionary[dicType]
  }

  return {
    getDictionaryTer,
    getDictionaryRefreshTer
  }
})
