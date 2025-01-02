import { Outlet, useLocation } from "react-router-dom";
import BottomNavBar from "./BottomNavBar";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const navBarExcludesRoutes = ["/getting-started", "/layout/login", "/404"];

export default function Layout() {
  const location = useLocation();

  return (
    <>
      <TransitionGroup component={null}>
        <CSSTransition key={location.key} classNames="page" timeout={300}>
          <div className="container prose prose-invert max-w-full">
            <Outlet />
            {!navBarExcludesRoutes.includes(location.pathname) && (
              <div className="block h-[100px]" />
            )}
          </div>
        </CSSTransition>
      </TransitionGroup>
      {!navBarExcludesRoutes.includes(location.pathname) && <BottomNavBar />}
    </>
  );
}
