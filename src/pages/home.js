import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Spark from '../components/spark/Spark';
import Profile from '../components/profile/Profile';
import SparkSkeleton from '../util/SparkSkeleton';

import { connect } from 'react-redux';
import { getSparks } from '../redux/actions/dataActions';

export class home extends Component {
  componentDidMount() {
    this.props.getSparks();
  }
  render() {
    const { sparks, loading } = this.props.data;
    let recentSparksMarkup = !loading ? (
      sparks.map((spark) => <Spark key={spark.sparkId} spark={spark} />)
    ) : (
      <SparkSkeleton />
    );
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {recentSparksMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getSparks: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getSparks })(home);
