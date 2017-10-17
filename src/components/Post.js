import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { formatTimestamp } from '../utils/helpers'
import { Link } from 'react-router-dom'
import Badge from 'material-ui/Badge'
import {Card, CardActions, CardText, CardTitle} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import Chip from 'material-ui/Chip'

import {
  votePostAction,
  deletePostAction,
  getPostCommentAction,
 } from '../actions'

class Post extends Component {
    static propType = {
      post: PropTypes.object.isRequired,
      editPost: PropTypes.func.isRequired,
    }

    static styles = {
      card: {
        margin: 20,
      },
      date: {
        color: '#555',
        fontSize: 7,
        marginTop: 5

      }
    }


  componentDidMount() {
    this.props.getPostCommentAction(this.props.post.id)
  }

  delete = (post_id) => {
    this.props.deletePostAction(post_id)
    this.props.history.push('/')
  }

  edit = (post) => {
    this.props.editPost(post)
  }

  vote = (e, upordown, post_id) => {
    e.preventDefault()
    this.props.votePostAction(post_id, upordown)
  }

  render() {
    var styles = {
      card: {
        margin: 20,
      },
      date: {
        color: '#555',
        fontSize: 7,
        marginTop: 5

      }
    }

    let {post,comments} =  this.props

    const comments_num = comments[post.id]?comments[post.id].length:0

    return (
      <Card key={post.id} style={styles.card} zDepth={3}>

        <Link to={`/${post.category}/${post.id}`}>
          <CardTitle title={post.title} />
        </Link>
       <CardText>
           {post.body}
            <Chip>{comments_num} {comments_num<2?"comments":"comment"}</Chip>
           <div style={styles.date}>
             <p>{formatTimestamp(post.timestamp)}</p>
             <p> by.{post.author}</p>
             <Chip>{post.category} </Chip>
           </div>
       </CardText>
       <CardActions>
         <Badge badgeContent={post.voteScore} primary={true} />
         <IconButton onClick={(e) => this.vote(e, "upVote", post.id) }>
           <FontIcon className="material-icons">thumb_up</FontIcon>
         </IconButton>
         <IconButton onClick={(e) => this.vote(e, "downVote", post.id) }>
           <FontIcon className="material-icons">thumb_down</FontIcon>
         </IconButton>


         <div>
           <RaisedButton label="Edit" onClick={(e) => this.edit(post)} primary={true}  />
           <RaisedButton label="Delete" onClick={(e) => this.delete(post.id) }  secondary={true} />
         </div>
       </CardActions>
      </Card>
      )
    }
  }


  function mapStateToProps(state) {
    return {
      comments: state.comment.comments,
    }
  }

  function mapDispatchToProps(dispatch) {
    return {
      votePostAction: (post_id, upordown) => dispatch(votePostAction(post_id, upordown)),
      deletePostAction: (post_id) => dispatch(deletePostAction(post_id)),
      getPostCommentAction: (post_id) => dispatch(getPostCommentAction(post_id)),
    }
  }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)( Post ));
