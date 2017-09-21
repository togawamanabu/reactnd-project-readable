import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { formatTimestamp } from '../utils/helpers'
import { Link } from 'react-router-dom'
import Badge from 'material-ui/Badge';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import {getPostCommentAction, getCategoryPosts, getAllPostsAction} from '../actions'

class PostList extends Component {
  componentDidMount() {
    var category=this.props.match.params.category

    console.log("here", category)

    if(category) {
      this.props.getCategoryPosts(category)
    } else {
      this.props.getAllPostsAction()
    }

    //TODO: import comments

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

    let {posts, category} =  this.props

    return(
      <div className="postlist">
          {posts.map((post) => (
           <Card key={post.id} style={styles.card} zDepth={3}>

             <Link to={`/posts/${post.id}`}>
               <CardTitle title={post.title} />
             </Link>
            <CardText>
                {post.body}
                <div style={styles.date}>
                  {formatTimestamp(post.timestamp)}
                </div>
            </CardText>
            <CardActions>
              <Badge badgeContent={post.voteScore} primary={true} />
              <IconButton >
                <FontIcon className="material-icons">thumb_up</FontIcon>
              </IconButton>
              <IconButton >
                <FontIcon className="material-icons">thumb_down</FontIcon>
              </IconButton>


              <div>
                <RaisedButton label="Edit" primary={true}  />
                <RaisedButton label="Delete" secondary={true} />
              </div>
            </CardActions>
           </Card>
         ))}
      </div>
    )
  }
}


function mapStateToProps(state) {
  console.log(state)
  return {
    posts: state.post.posts,
    category: state.category.category
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllPostsAction: () => dispatch(getAllPostsAction()),
    getPostCommentAction: (post_id) => dispatch(getPostCommentAction(post_id)),
    getCategoryPosts: (category) => dispatch(getCategoryPosts(category)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)( PostList ));
