import { Tag, Input, Icon } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';

export default class CreateLabelsGroup extends React.Component {
  state = {
    tags: [],
    inputVisible: false,
    inputValue: '',
  };

  componentDidMount() {
    if (this.props.todo) {
      this.setState({ tags : this.props.todo.labels }, () => console.log(this.state.tags));
    }
  }

  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({ tags });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    }, () => { this.props.setLabelsGroup(this.state.tags) });
  };

  saveInputRef = input => (this.input = input);

  render() {
    const { tags, inputVisible, inputValue } = this.state;
    const labelsList = tags.map( tag => {
      return(
        <Tag
        key={tag}
        className = "create-group__label"
        closable
        onClose={e => {
          e.preventDefault();
          this.handleClose(tag);
        }}
      >
        {tag}
      </Tag>
      )
    } );
    return (
      <>
      <div className="create-group">
        <div className="create-group__title">Labels : 
          {!inputVisible && (
            <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed', marginLeft: "8px"}}>
              <Icon type="plus"/> New Tag
            </Tag>
          )}
          {inputVisible && (
          <Input
            ref={this.saveInputRef}
            className="create-group__input"
            type="text"
            size="small"
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        </div>
        <div className="create-group__list">
          <TweenOneGroup
            style={{display: "flex", flexWrap: "wrap"}}
            enter={{
              scale: 0.8,
              opacity: 0,
              type: 'from',
              duration: 200,
              onComplete: e => {
                e.target.style = '';
              },
            }}
            leave={{ opacity: 0 , scale: 0, duration: 200 }}
            appear={false}
          >
            {labelsList}
          </TweenOneGroup>
        </div>
      </div>
      <style jsx>{`
            .create-group{
              width: 285px;
              border: none;
              border-radius: 5px;
              box-shadow: 0px 0px 5px rgba(15, 16, 18, 0.2);
              padding: 8px 16px;
              margin-bottom: 16px;
            }

            :global(.create-group__list){
              width: 100%;
              display: flex;
            }

            .create-group__title{
              font-size: 13px;
              opacity: 0.5;
              margin-bottom: 16px;
            }

            :global(.create-group__label){
              width: fit-content;
              display: flex;
              align-items: center;
              background-color: #FFC500;
              font-size: 10px;
              font-weight: 700;
              color: #FFFFFF;
              border-radius: 25px;
              padding: 8px 16px;
              margin-bottom: 8px;
              line-height: 0;
            }

            :global(.create-group__input){
              width: 70%;
              border: none;
              border-radius: 5px;
              box-shadow: 0px 0px 5px rgba(15, 16, 18, 0.2);
              padding: 8px 16px;
              margin-left: 8px;
            }
      `}</style>
      </>
    );
  }
}