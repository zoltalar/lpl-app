// Interfaces
export interface IApiResource {
  data: ICategory[] | IList[] | IUser[],
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
export interface ICategory extends IBaseModel {
  name: string,
  lists_count?: number
}
export interface ILanguage extends IBaseModel {
  name: string,
  code: string
}
export interface IList extends IBaseModel, ITimestamps {
  name: string,
  description: string | null,
  list_order: number | null,
  active: number | null,
  category_id: number | null,
  category?: ICategory | null,
  users_confirmed_unblacklisted_count?: number,
  users_unconfirmed_unblacklisted_count?: number,
  users_blacklisted_count?: number
}
export interface IPermission extends IBaseModel, ITimestamps {
  name: string,
  guard_name: string
}
export interface IRole extends IBaseModel, ITimestamps {
  name: string,
  guard_name: string
}
export interface IUser extends IBaseModel, ITimestamps {
  first_name: string,
  last_name: string,
  email: string,
  phone: string,
  password: string,
  active: number | null,
  language_id: number | null,
  date_format: string | null,
  time_format: string | null,
  roles?: IRole[] | null,
  permissions?: IPermission[] | null
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
export type TUserMeta = {
  time_formats: string[],
  date_formats: string[]
}