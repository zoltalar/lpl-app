// Interfaces
export interface IApiResource {
  data?: IUser[],
  meta?: IApiResourceMeta
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
export interface IUser extends IBaseModel {
  uuid: string,
  email: string,
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
// Types
export type TToastMessage = {
  header: string,
  body: string
}