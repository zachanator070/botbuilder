import React from 'react';
import {Link} from "react-router";
import RunMap from "./RunMap";

export default function MainMenu() {
    return <div>
        <ul>
            <li><Link to={{pathname: '/run'}}>Start Run</Link></li>
            <li><Link to={{pathname: '/battle'}}>Start Battle</Link></li>
        </ul>
    </div>;
}