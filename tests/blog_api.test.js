const { test, after, beforeEach } = require('node:test')
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

test('a blog can be added', async () => {
  const newBlog = {
    title: "New Blog Post",
    author: "Test",
    url: "http://test.com",
    likes: 100
  }

  const initialBlog = (await api.get('/api/blogs')).body.length

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)
  const updatedBlogs = await api.get('/api/blogs')
  assert.strictEqual(updatedBlogs.body.length, initialBlog + 1)
})

test ('a blog can be deleted', async () => {
  const blogsAtStart = await api.get('/api/blogs')
  const blogToDelete = blogsAtStart.body[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await api.get('/api/blogs')
  assert.strictEqual(blogsAtEnd.body.length, blogsAtStart.body.length - 1)
}
)

test ('a blogs likes can be updated', async () => {
  const blogsAtStart = await api.get('/api/blogs')
  const blogToUpdate = blogsAtStart.body[0]

  const updatedLikes = {
    likes: 100
  }

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedLikes)
    .expect(200)

  assert.strictEqual(response.body.likes, updatedLikes.likes)
})

after(async () => {
  await mongoose.connection.close()
})
