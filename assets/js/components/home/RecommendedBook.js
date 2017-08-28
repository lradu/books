import React from 'react';
import axios from 'axios';

import { Icon, Image as ImageComponent, Item, Loader } from 'semantic-ui-react';
import Authors from './Authors';

export default class RecommendedBook extends React.Component {
  constructor() {
    super();
    this.state = {
      book: {}
    };
  }

  componentDidMount() {
    axios.get('/api/recommended')
      .then((res) => {
        this.setState({ book: res.data });
      });
  }

  render() {
    const book = this.state.book;
    
    if(book.id) {
      return (
        <Item.Group>
          <Item>
            <Item.Image size='medium' src={book.cover} />
            <Item.Content style={{ 'paddingRight': '40px' }}>
              <Item.Header as='a'>{book.title}</Item.Header>
              <Item.Meta>
                <Authors authors={book.authors} />
              </Item.Meta>
              <Item.Description>
                {book.description}
              </Item.Description>
              <Item.Extra>
                {book.genres.toString()}
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      );
    }

    return <Loader active inline='centered' />
  }
}