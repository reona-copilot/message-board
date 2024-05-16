<template>
  <!-- 留言item -->
  <div
    class="bg-white p-4 rounded-lg shadow-md mb-4"
  >
    <!-- 用户信息 -->
    <div class="flex">
      <!-- 用户头像 -->
      <img
        :src="avatar"
        alt=""
        class="w-12 h-12 mr-4 rounded-full"
      >
      <!-- 用户名称和发表时间 -->
      <div>
        <p>{{ nickname }}</p>
        <p class="text-gray-600 text-sm">{{ time }}</p>
      </div>
    </div>
    <!-- 留言内容 -->
    <p class="text-gray-600 py-4">
      {{ content }}
    </p>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted } from 'vue'
// 导入图片
import avatar1 from '../assets/images/avatar1.jpeg'
import avatar2 from '../assets/images/avatar2.png'
import avatar3 from '../assets/images/avatar3.png'
import avatar4 from '../assets/images/avatar4.jpeg'
import avatar5 from '../assets/images/avatar5.jpeg'

const avatar = ref(avatar1)
// 随机头像
onMounted(() => {
  const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5]
  avatar.value = avatars[Math.floor(Math.random() * avatars.length)]
})

defineProps({
  nickname: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  }
})
</script>
