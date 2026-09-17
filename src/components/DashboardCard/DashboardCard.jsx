import React from "react";
import "./DashboardCard.css";

export default function DashboardCard ({
    title = Text,
    data = Text,
    description = Text
}){
    return(
        <>
            <div className="Dashboard_Card">
                <p>{title}</p>
                <h2>{data}</h2>
                <p>{description}</p>
            </div>
        </>
    )
}