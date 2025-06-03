import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { FaPodcast } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <aside className={`${isCollapsed ? "w-fit" : "w-[20%]"}  max-w-[250px]`}>
      <header className="mt-3 px-2 flex justify-evenly items-center">
        {!isCollapsed && (
          <>
            <FaPodcast className="icon-sm" />
            <span className="ml-1 mr-auto">GO POD</span>
          </>
        )}
        <Button onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? (
            <GoSidebarCollapse className="icon-sm" />
          ) : (
            <GoSidebarExpand className="icon-sm" />
          )}
        </Button>
      </header>
    </aside>
  );
};

export default SideBar;
