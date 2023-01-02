import { useRouter } from 'next/router';

export const ClientProjectDetailPage = () => {
  const router = useRouter();
  console.log(router.query);
  return (
    <div>
      <h1>클라이언트 프로젝트 디테일 페이지</h1>
    </div>
  );
};
export default ClientProjectDetailPage;
