'use client'
import { useProgramasListQuery } from '@/clients/api/programas'
import { MenuOptions, IMenu, ISubMenu } from '@/constants/menuNavigation'

export const useMenuOptions = (): IMenu[] => {
  const { data } = useProgramasListQuery()

  const subMenusFromAPI: ISubMenu[] =
    data?.data.map((programa) => ({
      id: programa.id,
      label: `${programa.titulo} (${programa.subtitulo})`,
      link: `/programas/${programa.id}`,
    })) || []

  const updatedMenu = MenuOptions.map((menu) => {
    if (menu.label === 'Programas') {
      return {
        ...menu,
        subMenus: subMenusFromAPI,
      }
    }
    return menu
  })

  return updatedMenu
}
