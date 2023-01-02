import { useRouter } from 'next/router';

export const ClientProjectsPage = () => {
  const router = useRouter();
  console.log(router.query);
  return (
    <div>
      <h1>클라언트 프로젝트 메인 페이지 </h1>
    </div>
  );
};
export default ClientProjectsPage;
