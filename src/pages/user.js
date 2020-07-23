import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Spark from '../components/spark/Spark';
import StaticProfile from '../components/profile/StaticProfile';
import Grid from '@material-ui/core/Grid';

import SparkSkeleton from '../util/SparkSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

class user extends Component {
  state = {
    profile: null,
    sparkIdParam: null,
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const sparkId = this.props.match.params.sparkId;

    if (sparkId) this.setState({ sparkIdParam: sparkId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { sparks, loading } = this.props.data;
    const { sparkIdParam } = this.state;

    const sparksMarkup = loading ? (
      <SparkSkeleton />
    ) : sparks === null ? (
      <p>No sparks from this user</p>
    ) : !sparkIdParam ? (
      sparks.map((spark) => <Spark key={spark.sparkId} spark={spark} />)
    ) : (
      sparks.map((spark) => {
        if (spark.sparkId !== sparkIdParam)
          return <Spark key={spark.sparkId} spark={spark} />;
        else return <Spark key={spark.sparkId} spark={spark} openDialog />;
      })
    );

    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {sparksMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(user);
