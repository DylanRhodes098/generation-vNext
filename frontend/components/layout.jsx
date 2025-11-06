import React from "react";
import {Outlet} from "react-router-dom";
import {SideNav} from "./sideNav";
import TopNav from "./topNav";

export default function Layout () {
    
    return (
        <>
        <div>
    <TopNav/>
     <main className="flex flex-row p-4">
            <div className="pr-[4%]">
            <SideNav />
      </div>
      <Outlet />
      </main>
    </div>

        </>
    )
}