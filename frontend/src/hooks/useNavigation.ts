import { ISubMenu } from '@/constants/menuNavigation'
import { useRouter, usePathname } from 'next/navigation'

export function useNavigation() {
  const router = useRouter()
  const pathname = usePathname()

  const handleNavigate = (link?: string) => {
    if (link) {
      const newRoute = `/${link}`
      if (pathname !== newRoute) {
        router.push(newRoute, { scroll: false })
      }
    }
  }

  const handleSubMenuClick = (subItem: ISubMenu, labelItem: string) => {
    if (labelItem === 'Institucional') {
      if (subItem.scrollView) {
        return handleNavigate(`institucional/?scrollView=${subItem.scrollView}`);
      } else {
        return handleNavigate(`${subItem.link}`);
      }
    }
    handleNavigate(`${subItem.link}`);
  }

  return { handleNavigate, pathname, handleSubMenuClick }
}
