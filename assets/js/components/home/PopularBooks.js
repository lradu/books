import React from 'react';
import axios from 'axios';

import { Image as ImageComponent, Item, Rating, Loader } from 'semantic-ui-react';

export default class PopularBooks extends React.Component {
  constructor() {
    super();
    this.state = {
      books: []
    };
  }

  componentDidMount() {
    axios.get('/api/books?maxResults=10')
      .then((res) => {
        this.setState({ books: res.data });
      });
  }

  render() {
    const bookList = this.state.books.map((book) => 
      <Item key={book.id}>
        <Item.Image size='tiny' src={book.cover} />
        <Item.Content>
          <Item.Header as='a'>{book.title}</Item.Header>
          <Item.Meta>
            <span className='cinema'>{book.genres.toString()}</span>
          </Item.Meta>
          <Item.Description>{book.description}</Item.Description>
          <Item.Extra>
            <Rating icon='star' defaultRating={book.rating} maxRating={5} />  
             {book.rating} / {book.ratings} Ratings
          </Item.Extra>
        </Item.Content>
      </Item>
    );

    if(bookList.length) {
      return (
        <Item.Group divided>{bookList}</Item.Group>
      );
    }

    return <Loader active inline='centered' />
  }
}
