import Link from 'next/link';
import { useRouter } from 'next/router';

export const ClientsPage = () => {
  const router = useRouter();
  const clients = [
    { id: 'max', name: 'Maximum' },
    { id: 'manu', name: 'Manuel' },
  ];
  const handleClick = () => {
    router.push({
      pathname: '/clients/[id]/[clientprojectid]',
      query: { id: 'max', clientprojectid: 'procjeta' },
    });
  };
  return (
    <div>
      <h1>Clients Page</h1>
      <button onClick={handleClick}>Load Project</button>
    </div>
  );
};

export default ClientsPage;
