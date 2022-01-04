export * from './store'

// =======================================================================================
// Different types
// =======================================================================================

export enum Locales {
  enUs = 'en_us',
  ru = 'ru',
}

export enum Theme {
  default = 'default',
  light = 'light',
  dark = 'dark',
  blue = 'blue',
}

export type ViewportCategory = 'small' | 'medium' | 'large'

export enum ViewportCategorySize {
  small = 768,
  medium = 1024,
  large = 1440,
}

export interface Products {
  count: number
  items: Product[]
  limit: number
  offset: number
  total: number
}

export interface Product {
  id: number
  sku: string
  thumbnailUrl: string
  unlimited: true
  inStock: true
  name: string
  price: number
  priceInProductList: number
  defaultDisplayedPrice: number
  defaultDisplayedPriceFormatted: string
  tax: {
    taxable: boolean
    defaultLocationIncludedTaxRate: number
    enabledManualTaxes: []
    taxClassCode: string
  }
  isShippingRequired: false
  url: string
  created: Date
  updated: Date
  createTimestamp: number
  updateTimestamp: number
  productClassId: number
  enabled: boolean
  options: [ProductOptions]
  fixedShippingRateOnly: boolean
  fixedShippingRate: number
  shipping: {
    type: string
    flatRate: number
    disabledMethods: []
    enabledMethods: []
  }
  defaultCombinationId: number
  imageUrl: string
  smallThumbnailUrl: string
  hdThumbnailUrl: string
  originalImageUrl: string
  originalImage: {
    url: string
    width: number
    height: number
  }
  borderInfo: {
    dominatingColor: {
      red: number
      green: number
      blue: number
      alpha: number
    }
    homogeneity: boolean
  }
  description: string
  galleryImages: [
    {
      id: number
      url: string
      thumbnail: string
      originalImageUrl: string
      imageUrl: string
      hdThumbnailUrl: string
      thumbnailUrl: string
      smallThumbnailUrl: string
      width: number
      height: number
      orderBy: number
      borderInfo: {
        dominatingColor: {
          red: number
          green: number
          blue: number
          alpha: number
        }
        homogeneity: boolean
      }
    }
  ]
  media: {
    images: [
      {
        id: string
        isMain: boolean
        orderBy: number
        image160pxUrl: string
        image400pxUrl: string
        image800pxUrl: string
        image1500pxUrl: string
        imageOriginalUrl: string
      }
    ]
  }
  categoryIds: [number]
  categories: [
    {
      id: number
      enabled: boolean
    }
  ]
  defaultCategoryId: number
  seoTitle: string
  seoDescription: string
  attributes: []
  relatedProducts: {
    productIds: []
    relatedCategory: {
      enabled: boolean
      categoryId: number
      productCount: number
    }
  }
  combinations: []
  showOnFrontpage: number
  isSampleProduct: boolean
  googleItemCondition: string
  isGiftCard: boolean
  discountsAllowed: boolean
  nameYourPriceEnabled: boolean
}

interface ProductOptions {
  type: 'SELECT' | 'RADIO' | 'CHECKBOX' | 'TEXTFIELD' | 'TEXTAREA' | 'DATE' | 'FILES' | 'SIZE'
  name: string
  nameTranslated: {
    ru: string
  }
  choices: [
    {
      text: string
      textTranslated: {
        ru: string
      }
      priceModifier: number
      priceModifierType: 'ABSOLUTE' | 'PERCENT'
    }
  ]
}

export interface Categories {
  total: number
  count: number
  offset: number
  limit: number
  items: Category[]
}

export interface Category {
  id: number
  orderBy: number
  hdThumbnailUrl: string
  thumbnailUrl: string
  originalImageUrl: string
  imageUrl: string
  originalImage: {
    url: string
    width: number
    height: number
  }
  thumbnail: {
    url: string
    width: number
    height: number
  }
  borderInfo: {
    dominatingColor: {
      red: number
      green: number
      blue: number
      alpha: number
    }
    homogeneity: boolean
  }
  name: string
  nameTranslated: {
    ru: string
  }
  url: string
  productCount: number
  enabledProductCount: number
  description: string
  descriptionTranslated: {
    ru: string
  }
  enabled: boolean
  productIds: [number]
  isSampleCategory: boolean
}

export const sortingOptions = ['price', 'name'] as const
export type SortingOptions = typeof sortingOptions[number]

export const sortingDirections = ['asc', 'desc'] as const
export type SortingDirections = typeof sortingDirections[number]

export interface SortSetting {
  sort: SortingOptions
  dir: SortingDirections
}
