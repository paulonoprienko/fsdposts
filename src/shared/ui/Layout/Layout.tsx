import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import css from "./Layout.module.css";

type Props = {
  headerSlot: ReactElement;
  footerSlot: ReactElement;
};

export const Layout = ({ headerSlot, footerSlot }: Props) => {
  return (
    <>
      {headerSlot}
      <div className={css.container}>
        <Outlet />
      </div>
      {footerSlot}
    </>
  );
};
