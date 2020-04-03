import { Connection } from './index';

export const all = async () => {
    return new Promise((resolve, reject) => {
        Connection.query('SELECT b.*, a.name from Blogs b JOIN Authors a ON b.authorid = a.id', (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}

export const one = async (id: number) => {
    return new Promise((resolve, reject) => {
        Connection.query('CALL spGetPostById(?)', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results[0][0]);
        });
    });
}

export const add = async (title: string, tag: string, text: string) => {
    return new Promise((resolve, reject) => {
        Connection.query('CALL spAddBlogPost(?, ?, ?)', [title, tag, text], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}

const edit = async (id: string, title: string, content: string) => {
    return new Promise((resolve, reject) => {
        Connection.query('UPDATE blogs SET title = ?, content = ? WHERE id = ?', [title, content, id], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

export const remove = async (id: string) => {
    return new Promise((resolve, reject) => {
        Connection.query('DELETE FROM blogs WHERE id = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}


export default {
    all, 
    one,
    add,
    edit,
    remove
}