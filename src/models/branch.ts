const shades = ['100', '200', '300', '400', '500', '600', '700', '800', '900'] as const
type Shades = typeof shades[number]

export interface Item {
  item: string
  color: string
  shade?: Shades
}
