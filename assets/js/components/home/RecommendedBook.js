import React from 'react';
import axios from 'axios';

import { Icon, Image as ImageComponent, Item } from 'semantic-ui-react';

export default class RecommendedBook extends React.Component {
  constructor() {
    super();
    this.state = {
      book: {}
    };
  }

  componentDidMount() {
    // axios.get('/api/recommended')
    //   .then((res) => {
    //     this.setState({ book: res.data });
    //   });
  }

  render() {
    const book = this.state.book;

    return (
      <Item.Group>
        <Item>
          <Item.Image size='medium' src={book.cover} />
          <Item.Content style={{ 'paddingRight': '40px' }}>
            <Item.Header as='a'>{book.title}</Item.Header>
            <Item.Meta>{book.authors}</Item.Meta>
            <Item.Description>
              {book.description}
            </Item.Description>
            <Item.Extra>
              {book.genres}
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    );
  }
}