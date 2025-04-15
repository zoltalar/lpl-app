// Interfaces
export interface IApiResource {
  data: IAttachment[] | IAttribute[] | ICategory[] | IList[] | IUser[],
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
export interface IAttachment extends IBaseModel, ITimestamps, IUserstamps {
  name: string,
  description: string | null,
  file: string,
  mime: string | null,
  size: number | null
}
export interface IAttribute extends IBaseModel, ITimestamps, IUserstamps {
  slug: string,
  input_type: number | null,
  labels: IAttributeLabel[] | null,
  default_values: IAttributeDefaultValue[] | null,
  maxlength: number,
  placeholders: IAttributePlaceholder[] | null,
  options: IAttributeOption[] | null,
  input_texts: IAttributeInputText[] | null,
  required: number | null,
  active: number | null
}
export interface IAttributeJson {
  code: string
}
export interface IAttributeDefaultValue extends IAttributeJson {
  value: string
}
export interface IAttributeInputText extends IAttributeJson {
  text: string
}
export interface IAttributeLabel extends IAttributeJson {
  label: string
}
export interface IAttributeOption extends IAttributeJson {
  option: string
}
export interface IAttributePlaceholder extends IAttributeJson {
  placeholder: string
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
export interface ISubscribePage extends IBaseModel, ITimestamps, IUserstamps {
  name: string,
  language_id: number | null,
  intro: string | null,
  thank_you: string | null,
  button: string | null,
  email_format: string | null,
  confirm_email: number | null,
  active: number | null
}
export interface IUser extends IBaseModel, INamable, ITimestamps {
  email: string,
  phone: string,
  password: string,
  active: number | null,
  language_id: number | null,
  date_format: string | null,
  time_format: string | null,
  language?: ILanguage | null,
  roles?: IRole[] | null,
  permissions?: IPermission[] | null
}
export interface INamable {
  first_name: string,
  last_name: string
}
export interface ITimestamps {
  created_at: string | null,
  updated_at: string | null
}
export interface IUserstamps {
  creator_id: number | null,
  updater_id: number | null,
  creator?: IUser | null,
  updater?: IUser | null,
}
// Types
export type TToastMessage = {
  header: string,
  body: string,
  type?: 'default' | 'danger'
}
export type TAttributeMeta = {
  input_types: Record<number, string>
}
export type TSubscribePageMeta = {
  email_formats: Record<string, string>
}
export type TUserMeta = {
  time_formats: string[],
  date_formats: string[]
}