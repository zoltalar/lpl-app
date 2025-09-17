// Interfaces
export interface IApiResource {
  data: 
    IAttachment[] | 
    IAttribute[] | 
    ICategory[] |
    ICountry[] |
    IMailingList[] | 
    ISubscribePage[] |
    ISubscriber[] | 
    IUser[],
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
  list_order: number | null,
  required: number | null,
  active: number | null,
  pivot?: IAttributePivot | null
}
export interface IAttributePivot {
  value: string
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
export interface IConfiguration extends IBaseModel {
  slug: string,
  value: string | number | null,
  updatable: number | null,
  type: string,
  active: number | null
}
export interface ICountry extends IBaseModel {
  name: string,
  list_order?: number | null,
  states?: IState[] | null
}
export interface ICriterion extends IBaseModel, ITimestamps, IUserstamps {
  message_id: number,
  attribute_id: number,
  operator: string,
  value: string,
  attribute?: IAttribute[] | null
}
export interface ILanguage extends IBaseModel {
  name: string,
  code: string
}
export interface IMailingList extends IBaseModel, ITimestamps, IUserstamps {
  name: string,
  description: string | null,
  list_order: number | null,
  type: string | null,
  active: number | null,
  subscribers_count?: number,
  subscribers_confirmed_unblacklisted_count?: number,
  subscribers_unconfirmed_unblacklisted_count?: number,
  subscribers_blacklisted_count?: number  
}
export interface IMessage extends IBaseModel, ITimestamps, IUserstamps {
  name: string | null,
  subject: string | null,
  from_field: string | null,
  to_field: string | null,
  reply_to: string | null,
  message_html: string,
  message_text: string,
  footer: string,
  template_id: number | null,
  criteria: number | null,
  conditions: Array<Array<TMessageCondition>> | null,
  analytics: number | null,
  utm: TUtmItems | null,
  status: number | null,
  send_format: string,
  deleted_at: string | null,
  sent_at: string | null,
  template?: ITemplate | null,
  attachments?: IAttachment[] | null,
  mailing_lists?: IMailingList[] | null,
  mailable?: number
}
export interface IPermission extends IBaseModel, ITimestamps {
  name: string,
  guard_name: string
}
export interface IRole extends IBaseModel, ITimestamps {
  name: string,
  guard_name: string
}
export interface IState extends IBaseModel {
  country_id: number | null,
  name: string,
  abbreviation: string | null
}
export interface ISubscribePage extends IBaseModel, ITimestamps, IUserstamps {
  name: string,
  language_id: number | null,
  intro: string | null,
  thank_you: string | null,
  button: string | null,
  email_format: string | null,
  confirm_email: number | null,
  active: number | null,
  language?: ILanguage | null,
  mailing_lists?: IMailingList[] | null,
  subscriber_attributes?: IAttribute[] | null,
}
export interface ISubscriber extends IBaseModel, ITimestamps, IUserstamps {
  email: string,
  domain?: string | null,
  password: string | null,
  password_set?: number,
  html_email: number | null,
  confirmed: number | null,
  blacklisted: number | null,
  bounce_count: number | null,
  active: number | null,
  unique_id: string | null,
  rss_frequency: string | null,
  mailing_lists?: IMailingList[] | null,
  subscriber_attributes?: IAttribute[] | null,
}
export interface ITemplate extends IBaseModel, ITimestamps, IUserstamps {
  name: string,
  content_html: string,
  content_text: string
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
export type TConfigurationMeta = {
  mailsender: Record<string, any>,
  types: Record<string, string>
}
export type TCriterionMeta = {
  operators: Record<string, string>
}
export type TMailingListMeta = {
  types: Record<string, string>
}
export type TMessageCondition = {
  slug: string | null,
  operator: string | null,
  value: string
}
export type TMessageMeta = {
  formats: Record<string, string>,
  operators: Record<string, string>,
  statuses: Record<number, string>
}
export type TSelectOption = {
  value: string | number | null,
  text: string
}
export type TSubscribePageMeta = {
  email_formats: Record<string, string>
}
export type TUserMeta = {
  time_formats: string[],
  date_formats: string[]
}
export type TUtmItems = {
  utm_id: string,
  utm_source: string,
  utm_medium: string,
  utm_campaign: string,
  utm_term: string,
  utm_content: string
}
export type TVSelectOption = {
  value: string | number | null,
  label: string
}