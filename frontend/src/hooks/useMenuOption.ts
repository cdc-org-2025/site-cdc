'use client'
import { useProgramasListAtivoQuery } from '@/clients/api/programas'
import { MenuOptions, IMenu, ISubMenu } from '@/constants/menuNavigation'

export const useMenuOptions = (): IMenu[] => {
  const { data } = useProgramasListAtivoQuery()
  const programsListActive = data?.data.filter(item => item.is_ativo === true)

  const subMenusFromAPI: ISubMenu[] =
    programsListActive?.map((programa) => ({
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
