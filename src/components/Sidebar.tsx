/* eslint-disable jsx-a11y/anchor-is-valid */
interface SidebarProps {
    toggleSidebar: boolean;
    currentMenu: string;
    onSetMenu: Function
}

const Sidebar = ({ toggleSidebar, currentMenu, onSetMenu }: SidebarProps) => {
    return <>
        <div>
            <div className={"sidebar p-4 bg-danger " + (toggleSidebar ? 'active-sidebar' : '')} id="sidebar">
                <h4 className="mb-5 text-white">Company ABC</h4>
                <li>
                    <div className={currentMenu === "popular" ? "text-warning" : "text-white"} onClick={() => onSetMenu('popular')}>
                        <i className="bi bi-newspaper mr-2" />
                        Most Popular Movie
                    </div>
                </li>
                <li>
                    <div className={currentMenu === "free" ? "text-warning" : "text-white"} onClick={() => onSetMenu('free')}>
                        <i className="bi bi-film mr-2" />
                        Free Movie
                    </div>
                </li>
                <li>
                    <div className={currentMenu === "trending" ? "text-warning" : "text-white"} onClick={() => onSetMenu('trending')}>
                        <i className="bi bi-fire mr-2" />
                        Trending Movie
                    </div>
                </li>
            </div>
        </div>
    </>
}

export default Sidebar;