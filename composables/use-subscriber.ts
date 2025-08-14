import type { ISubscriber, TVSelectOption } from '@/types'

export default function useSubscriber() {
  // Functions
  const toVSelect = (subscriber: ISubscriber): TVSelectOption => {
    return {
      value: subscriber.id,
      label: subscriber.email
    }
  }
  // Return
  return {
    toVSelect
  }
}