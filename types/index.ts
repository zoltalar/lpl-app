// Interfaces
export interface IApiResource {
  data: ICategory[] | IList[] | IUser[],
  meta: IApiResourceMeta
}
export interface IApiResourceMeta {
  current_page: number,
  from: number,
  last_page: number,
  links: IApiResourceMetaLink[],
  path: string,
  per_page: number,
  to: number,
  total: number
}
export interface IApiResourceMetaLink {
  url: string | null,
  label: string,
  active: boolean
}
export interface IBaseModel {
  id: number
}
export interface ICategory extends IBaseModel {
  name: string
}
export interface IList extends IBaseModel, ITimestamps {
  name: string,
  description: string | null,
  list_order: number | null,
  active: number | null,
  category_id: number | null
}
export interface IUser extends IBaseModel, ITimestamps {
  uuid: string,
  email: string,
  password?: string | null,
  password_set: number,
  html_email: number,
  confirmed: number,
  disabled: number,
  blacklisted: number,
  opted_in: number,
  bounce_count: number,
  unique_id: string,
  subscribe_page: number | null,
  rss_frequency: string | null,
}
export interface ITimestamps {
  created_at: string | null,
  updated_at: string | null
}
// Types
export type TToastMessage = {
  header: string,
  body: string
}