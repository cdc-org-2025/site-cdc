import { storageUrl } from "@/constants/storageDomain"

export const isStorage = (url: string) => {
  if (storageUrl?.includes(url)) {
    return url
  } else {
    return `${storageUrl}/${url}`
  }
}
