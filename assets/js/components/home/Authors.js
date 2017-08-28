import React from 'react';

export default class Authors extends React.Component {

  render() {
    const authors = this.props.authors.map((author) => {
        return (
          <a key={author.id}>{author.first_name + ' ' + author.last_name}</a>
        );
    });

    return (
        <div>{authors}</div>
    );
  }
}
