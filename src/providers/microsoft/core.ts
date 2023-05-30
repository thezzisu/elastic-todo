import router from '@/router'
import * as msal from '@azure/msal-browser'

const redirectUri = router.resolve('/callback').href

const msalInstance = new msal.PublicClientApplication({
  auth: {
    clientId: import.meta.env.VITE_MSFT_CLIENT_ID,
    redirectUri
  },
  cache: {
    cacheLocation: 'localStorage'
  }
})

export interface IMicrosoftToDoSourceData {
  account: msal.AccountInfo
}

export const getToken = async (account: msal.AccountInfo) => {
  const req = {
    account,
    scopes: ['user.read', 'Tasks.ReadWrite']
  }
  const token = await msalInstance.acquireTokenSilent(req).catch(async (err) => {
    if (err instanceof msal.InteractionRequiredAuthError) {
      return msalInstance.acquireTokenPopup(req)
    }
    throw err
  })
  return token.accessToken
}

export const fetchMsft = async <R = any>(
  account: msal.AccountInfo,
  path: string,
  init?: RequestInit
) => {
  const token = await getToken(account)
  init ??= {}
  init.headers = {
    ...init.headers,
    Authorization: `Bearer ${token}`
  }
  const response = await fetch(`https://graph.microsoft.com/v1.0/${path}`, init)
  const data = await response.json()
  return data as R
}

export const loginMsft = async () => {
  const loginRequest = {
    scopes: ['user.read', 'Tasks.ReadWrite']
  }
  const resp = await msalInstance.loginPopup(loginRequest)
  return resp.account
}
