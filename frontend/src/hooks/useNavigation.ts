import { ISubMenu } from '@/constants/menuNavigation'
import { useRouter, usePathname } from 'next/navigation'

export function useNavigation() {
  const { push } = useRouter()
  const pathname = usePathname()

  const handleSubMenuClick = (subItem: ISubMenu, labelItem: string) => {
    if (labelItem === 'Institucional') {
      if (subItem.scrollView) {
        return push(`/institucional/?scrollView=${subItem.scrollView}`);
      } else {
        return push(`/${subItem.link}`);
      }
    }
    if (labelItem === "Programas") {
      push(`${subItem.link}`);
    }
    if (labelItem === "Informe-se") {
      push(`/${subItem.link}`);
    }
  }

  return { pathname, handleSubMenuClick }
}
