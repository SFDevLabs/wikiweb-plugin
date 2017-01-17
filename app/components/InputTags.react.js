import React, { Component, PropTypes } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';

class InputTags extends Component {
  static propTypes = {
    tags: PropTypes.array.isRequired,
    onTagChange: PropTypes.func.isRequired,
  }

  handleDelete = (i) => {
    const tags = this.props.tags;
    tags.splice(i, 1);
    this.props.onTagChange(tags);
  }

  handleAddition = (tag) => {
    const tags = this.props.tags;
    tags.push({
      id: tags.length + 1,
      text: tag,
    });
    this.props.onTagChange(tags);
  }

  handleDrag = (tag, currPos, newPos) => {
    const tags = this.props.tags;

    // mutate array
    tags.splice(currPos, 1);
    tags.splice(newPos, 0, tag);

    // re-render
    this.props.onTagChange(tags);
  }

  render() {
    const { tags } = this.props;
    return (
      <div className="reactTagsModule">
        <ReactTags
          tags={tags}
          handleDelete={this.handleDelete}
          handleAddition={this.handleAddition}
          handleDrag={this.handleDrag}
        />
      </div>
    );
  }
}

export default InputTags;
