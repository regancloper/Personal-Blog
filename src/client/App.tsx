import * as React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import './scss/app';
import Blogs from './Blogs';
import Details from './Details';
import NewPost from './NewPost';
import EditPost from './EditPost';


const App: React.FC<IAppProps> = props => {

	return (


		<BrowserRouter>

			<nav className="navbar navbar-dark bg-dark">
				<span className="navbar-brand mb-0 h1">Regan's Blog</span>
				<ul className="navbar-nav" id="nav-items-right">
					<li className="nav-item mx-2">
						<Link to='/' className="nav-link">All Blogs</Link>
					</li>
					<li className="nav-item">
						<Link to='/newpost' className="nav-link">Add Blog</Link>
					</li>
				</ul>
			</nav>

			<Switch>
				<Route exact path="/" component={Blogs}/>
				<Route exact path="/details/:id" component={Details} />
				<Route exact path="/newpost" component={NewPost} />
				<Route exact path="/edit/:id" component={EditPost} />
			</Switch>
		</BrowserRouter>

	);
}


export default App;

interface IAppProps { }
