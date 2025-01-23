import { Outlet, useLocation } from "react-router-dom";
import BottomNavBar from "./BottomNavBar";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useRef } from "react";

const navBarExcludesRoutes = ["/getting-started", "/layout/login", "/404"];

export default function Layout() {
  const location = useLocation();
  const nodeRef = useRef(null); // Ref for the CSSTransition

  return (
    <>
      <TransitionGroup component={null}>
        <CSSTransition
          key={location.key}
          classNames="page"
          timeout={300}
          nodeRef={nodeRef} // Pass the ref to the CSSTransition
        >
          <div ref={nodeRef} className="container prose prose-invert max-w-full">
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
