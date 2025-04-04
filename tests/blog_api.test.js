const { test, before, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: "Bailão Malandro",
    author: "Malu de Castro",
    url: "https://minhaamigamalu.com/",
    likes: 7
  },
  {
    title: "Ai que Calor",
    author: "Pabllo Vittar",
    url: "yoke.com",
    likes: 5
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('blogs are returned as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('returns correct number of blogs', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('blog posts have id instead of _id', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body
    blogs.forEach(blog => {
    assert.ok(blog.id, 'Blog should have id property')
    assert.strictEqual(blog._id, undefined, 'Blog should not have _id property')
  })
})

after(async () => {
  await mongoose.connection.close()
})
