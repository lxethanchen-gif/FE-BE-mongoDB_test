<template>
  <div class="home">
    <div class="header">
      <h1>用戶管理</h1>
      <button class="add-btn" @click="showForm = !showForm">
        {{ showForm ? '取消' : '+ 新增用戶' }}
      </button>
    </div>

    <div v-if="showForm" class="form-card">
      <h2>新增用戶</h2>
      <input v-model="newUser.name" placeholder="姓名" />
      <input v-model="newUser.email" placeholder="Email" type="email" />
      <button @click="handleCreate" :disabled="loading">
        {{ loading ? '新增中...' : '確認新增' }}
      </button>
      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
    </div>

    <div v-if="loading && !showForm" class="status">載入中...</div>
    <div v-if="errorMsg && !showForm" class="error">{{ errorMsg }}</div>

    <div v-if="users.length > 0" class="user-list">
      <UserCard
        v-for="user in users"
        :key="user.id"
        :user="user"
        @delete="handleDelete"
        @update="handleUpdate"
      />
    </div>

    <div v-else-if="!loading" class="status">目前沒有用戶資料</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import UserCard from '../components/UserCard.vue'
import { userApi } from '../api/users.js'

const users = ref([])
const loading = ref(false)
const errorMsg = ref('')
const showForm = ref(false)
const newUser = ref({ name: '', email: '' })

const fetchUsers = async () => {
  loading.value = true
  errorMsg.value = '' // ← 每次重新 fetch 都先清除錯誤
  try {
    users.value = await userApi.getAll()
    errorMsg.value = '' // ← 成功後也清除
  } catch (err) {
    errorMsg.value = err.message
  } finally {
    loading.value = false
  }
}

const handleCreate = async () => {
  if (!newUser.value.name || !newUser.value.email) {
    errorMsg.value = '姓名和 Email 都必填'
    return
  }
  loading.value = true
  errorMsg.value = ''
  try {
    await userApi.create(newUser.value)
    newUser.value = { name: '', email: '' }
    showForm.value = false
    await fetchUsers()
  } catch (err) {
    errorMsg.value = err.message
  } finally {
    loading.value = false
  }
}

const handleUpdate = async (id, data) => {
  try {
    await userApi.update(id, data)
    await fetchUsers()
  } catch (err) {
    errorMsg.value = err.message
  }
}

const handleDelete = async (id) => {
  if (!confirm('確定要刪除這個用戶嗎？')) return
  try {
    await userApi.delete(id)
    await fetchUsers()
  } catch (err) {
    errorMsg.value = err.message
  }
}

onMounted(fetchUsers)
</script>

<style scoped>
.home {
  max-width: 640px;
  margin: 40px auto;
  padding: 0 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.header h1 {
  font-size: 24px;
  font-weight: 700;
  color: #111827;
}
.add-btn {
  padding: 8px 18px;
  background: #4f46e5;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}
.add-btn:hover {
  background: #4338ca;
}
.form-card {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.form-card h2 {
  margin: 0;
  font-size: 18px;
}
.form-card input {
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
}
.form-card input:focus {
  border-color: #4f46e5;
}
.form-card button {
  padding: 10px;
  background: #4f46e5;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}
.form-card button:disabled {
  background: #a5b4fc;
  cursor: not-allowed;
}
.user-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.status {
  text-align: center;
  color: #9ca3af;
  margin-top: 40px;
}
.error {
  color: #dc2626;
  font-size: 14px;
}
</style>
