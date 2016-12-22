db.websites.insert([
  { url:"http://prismic.io", title: 'Prismic.io', votes: 2 },
  { url:"http://google.fr", title: 'Google', votes: 3 },
  { url:"http://graphql.org", title: 'GraphQL', votes: 1 },
]);
db.comments.insert([
  { comment:"first comment", websiteId: "585c50af4de755342e253c6e" }
]);
