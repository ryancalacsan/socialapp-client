import React, { Component } from 'react';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
//Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
//Redux
import { connect } from 'react-redux';
import { likeSpark, unlikeSpark } from '../../redux/actions/dataActions';

export class LikeButton extends Component {
  likedSpark = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find((like) => like.sparkId === this.props.sparkId)
    )
      return true;
    else return false;
  };
  likeSpark = () => {
    this.props.likeSpark(this.props.sparkId);
  };
  unlikeSpark = () => {
    this.props.unlikeSpark(this.props.sparkId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedSpark() ? (
      <MyButton tip="Undo like" onClick={this.unlikeSpark}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="like" onClick={this.likeSpark}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  sparkId: PropTypes.string.isRequired,
  likeSpark: PropTypes.func.isRequired,
  unlikeSpark: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likeSpark,
  unlikeSpark,
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
