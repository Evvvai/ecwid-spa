import { Categories, Category } from '@/types'
import { AxiosInstance } from 'axios'

export const CategoryApi = (instance: AxiosInstance) => ({
  async getOne(id: number): Promise<Category> {
    const { data } = await instance.get<Category>('/categories/' + id)
    return data
  },

  async getAll(): Promise<Categories> {
    const { data } = await instance.get<Categories>('/categories')
    return data
  },
})
