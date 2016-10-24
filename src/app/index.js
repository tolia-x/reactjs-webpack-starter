import React from "react";
import { render } from "react-dom";

import { Header } from './Components/Header';
import { Home } from './Components/Home';

class App extends React.Component {
    render() {
        return (
            <div className="wrapper">
                <Header/>

                <div className="container">
                    <Home/>
                </div>
            </div>
        );
    }
}

render(<App/>, window.document.getElementById('app'));