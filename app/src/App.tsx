import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router";
import MainMenu from "./MainMenu";
import RunMap from "./RunMap";
import Battle from "./Battle";

export default function App(): React.ReactElement {
    return <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainMenu />} />
                <Route path="/run" element={<RunMap/>} />
                <Route path="/battle" element={<Battle/>} />
            </Routes>
        </BrowserRouter>
    </div>;
}