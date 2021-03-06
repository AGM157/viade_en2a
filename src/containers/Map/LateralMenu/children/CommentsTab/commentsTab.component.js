import React, { Component } from "react";
import Container from "react-bootstrap/Container";

import { postNewComment } from "../../../../../services/comments/commentsService";
import CommentsList from "./CommentsList/commentsList.component";
import CommentForm from "./CommentsForm/index";
import { CommentsTabWrapper } from "./commentsTab.style";
import { loadCommentsFromRouteCommentsProperty } from "../../../../../services/DomainJSONTranslator";

import { successToaster, errorToaster } from "@utils";

import { withTranslation } from "react-i18next";

class CommentsTab extends Component<Props> {
  constructor(props) {
    super(props);

    const { routeObject } = this.props;

    this.state = {
      text: "",
      commentList: routeObject.commentList,
    };

    this.handleSetText = this.handleSetText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.commentsListReference = React.createRef();
  }

  handleSetText(newText) {
    this.setState({ text: newText });
  }

  handleSubmit(event) {
    const { t } = this.props;
    const { routeObject } = this.props;
    var that = this;

    postNewComment(this.state.text, routeObject.comments, function(success) {
      if (success) {
        loadCommentsFromRouteCommentsProperty(routeObject.comments).then(
          (commentsParsed) => {
            that.setState({ commentList: commentsParsed });
            successToaster(t("mapView.comment.commentSuccess"));
          }
        );
      } else {
        errorToaster(t("mapView.comment.commentFailure"));
      }
    });

    event.preventDefault();
  }

  render() {
    //const { routeObject } = this.props;
    return (
      <Container fluid data-testid="commentsTab">
        <CommentsTabWrapper>
          <CommentForm
            setText={this.handleSetText}
            handleSubmit={this.handleSubmit}
          />

          <CommentsList
            ref={this.commentsListReference}
            comments={this.state.commentList}
          />
        </CommentsTabWrapper>
      </Container>
    );
  }
}

export default withTranslation()(CommentsTab);
