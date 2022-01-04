import { Product, Products, SortSetting } from '@/types'
import { AxiosInstance } from 'axios'

export const ProductApi = (instance: AxiosInstance) => ({
  async getOne(id: number) {
    const { data } = await instance.get<Product>('/products/' + id)
    return data
  },
  async getAll(categoryId: number, sortBy: SortSetting) {
    const { data } = await instance.get<Products>('/products', {
      params: { category: categoryId, sortBy: sortBy.sort.toUpperCase() + '_' + sortBy.dir.toUpperCase() },
    })
    return data
  },
})
