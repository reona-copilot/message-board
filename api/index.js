import { sql } from "@vercel/postgres";
require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());

// 从vercel数据库获取所有数据
async function getAllComments() {
  // todo 从vercel数据库获取所有数据
  console.log('从vercel数据库获取所有数据');
  // 查询数据
  const { comments } = await sql`SELECT * FROM comments`;
  return comments;
}

// 向vercel数据库写入数据
async function addComment({ nickname, content }) {
  console.log('向vercel数据库写入数据', nickname, content);
  // comments表, 包含: id, nickname, content, time
  // 插入数据
  time = new Date().toISOString();
  sql`INSERT INTO comments (nickname, content, time) VALUES (${nickname}, ${content}, ${time})`;
  // 返回数据
  return { nickname, content, time };
}

// 暴露接口: 获取留言列表
app.get("/api/comments", async (res) => {
  console.log('暴露接口: 获取留言列表');
  try {
    const comments = await getAllComments();
    res.json(comments);
  } catch (error) {
    console.log('暴露接口: 获取留言列表', error);
    res.sendStatus(500);
  }
});

// 暴露接口: 发表留言
app.post("/api/comments", async (req, res) => {
  console.log('暴露接口: 发表留言', req.body);
  try {
    const newPage = await addComment(req.body);
    res.status(201).json(newPage);
  } catch (error) {
    console.log('暴露接口: 发表留言', error);
    res.sendStatus(500);
  }
});

// 获取时间函数
function getRelativeTimeDesc(time) {
  const currentInMs = new Date().getTime();
  const timeInMs = new Date(time).getTime();

  const minuteInMs = 60 * 1000;
  const hourInMs = 60 * minuteInMs;
  const dayInMs = 24 * hourInMs;
  const monthInMs = 30 * dayInMs;
  const yearInMs = 365 * monthInMs;
  // 时间戳差值
  const relativeTime = currentInMs - timeInMs;
  if (relativeTime < minuteInMs) {
    return `${Math.ceil(relativeTime / 1000)} 秒前`;
  } else if (relativeTime < hourInMs) {
    return `${Math.ceil(relativeTime / minuteInMs)} 分钟前`;
  } else if (relativeTime < dayInMs) {
    return `${Math.ceil(relativeTime / hourInMs)} 小时前`;
  } else if (relativeTime < monthInMs) {
    return `${Math.ceil(relativeTime / dayInMs)} 天前`;
  } else if (relativeTime < yearInMs) {
    return `${Math.ceil(relativeTime / monthInMs)} 月前`;
  } else {
    return `${Math.ceil(relativeTime / yearInMs)} 年前`;
  }
}

// 导出app
module.exports = app;
