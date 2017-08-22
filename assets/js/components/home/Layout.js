import React from 'react';
import { Card, Container, Divider, Grid, Icon, Segment, Header } from 'semantic-ui-react';

import TopMenu from '../Menu';
import PopularBooks from './PopularBooks';
import PopularAuthors from './PopularAuthors';
import RecommendedBook from './RecommendedBook';

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <TopMenu />
        <Grid celled='internally' columns={2} stackable style={{ paddingTop: '3.75em' }}>
          <Grid.Column width={4}>
            <Header 
              as='h3'
              icon
              textAlign='center'
              >
              <Icon name='empty star' color='orange' circular/>
              <Header.Content>
                <Divider
                  horizontal
                  style={{ 
                    marginBottom: '3em'
                  }}
                  >
                  Popular Books
                </Divider>
              </Header.Content>
            </Header>
            
            <PopularBooks />
          </Grid.Column>
          <Grid.Column width={12}>
            <Grid.Row>
              <Divider
                horizontal
                style={{ 
                  marginBottom: '2em'
                }}
                >
                Recommended Book
              </Divider>
              <RecommendedBook />
            </Grid.Row>
            <Grid.Row>
              <Divider 
                horizontal 
                style={{ 
                  marginTop: '3em',
                  marginBottom: '3em'
                }}
                >
                Popular Authors
              </Divider>
              <PopularAuthors />
            </Grid.Row>
            <Grid.Row 
              style={{ 
                marginTop: '1em',
              }}>
              <Grid relaxed columns={2} stackable>
                <Grid.Column width={8}>
                  <Divider horizontal>Giveaways</Divider>
                </Grid.Column>
                <Grid.Column width={8}>
                  <Divider horizontal>Upcoming Books</Divider>
                </Grid.Column>
              </Grid>
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}