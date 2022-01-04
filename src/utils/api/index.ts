import axios from 'axios'

import { CategoryApi } from './category'
import { ProductApi } from './product'

export type ApiReturnType = {
  product: ReturnType<typeof ProductApi>
  category: ReturnType<typeof CategoryApi>
}

export const Api = (): ApiReturnType => {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    headers: {
      //   Authorization: 'Bearer ' + token,
    },
    params: {
      token: process.env.VUE_APP_TOKEN,
    },
  })

  const apis = {
    product: ProductApi,
    category: CategoryApi,
  }

  const result = Object.entries(apis).reduce((prev, [key, f]) => {
    return {
      ...prev,
      [key]: f(instance),
    }
  }, {} as ApiReturnType)

  return result
}
