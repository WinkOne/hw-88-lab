import React, {Component, Fragment} from 'react';
import Toolbar from "./components/UI/Toolbar/Toolbar";
import {Container} from "reactstrap";
import {Route, Switch} from "react-router-dom";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import News from "./containers/News/News";
import AddNews from "./containers/AddNews/AddNews";
import OneNews from "./containers/News/OneNews";

class App extends Component {
    render() {
        return (
            <Fragment>
                <header>
                    <Toolbar/>
                </header>
                <Container style={{marginTop: '20px'}}>
                    <Switch>
                        <Route path="/register" exact component={Register}/>
                        <Route path="/login" exact component={Login}/>
                        <Route path="/" exact component={News}/>
                        <Route path="/new" exact component={AddNews}/>
                        <Route path="/:id" exact component={OneNews}/>
                    </Switch>
                </Container>
            </Fragment>
        );
    }
}

export default App;