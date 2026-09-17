import {
    BellElectric,
    MoveRight
} from "lucide-react";

import { Link } from "react-router-dom";
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
                        <Link
                            key={item.label}
                            className="Side-Nav_Item"
                            to={item.to}
                        >
                            <Icon />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}

            </div>

            <div className="Side-Nav_Bottom">
                <Link to="/">
                    <MoveRight />
                    <span>Sair</span>
                </Link>
            </div>

        </nav>
    );
}