import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "react-apollo-hooks";
import { FOLLOW, UNFOLLOW } from "./FollowButtonQueries";
import FollowButtonPresenter from "./FollowButtonPresenter";

const FollowButtonContainer = ({ id, isFollowing }) => {
  const [isFollowingS, setIsFollowing] = useState(isFollowing);
  const [followMutaion] = useMutation(FOLLOW, {
    variables: { id }
  });
  const [unfollowMutation] = useMutation(UNFOLLOW, {
    variables: { id }
  });

  const onClick = () => {
    if (isFollowingS === true) {
      setIsFollowing(false);
      unfollowMutation();
    } else {
      setIsFollowing(true);
      followMutaion();
    }
  };

  return <FollowButtonPresenter isFollowing={isFollowingS} onClick={onClick} />;
};

FollowButtonContainer.propTypes = {
  id: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired
};

export default FollowButtonContainer;
