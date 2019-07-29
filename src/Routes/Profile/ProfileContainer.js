import React from "react";
import { withRouter } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";
import ProfilePresenter from "./ProfilePresenter";
import { GET_USER } from "./ProfileQueries";

const ProfileContainer = ({
  match: {
    params: { userName }
  }
}) => {
  const { data, loading } = useQuery(GET_USER, {
    variables: { userName }
  });
  return <ProfilePresenter data={data} loading={loading} />;
};

export default withRouter(ProfileContainer);
