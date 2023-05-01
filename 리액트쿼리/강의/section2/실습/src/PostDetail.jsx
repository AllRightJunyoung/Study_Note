import { useQuery, useMutation } from "react-query";
async function fetchComments(postId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/postId/${postId}`, { method: "DELETE" });
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/postId/${postId}`, {
    method: "PATCH",
    data: { title: "REACT QUERY FOREVER!!!!" },
  });
  return response.json();
}

export function PostDetail({ post }) {
  // replace with useQuery

  const { data, isLoading, isError, error } = useQuery("comment", () => fetchComments(post.id));

  const deleteMutation = useMutation((postId) => deletePost(postId));
  // mutate function 반환
  if (isLoading) return <h3>Loading...</h3>;
  if (isError) {
    // 에러 메시지 표시
    return (
      <>
        <h3>Oops, something wnet wrong</h3>
        <p>{error.toString()}</p>
      </>
    );
  }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button> <button>Update title</button>
      {deleteMutation.isError && <p style={{ color: "red" }}>Error deleting the post </p>}
      {deleteMutation.isLoading && <p style={{ color: "purple" }}>Deleting the post </p>}
      {deleteMutation.isSuccess && <p style={{ color: "green" }}>Post has (not) been deleted </p>}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
