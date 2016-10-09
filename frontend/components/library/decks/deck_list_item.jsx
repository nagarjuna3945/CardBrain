import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import { deleteDeck } from '../../../actions/deck_actions';

class DeckListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'none'
    };
    this.toggleDeckMenuOpen = this.toggleDeckMenuOpen.bind(this);
    this.handleDeleteDeckClick = this.handleDeleteDeckClick.bind(this);
    this.handleEditCardsClick = this.handleEditCardsClick.bind(this);
    this.deckMenuStyle = { display: 'none'};
  }

  toggleDeckMenuOpen () {
    if (this.state.display === 'none') {
      this.setState({ display: 'block' });
    } else {
      this.setState({ display: 'none' });
    }
  }

  handleDeleteDeckClick() {
    this.setState({ deckMenuOpen: false });
    this.props.deleteDeck(this.props.deck.id);
  }

  handleEditCardsClick () {
    hashHistory.push(`/edit/${this.props.deck.id}`);
  }

  render () {
    let menuBtn = <noscript />;
    let studyBtnStyle = {borderRadius: '4px', marginRight: '15px'};
    if (this.props.owner) {
      studyBtnStyle = {};
      menuBtn = (
        <button ref='menu' className='deck-menu-btn' onClick={this.toggleDeckMenuOpen}>
          <i className="fa fa-cog"/>
        </button>
      );
    }
    const deck = this.props.deck;
    return (
      <li className='deck-item group'>
        <div className='percentage'>
          {deck.mastery}%
        </div>
        <div className='deck-title'>
          <h5>{deck.title}</h5>
          <span>Cards: {deck.numCards}</span>
        </div>
        {menuBtn}
        <button className='study-btn' style={studyBtnStyle}>
          <span><i className="fa fa-play-circle-o" aria-hidden="true"/></span>Study
        </button>
        <article style={this.state} className='subject-menu deck-menu'>
          <button onClick={this.handleEditCardsClick}>
            <span className='menu-list-icon'>
              <i className="fa fa-list" ></i>
            </span>
            Edit Cards
          </button>
          <button onClick={this.handleDeleteDeckClick}>
            <span className='menu-icon'>
              <i className="fa fa-trash-o" ></i>
            </span>
            Delete Deck
          </button>
        </article>
      </li>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  deleteDeck: (deckId) => dispatch(deleteDeck(deckId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckListItem);