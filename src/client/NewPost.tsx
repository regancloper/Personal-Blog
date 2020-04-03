import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import SelectMenu from './SelectMenu';


class NewPost extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);
        this.state = {
            title: '',
            content: '',
            tag: '',
            blogtags: []
        }
    }


    async componentDidMount() {
        try {
            let r = await fetch(`/api/tags`);
            let blogtags = await r.json();
            this.setState({ blogtags });
        } catch (error) {
            console.log(error);
        }
    }

    addNewChirp = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (this.state.title === '' || this.state.content === '' || this.state.tag === '') {
            alert("All fields were not filled in - please fill in all fields to submit!");
        } else {
            fetch('/api/blogs', {
                method: 'POST',
                body: JSON.stringify({ title: this.state.title, text: this.state.content, tag: this.state.tag }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(() => {
                    this.props.history.push('/');
                });
        }
    };

    render() {
        return (
            <div className="my-5 py-3 container bg-light border rounded shadow-lg">
                <form>
                    <div className="form-group">
                        <label htmlFor="author">Title</label>
                        <input type="text" className="form-control" placeholder="Enter title here:"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ title: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="tag">Tag</label>
                        <select className="form-control" name="tags"
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => this.setState({ tag: e.target.value })}>
                            <SelectMenu tags={this.state.blogtags} />
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="commentText">Content</label>
                        <textarea className="form-control" rows={3} placeholder="Enter content here:"
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({ content: e.target.value })}
                        ></textarea>
                    </div>

                    <button className="btn btn-outline-success" id="addButton"
                        onClick={this.addNewChirp}>
                        Add Blog!
                    </button>
                </form>
            </div >
        );
    }
}



export interface IAppProps extends RouteComponentProps<{ id: string }> { }

export interface IAppState {
    title: string;
    content: string;
    tag: string;
    blogtags: Array<{ id: number, name: string }>;
}

export default NewPost;



