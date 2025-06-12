import React from 'react';
import {Link} from "react-router";

export default function MainMenu() {
    return <div>
        <ul>
            <li><Link to={{pathname: '/ui/run'}}>Start Run</Link></li>
            <li><Link to={{pathname: '/ui/battle'}}>Start Battle</Link></li>
        </ul>
    </div>;
}