const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  const favorite = blogs.reduce((favorite, blog) =>
  favorite.likes > blog.likes ? favorite : blog
  )

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const blogCounts = blogs.reduce((counts, { author }) => {
    counts[author] = (counts[author] || 0) + 1;
    return counts;
  }, {});

  const authorWithMostBlogs = Object.keys(blogCounts).reduce((mostBlogs, author) =>
    blogCounts[author] > blogCounts[mostBlogs] ? author : mostBlogs
  );

  return {
    author: authorWithMostBlogs,
    blogs: blogCounts[authorWithMostBlogs]
  };

}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const likesByAuthor = blogs.reduce((acc, { author, likes }) => {
    acc[author] = (acc[author] || 0) + likes;
    return acc;
  }, {});

  const [author, likes] = Object.entries(likesByAuthor).reduce(
    (max, current) => (current[1] > max[1] ? current : max)
  );

  return { author, likes };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
