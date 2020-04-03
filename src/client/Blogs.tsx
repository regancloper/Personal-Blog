import * as React from 'react';
import moment from 'moment';
import './scss/app';
import { Link } from 'react-router-dom';


class Blogs extends React.Component<IAppProps, IAppState> {

    constructor(props: IAppProps) {
        super(props)
        this.state = {
            blogs: []
        };
    }




    async componentDidMount() {
        try {
            let r = await fetch('/api/blogs');
            let blogs = await r.json();
            this.setState({ blogs });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div className="container my-5">
                <div className="card-columns">
                    {this.state.blogs.map(blog => {
                        return (
                            <div key={blog.id} className="card">
                                <img className="card-img-top" src="https://i.ytimg.com/vi/Fxi__sNIE1Q/maxresdefault.jpg" alt="Card image cap" />
                                <div className="card-body">
                                    <h5>
                                        <Link to={`/details/${blog.id}`} className="card-title text-secondary">{blog.title}</Link>
                                    </h5>
                                    <p className="card-text line-clamp">{blog.content}</p>
                                    <small className="card-text"><i>Written by {blog.name}</i></small>
                                    <p className="card-text"><small className="text-muted">
                                        {moment(blog._created).utc().format("MMMM Do, YYYY")}
                                    </small></p>
                                </div>

                            </div>
                        );


                    })}
                </div>
            </div>



        );
    }
}

export interface IAppProps { }

export interface IAppState {
    blogs: Array<{ id: number, title: string, content: string, _created: string, name: string }>;
}

export default Blogs;
