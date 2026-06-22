const BASE_URL = 'https://be-test-0utx.onrender.com'

export const userApi = {
  getAll: async () => {
    const res = await fetch(`${BASE_URL}/users/`)
    if (!res.ok) throw new Error('取得用戶失敗')
    return res.json()
  },

  getById: async (id) => {
    const res = await fetch(`${BASE_URL}/users/${id}`)
    if (!res.ok) throw new Error('找不到該用戶')
    return res.json()
  },

  create: async (data) => {
    const res = await fetch(`${BASE_URL}/users/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('新增用戶失敗')
    return res.json()
  },

  update: async (id, data) => {
    const res = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('更新用戶失敗')
    return res.json()
  },

  delete: async (id) => {
    const res = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'DELETE',
    })
    if (!res.ok) throw new Error('刪除用戶失敗')
    return res.json()
  },
}
