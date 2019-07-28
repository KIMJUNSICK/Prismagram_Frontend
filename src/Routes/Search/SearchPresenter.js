import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FatText from "../../Components/FatText";
import Loader from "../../Components/Loader";
import UserCard from "../../Components/UserCard";

const Section = styled.div``;

const Wrapper = styled.div`
  height: 50vh;
`;

const SearchPresenter = ({ searchTerm, loading, data }) => {
  if (searchTerm === undefined) {
    return (
      <Wrapper>
        <FatText text="Please Search for Something..." />
      </Wrapper>
    );
  } else if (loading === true) {
    return (
      <Wrapper>
        <Loader />;
      </Wrapper>
    );
  } else if (data && data.searchUser && data.searchPost) {
    return (
      <Wrapper>
        <Section>
          {data.searchUser.length === 0 ? (
            <FatText text={"No Users found"} />
          ) : (
            data.searchUser.map(user => (
              <UserCard
                key={user.id}
                userName={user.userName}
                url={user.avatar}
                isSelf={user.isSelf}
                isFollowing={user.isFollowing}
              />
            ))
          )}
        </Section>
        {data.searchPost.length === 0 ? (
          <FatText text={"No Posts found"} />
        ) : (
          data.searchPost.map(post => null)
        )}
        <Section />
      </Wrapper>
    );
  }
};

SearchPresenter.propTypes = {
  searchTerm: PropTypes.string,
  loading: PropTypes.bool,
  data: PropTypes.objectOf({
    searchUser: PropTypes.arrayOf(
      PropTypes.shape({
        avatar: PropTypes.string,
        id: PropTypes.string.isRequired,
        isFollowing: PropTypes.bool.isRequired,
        isSelf: PropTypes.bool.isRequired,
        userName: PropTypes.string.isRequired
      })
    ),
    searchPost: PropTypes.arrayOf(
      PropTypes.shape({
        files: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
          })
        ),
        likeCount: PropTypes.number.isRequired,
        commentCount: PropTypes.number.isRequired
      })
    )
  })
};

export default SearchPresenter;
