const URL = "https://jsonplaceholder.typicode.com";

async function fetchURL(url) {
  const data = await fetch(`${URL}/${url}`);
  return await data.json();
}
function findMaxByField(arr, field) {
  return arr.reduce((maxElement, currentElement) => {
    if (!maxElement || currentElement[field] > maxElement[field]) {
      return currentElement;
    }
    return maxElement;
  });
}

async function getPostWithComments(id) {
  const [postWithID, commentsForPostID] = await Promise.all([
    fetchURL(`/posts/${id}`),
    fetchURL(`/comments?postId=${id}`),
  ]);
  return {
    userId: postWithID.userId,
    id: postWithID.id,
    title: postWithID.title,
    body: postWithID.body,
    comments: commentsForPostID,
  };
}

async function main() {
  try {
    // Fetch data
    const [usersData, postsData, commentsData] = await Promise.all([
      fetchURL("users"),
      fetchURL("posts"),
      fetchURL("comments"),
    ]);

    // 3. Get all the posts and comments from the API. Map the data with the users array.
    const usersMap = usersData.map((user) => ({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      comments: commentsData.filter((comment) => comment.email === user.email),
      posts: postsData.filter((post) => post.userId === user.id),
    }));

    // 4. Filter only users with more than 3 comments.
    const usersWithMoreThan3Comments = usersMap.filter(
      (user) => user?.comments.length > 3
    );

    // 5. Reformat the data with the count of comments and posts
    const usersReformat = usersMap.map((item) => ({
      id: item.id,
      name: item.name,
      username: item.username,
      email: item.email,
      commentsCount: item?.comments?.length,
      postsCount: item?.posts?.length,
    }));

    // 6. Who is the user with the most comments/posts?
    const userWithMostComment = findMaxByField(usersReformat, "commentsCount");
    const userWithMostPost = findMaxByField(usersReformat, "postsCount");

    // 7. Sort the list of users by the postsCount value descending?
    const usersSort = usersReformat;
    usersSort.sort((a, b) => b.postsCount - a.postsCount);

    // 8. Get the post with ID of 1 via API request, at the same time get comments for post ID of 1 via another API request
    const post = await getPostWithComments(1);
  } catch (err) {
    console.log(err);
  }
}
main();
