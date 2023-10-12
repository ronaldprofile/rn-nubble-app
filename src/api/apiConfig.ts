import axios from 'axios'

export const api = axios.create({
  baseURL: ' http://127.0.0.1:3333',
  headers: {
    Authorization:
      'Bearer NA.wPtFkV4Jr3E3sFTus4Hr8vs0ME8qMZRMCkyCIcMngbwk8IgsFRqzdpYTy6Ez'
  }
})
