const UserProfilePage = (props) => {
  return <h1>{props.username}</h1>;
};
export default UserProfilePage;

export async function getServerSideProps(context) {
  const { params, req, res } = context; //Node.js와 동일

  return {
    props: {
      username: "Max",
    },
  };
}
