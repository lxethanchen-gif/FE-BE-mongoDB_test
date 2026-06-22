<template>
  <div class="user-card">
    <template v-if="!editing">
      <div class="user-avatar">{{ initials }}</div>
      <div class="user-info">
        <h3>{{ user.name }}</h3>
        <p>{{ user.email }}</p>
        <span class="user-date">加入時間：{{ formattedDate }}</span>
      </div>
      <div class="actions">
        <button class="edit-btn" @click="startEdit">編輯</button>
        <button class="delete-btn" @click="$emit('delete', user.id)">刪除</button>
      </div>
    </template>

    <template v-else>
      <div class="edit-form">
        <input v-model="editData.name" placeholder="姓名" />
        <input v-model="editData.email" placeholder="Email" type="email" />
        <div class="edit-actions">
          <button class="save-btn" @click="confirmEdit">儲存</button>
          <button class="cancel-btn" @click="editing = false">取消</button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  user: { type: Object, required: true },
})

const emit = defineEmits(['delete', 'update'])

const editing = ref(false)
const editData = ref({ name: '', email: '' })

const initials = computed(() => props.user.name?.charAt(0).toUpperCase() ?? '?')

const formattedDate = computed(() => {
  if (!props.user.createdAt) return '—'
  return new Date(props.user.createdAt).toLocaleDateString('zh-TW')
})

const startEdit = () => {
  editData.value = { name: props.user.name, email: props.user.email }
  editing.value = true
}

const confirmEdit = () => {
  emit('update', props.user.id, editData.value)
  editing.value = false
}
</script>

<style scoped>
.user-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.2s;
}
.user-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #4f46e5;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.user-info {
  flex: 1;
  min-width: 0;
}
.user-info h3 {
  margin: 0 0 4px;
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.user-info p {
  margin: 0 0 4px;
  font-size: 14px;
  color: #6b7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.user-date {
  font-size: 12px;
  color: #9ca3af;
}
.actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}
.edit-btn {
  padding: 6px 14px;
  background: #e0e7ff;
  color: #4f46e5;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
}
.edit-btn:hover {
  background: #c7d2fe;
}
.delete-btn {
  padding: 6px 14px;
  background: #fee2e2;
  color: #dc2626;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
}
.delete-btn:hover {
  background: #fca5a5;
}
.edit-form {
  display: flex;
  flex: 1;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}
.edit-form input {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  flex: 1;
  min-width: 120px;
}
.edit-form input:focus {
  outline: none;
  border-color: #4f46e5;
}
.edit-actions {
  display: flex;
  gap: 8px;
}
.save-btn {
  padding: 6px 14px;
  background: #4f46e5;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
}
.save-btn:hover {
  background: #4338ca;
}
.cancel-btn {
  padding: 6px 14px;
  background: #f3f4f6;
  color: #374151;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
}
.cancel-btn:hover {
  background: #e5e7eb;
}

@media (max-width: 480px) {
  .user-card {
    flex-direction: column;
    align-items: flex-start;
    padding: 16px;
  }
  .actions {
    width: 100%;
    justify-content: flex-end;
  }
  .edit-form {
    flex-direction: column;
    width: 100%;
  }
  .edit-form input {
    width: 100%;
    box-sizing: border-box;
  }
  .edit-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
