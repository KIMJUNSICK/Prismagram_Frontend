import React from "react";
import { withRouter } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";

import { SEARCH } from "./SearchQuery";
import SearchPresenter from "./SearchPresenter";

export default withRouter(({ location: { search } }) => {
  const term = search.split("=")[1];
  const { data, loading } = useQuery(SEARCH, {
    skip: term === undefined,
    variables: { term }
  });
  return <SearchPresenter searchTerm={term} loading={loading} data={data} />;
});
