import React from 'react'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import Block from './models';
;

interface Props {
    id: string;
    html: string;
    tag: string;
    updatePage: (block: Block) => void;
    addBlock: (currentBlock: Block) => void;
    
}

interface State {
    html: string;
    tag: string;
}

class EditableBlock extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        // this.contentEditable = React.createRef();
        this.state = {
            html: "",
            tag: "h1",
        };
    }

    componentDidMount() {
        this.setState({
            html: this.props.html,
            tag: this.props.tag
        })
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        const htmlChanged = prevState.html !== this.state.html;
        const tagChanged = prevState.tag !== this.state.tag;
        if (htmlChanged || tagChanged) {
            this.props.updatePage({
                id: this.props.id,
                html: this.state.html,
                tag: this.state.tag
            })
        }
    }

    onChangeHandler = (e: ContentEditableEvent) => {
        this.setState({
            html: e.target.value
        })
    }

    render() {
        return (
            <>
                <div className="bg-gray-100 hover:bg-gray-250">
                    <ContentEditable
                        className="p-5"
                        // innerRef={this.contentEditable}
                        tagName={this.state.tag}
                        html={this.state.html}
                        placeholder={"Type / for commands"}
                        onChange={this.onChangeHandler}
                    />
                </div>
                
            </>
        );
    }
}

export default EditableBlock