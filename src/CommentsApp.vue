<template>
  <!-- 整体容器 -->
  <main class="p-4 bg-gray-50 min-h-screen">
    <!-- 留言板容器 -->
    <div class="max-w-screen-xl mx-auto bg-white p-8 rounded-lg shadow-2xl">
      <!-- 标题 -->
      <h2 class="text-3xl my-6">留言板</h2>
      <CommentBox @submit="addNewComment" />
      <!-- 分割线 -->
      <DividerHorizontal />
      <!-- 评论 -->
      <div
        v-for="comment in comments"
        :key="comment.id"
      >
        <CommentItem
          :nickname="comment.nickname"
          :content="comment.content"
          :time="comment.time"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
// 导入子组件
import CommentBox from './components/CommentBox.vue'
import CommentItem from './components/CommentItem.vue'
import DividerHorizontal from './components/DividerHorizontal.vue'

// 导入 ref 与 onMounted 函数
import { ref, onMounted } from 'vue'

// 数组数据：留言列表
const comments = ref([])

// 定义获取留言列表函数
async function getAllComments() {
  const res = await fetch('/api/comments')
  comments.value = await res.json()
}

// 使用生命周期方法
onMounted(() => {
  getAllComments()
  // // 模拟数据
  // comments.value.push({
  //   id: 1,
  //   nickname: '张三',
  //   content: '这是一条留言',
  //   time: '2021-10-01 12:00:00',
  // })
  // comments.value.push({
  //   id: 1,
  //   nickname: '张三',
  //   content: '这是一条留言',
  //   time: '2021-10-01 12:00:00',
  // })
  // comments.value.push({
  //   id: 1,
  //   nickname: '张三',
  //   content: '这是一条留言',
  //   time: '2021-10-01 12:00:00',
  // })
  // comments.value.push({
  //   id: 1,
  //   nickname: '张三',
  //   content: '这是一条留言',
  //   time: '2021-10-01 12:00:00',
  // })
})

// 定义发表留言和回复函数
const addNewComment = async (content, replyTo) => {
  const res = await fetch(`/api/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content,
      ...(replyTo && { replyTo }),
    }),
  })
  const newComment = await res.json()
  comments.value.unshift(newComment)
}
</script>

<style></style>
