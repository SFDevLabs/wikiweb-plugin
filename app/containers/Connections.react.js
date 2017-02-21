import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
// import { fetchSearch } from '../actions/entity';
// import { fetchProfile } from '../actions/user';

const startIndex = 0;
const endIndex = 3;

const mapStateToProps = (state) => {
  const { entity:
    { id,
      entityCount,
      isFetching,
      title,
      superEdges,
      queryLink,
      canonicalLink,
    },
  } = state;

  return {
    id,
    entityCount,
    title,
    isFetching,
    superEdges,
    queryLink,
    canonicalLink,
  };
};

class Connections extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    superEdges: PropTypes.array.isRequired,
    location: PropTypes.object,
    entityCount: PropTypes.number.isRequired,
    id: PropTypes.string,
  }

  componentDidMount() {
    // const { dispatch } = this.props;
    // chrome.tabs.query({
    //   active: true,
    //   currentWindow: true,
    // }, (tabs) => {
    //   const url = tabs[0].url.split('?')[0];
    //   dispatch(fetchSearch(url));
    //   dispatch(fetchProfile());
    // });
  }

  render() {
    const {
      superEdges,
      entityCount,
      id,
      isFetching,
      location: {
        search,
      },
    } = this.props;


    // @TODO This should be outside the function and combined with line 101 as the else. @jeffj
    function pageDefaultJSX() {
      return (
        <div style={{ backgroundColor: 'white' }}>
          <span>pageDefaultJSX</span>
        </div>
      );
    }
    // @TODO Move me outside the render
    function edgeCardJSXGenerator(title, canonicalLink, tags, description, username, profileUrl, index) {
      const isNew = search && search.length > 0 && index === 0 ? true : 'none';
      const isBottomBorder = (index !== endIndex - 1) ? '1px solid #DCDCDC' : null;
      const buffBottom = (index === endIndex - 1) ? 40 : 0; // floating footer height;
      return (
        <div key={index} className={'edgeCardBox'} style={{ borderBottom: isBottomBorder, marginBottom: buffBottom }}>
          <div className={'titleBox'}>
            <div style={{ cursor: 'pointer' }} onClick={function () { chrome.tabs.update(null, { url: canonicalLink }); }}>
              {title}
            </div>
          </div>
          <div className={'hyperlink'} title={canonicalLink}>
            <div style={{ cursor: 'pointer' }} onClick={function () { chrome.tabs.update(null, { url: canonicalLink }); }}>
              <span className={'linkIcon'} style={{ lineHeight: '20px', display: 'inline-block' }}>{canonicalLink}</span>
              <span style={{ paddingLeft: 3, color: 'purple', display: isNew }}>(new)</span>
              <span style={{ lineHeight: '20px', display: 'inline-block', paddingLeft: 2 }}><img alt="" src="img/hyperlink.png" className={'hyperlink'} /></span>
            </div>
          </div>
          <div className={'description'} title={description}>
            &ldquo;{description}&rdquo;
          </div>
          <div style={{ display: 'block', height: 22 }}>
            <div className={'userBox'} title={`user: @${username}`}>
              <div style={{ cursor: 'pointer' }} onClick={function () { chrome.tabs.update(null, { url: `http://twitter.com/${username}` }); }}>
                <span><img alt="" src={profileUrl} /></span>
                <span className={'username'}>@{username}</span>
              </div>
            </div>
            <div>
              <div className={'tagBox'}>
                { tags.map((tag, subIndex) => <span key={subIndex} className={'tag'}>{tag}</span>) }
              </div>
            </div>
          </div>
        </div>);
    }

    // @TODO Move me outside the render
    function mainContent(data) {
      return data
        .slice(startIndex, endIndex) // Only take a limited number of Edges for display
        .map((card, index) => {
          const { entity: { title, canonicalLink }, edges } = card;
          const description = edges[0].description;
          const tags = edges[0].tags;
          let username = '';
          let profileUrl = '';
          if (edges && edges.length > 0) {
            username = edges[0].user.username;
            username = edges[0].user.username;
            profileUrl = edges[0].user.profile_image;
          }
          return edgeCardJSXGenerator(title, canonicalLink, tags, description, username, profileUrl, index);
        });
    }
    const pageJSX = superEdges.length > 0 ? mainContent(superEdges) : pageDefaultJSX(superEdges);

    // <img src='/img/loading.gif' style={{ height: 203.7, width: 308.7 }} />
    return (
      <div className={'connectionsJS'} style={{ backgroundColor: 'pink'}} >
        {isFetching ?
          (
            <div style={{ textAlign: 'center' }} >
              <span>Fetching, yo.</span>
            </div>
          ) :
          pageJSX
        }
      </div>
    );
  }
}

export default connect(mapStateToProps)(Connections);
