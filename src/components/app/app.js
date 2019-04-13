import React from 'react';
import About from "../about";
import Converter from "../converter";
import './app.css';

const App = () => {
    return(
        <div className="grid">
            <About />
            <Converter/>
        </div>
    )
};

export default App;