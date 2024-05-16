<template>
  <form
    action=""
    class="grid"
    @submit="handleSubmit"
  >
    <input
      v-model="nickname"
      type="text"
      placeholder="请输入昵称"
      maxlength="20"
      class="bg-gray-50 p-2 rounded"
    >
    <textarea
      v-model="content"
      placeholder="请输入留言"
      maxlength="2000"
      rows="5"
      class="bg-gray-50 p-2 rounded mt-2"
    />
    <fieldset class="py-4">
      <input
        type="submit"
        value="评论"
        class="px-4 py-1 bg-blue-600 rounded text-white cursor-pointer"
      >
      <input
        type="reset"
        value="取消"
        class="px-4 py-1 bg-white rounded border ml-3 cursor-pointer"
      >
    </fieldset>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const nickname = ref('')
const content = ref('')

// 触发emit将表单数据提交submit给父组件
const emit = defineEmits(['submit'])

// 表单事件提交处理函数
const handleSubmit = (e) => {
  e.preventDefault()
  // 验证昵称和留言是否为空
  if (!nickname.value.trim() || !content.value.trim()) {
    alert('昵称和留言不能为空')
    return
  }
  emit('submit', nickname.value, content.value)
}
</script>

<style></style>
