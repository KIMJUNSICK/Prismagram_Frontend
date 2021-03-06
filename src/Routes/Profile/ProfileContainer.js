import React from "react";
import { withRouter } from "react-router-dom";
import { useQuery, useMutation } from "react-apollo-hooks";
import ProfilePresenter from "./ProfilePresenter";
import { GET_USER, LOCAL_LOG_OUT } from "./ProfileQueries";

const ProfileContainer = ({
  match: {
    params: { userName }
  }
}) => {
  const { data, loading } = useQuery(GET_USER, {
    variables: { userName }
  });
  const [logOut] = useMutation(LOCAL_LOG_OUT);

  return <ProfilePresenter data={data} loading={loading} logOut={logOut} />;
};

export default withRouter(ProfileContainer);
