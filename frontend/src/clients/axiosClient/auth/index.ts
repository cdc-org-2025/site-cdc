import Cookies from 'js-cookie'
import apiData from "../apiData";

const api = apiData()

export const authService = async (username: string, password: string) => {
  try {

    const { status, data } = await api.post(`/token/`, {
      username: username,
      password: password
    });

    if (status === 200 || status === 201) {
      const user = {
        token_refresh: data.refresh,
        token_access: data.access,
      }
      Cookies.set('user-info', JSON.stringify(user), {
        expires: 7
      })
      return data.access
    }
    return
  } catch (error) {
    Cookies.remove('user-info')
    return null;
  }
};

export const signOut = () => {
  Cookies.remove('user-info')
}

export const userInfo = (params: string) => {
  if (params) {
    return JSON.parse(params)
  } else {
    return 'null'
  }
}