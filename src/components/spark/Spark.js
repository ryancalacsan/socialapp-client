import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
// import MyButton from '../../util/MyButton'; TODO Add comment button overlay
import LikeButton from './LikeButton';
import DeleteSpark from './DeleteSpark';
import SparkDialog from './SparkDialog';
//MUI
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
//Icons
import ChatIcon from '@material-ui/icons/Chat';

//Redux
import { connect } from 'react-redux';
// import CommentButton from './CommentButton';

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20,
  },

  image: {
    minWidth: 90,
    maxHeight: 90,
    borderRadius: '50%',
    zIndex: '99',
    margin: 15,
  },
  content: {
    padding: 25,
    objectFit: 'cover',
  },
  commentIcon: {
    padding: 12,
    textAlign: 'center',
    position: 'relative',
    top: 8,
  },
};

class Spark extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      spark: {
        body,
        createdAt,
        userImage,
        userHandle,
        sparkId,
        likeCount,
        commentCount,
      },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteSpark sparkId={sparkId} />
      ) : null;

    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          <LikeButton sparkId={sparkId} />
          <span>{likeCount} likes</span>
          {/* <MyButton tip="comments"> */}
          <span className={classes.commentIcon}>
            <ChatIcon color="primary" />
          </span>
          {/* </MyButton> */}
          <span>{commentCount} comments</span>
          <SparkDialog
            sparkId={sparkId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
        </CardContent>
      </Card>
    );
  }
}

Spark.propTypes = {
  user: PropTypes.object.isRequired,
  spark: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Spark));
