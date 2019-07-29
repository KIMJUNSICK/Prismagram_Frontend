import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import FatText from "../../Components/FatText";
import FollowButton from "../../Components/FollowButton";
import SquarePost from "../../Components/SquarePost";

const Wrapper = styled.div`
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 40px;
`;

const HeaderColumn = styled.div``;

const UserNameRow = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.span`
  display: block;
  font-size: 25px;
  font-weight: 300;
  margin-right: 30px;
`;

const Counts = styled.ul`
  display: flex;
  margin: 20px 0;
`;

const Count = styled.li`
  font-size: 20px;
  &:not(:last-child) {
    margin-right: 45px;
  }
`;

const FullName = styled(FatText)`
  font-size: 20px;
`;

const Bio = styled.p`
  font-size: 15px;
  margin-top: 10px;
`;

const StyledFollowButton = styled(FollowButton)`
  background-color: white;
`;

const PostSection = styled.div`
  padding-top: 50px;
  border-top: ${props => props.theme.superLightGreyColor} 1px solid;
  margin-top: 80px;
  margin-bottom: 50px;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(3, 300px);
  grid-template-rows: 300px;
  grid-auto-rows: 300px;
`;

const ProfilePresenter = ({ data, loading }) => {
  if (loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (!loading && data && data.seeUser) {
    console.log(data);
    const {
      seeUser: {
        id,
        avatar,
        userName,
        fullName,
        bio,
        followersCount,
        followingCount,
        isFollowing,
        isSelf,
        postCount,
        posts
      }
    } = data;
    return (
      <Wrapper>
        <Helmet>
          <title>{userName} | Prismagram</title>
        </Helmet>
        <Header>
          <HeaderColumn>
            <Avatar url={avatar} size="lg" />
          </HeaderColumn>
          <HeaderColumn>
            <UserNameRow>
              <UserName>{userName}</UserName>
              {!isSelf && (
                <StyledFollowButton isFollowing={isFollowing} id={id} />
              )}
            </UserNameRow>
            <Counts>
              <Count>
                <FatText text={String(postCount)} /> posts
              </Count>
              <Count>
                <FatText text={String(followersCount)} /> followers
              </Count>
              <Count>
                <FatText text={String(followingCount)} /> following
              </Count>
            </Counts>
            <FullName text={fullName} />
            <Bio>{bio}</Bio>
          </HeaderColumn>
        </Header>
        <PostSection>
          {posts.map(post => (
            <SquarePost
              key={post.id}
              likeCount={post.likeCount}
              commentCount={post.commentCount}
              file={post.files[0]}
            />
          ))}
        </PostSection>
      </Wrapper>
    );
  }
};

export default ProfilePresenter;
