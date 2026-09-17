import {
    BellElectric,
    LogOut
} from "lucide-react";

import { Link, NavLink } from "react-router-dom";
import "./SideNav.css";

export default function SideNav({ title, items }) {
    return (
        <nav className="Side-Nav">

            <div className="Side-Nav_Logo">
                <BellElectric />
                <h1>GradeUp</h1>
            </div>

            <div className="Side-Nav_Menu">

                <span className="Side-Nav_Title">
                    {title}
                </span>

                {items.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.label}
                            className={({ isActive }) =>
                                `Side-Nav_Item ${isActive ? "active" : ""}`
                            }
                            to={item.to}
                            end={item.end}
                        >
                            <Icon />
                            <span>{item.label}</span>
                        </NavLink>
                    );
                })}

            </div>

            <div className="Side-Nav_Bottom">
                <Link to="/">
                    <LogOut />
                    <span>Sair</span>
                </Link>
            </div>

        </nav>
    );
}