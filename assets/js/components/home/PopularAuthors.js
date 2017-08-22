import React from 'react';
import axios from 'axios';

import { Grid, Icon, Item, Image, Rating, Loader } from 'semantic-ui-react';

export default class PopularAuthors extends React.Component {
  constructor() {
    super();
    this.state = {
      authors: []
    };
  }
  componentDidMount(){
    axios.get('/api/authors')
      .then((res) => {
        this.setState({
          authors: res.data
        });
      });
  }

  render() {
    const authorList = this.state.authors.map((author) =>
    <Grid.Column key={author.id}>
      <Item.Group>
        <Item>
          <Item.Image size='tiny' avatar src={author.photo} shape='circular'/>
          <Item.Content style={{ 'fontSize': '70%' }}>
            <Item.Header as='a'>{author.first_name + " " + author.last_name}</Item.Header>
            <Item.Meta>Genres: {author.genres.toString()}</Item.Meta>
            <Item.Description>
              {author.description}
            </Item.Description>
            <Item.Extra>
              <a>{author.books} books</a>
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    </Grid.Column>
    );

    if(authorList.length) {
      return (
        <Grid columns={4}>
          {authorList}
        </Grid>
      );
    }

    return <Loader active inline='centered' />
  }
}
