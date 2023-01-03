import { MainHeader } from './main-header';
export const Layout = (props) => {
  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
    </>
  );
};
export default Layout;
