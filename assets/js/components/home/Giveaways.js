import React from 'react';
import axios from 'axios';

import { Image as ImageComponent, Item, Label, Loader } from 'semantic-ui-react';
import Authors from './Authors';

export default class Giveaways extends React.Component {
  constructor() {
    super();
    this.state = {
        giveaways: []
    };
  }

  componentDidMount() {
    axios.get('/api/giveaways')
      .then((res) => {
        this.setState({ giveaways: res.data });
      });
  }

  countdown(d){
    const date = new Date(d);
    const now = new Date();
    const seconds = (date - now) / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60
    const days = hours / 24;

    if(days > 1){
        return Math.round(days) + ' days';
    } else if(hours > 1) {
        return Math.round(hours) + ' hours';
    } else if(minutes > 1) {
        return Math.round(minutes) + ' minutes'
    }

    return seconds + ' seconds';
  }

  render() {
    const giveaways = this.state.giveaways.map((g) =>
      <Item key={g.book.id}>
        <Item.Image size='small' src={g.book.cover} />
        <Item.Content>
            <Item.Header as='a'>{g.book.title}</Item.Header>
            <Item.Meta>
                <Authors authors={g.book.authors} />
            </Item.Meta>
            <Item.Extra>
                <span className='cinema'>{g.book.genres.toString()}</span>
            </Item.Extra>
            <Item.Extra>
                <Label color='blue' basic>Copies: {g.copies}</Label>
                <Label color='red' basic>Ends in: {this.countdown(g.end_date)}</Label>
            </Item.Extra>
        </Item.Content>
      </Item>
    );

    if(giveaways.length) {
      return (
        <Item.Group divided>{giveaways}</Item.Group>
      );
    }

    return <Loader active inline='centered' />
  }
}
