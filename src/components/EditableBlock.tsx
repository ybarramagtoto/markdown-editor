import React, { Key, KeyboardEvent, KeyboardEventHandler } from 'react'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { unstable_getCurrent } from 'scheduler/tracing';
import Block from './models';
;

interface Props {
    id: string;
    html: string;
    tag: string;
    updatePage: (block: Block) => void;
    addBlock: (currentBlock: {id: string, ref: HTMLElement}) => void;
    deleteBlock: (currentBlock: {id: string, ref: HTMLElement}) => void;
}

interface State {
    htmlBackup: string;
    html: string;
    tag: string;
    previousKey: string;
}

class EditableBlock extends React.Component<Props, State> {
    contentEditable: React.RefObject<HTMLElement>;
    constructor(props: Props) {
        super(props);
        this.contentEditable = React.createRef<HTMLElement>();
        this.state = {
            htmlBackup: "",
            html: "",
            tag: "",
            previousKey: ""
        };
    }

    // componentWillMount() {
    //     //console.log("CDM: state html: " + this.state.html + "--- props html: " + this.props.html);
    //     this.setState({
    //         html: ""
    //     })
    // }

    componentDidMount() {
        console.log("CDM: state html: " + this.state.html + "--- props html: " + this.props.html);
        this.setState({
            html: this.props.html,
            tag: this.props.tag
        })
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        console.log("CDU: " + this.state.html);
        const htmlChanged = prevState.html !== this.state.html;
        //const tagChanged = prevState.tag !== this.state.tag;
        if (htmlChanged) { //|| tagChanged) {
            this.props.updatePage({
                id: this.props.id,
                html: this.state.html,
                tag: this.state.tag
            })
        }
    }

    // componentDidUpdate(prevProps: Props, prevState: State): void {
    //     this.setState({
    //         html: this.state.html
    //     })        
    // }

    componentWillUnmount(): void {
        console.log("CWU: state html: " + this.state.html + " ---- id: " + this.props.id);
        // this.setState({
        //     html: this.state.html
        // })
    }


    onChangeHandler = (e: ContentEditableEvent) => {
        console.log("ON CHANGE HANDLER: " + e.target.value);
        this.setState({
            html: e.target.value
        })
        // console.log("onChangeHandler");
        // console.log("setting state: " + this.state.html);
        //comdfsadfds
    }

    onKeyDownHandler = (e: KeyboardEvent) => {
        if (e.key === "/") {
            this.setState({html: this.state.html})
        }

        if (e.key === "Enter") {
            if (this.state.previousKey !== "Shift") {
                e.preventDefault();
            
                this.props.addBlock({
                    id: this.props.id,
                    ref: this.contentEditable.current!  
                });
            }
        }

        if (e.key === 'Backspace' && !this.state.html) {
            e.preventDefault();
            this.props.deleteBlock({
                id: this.props.id,
                ref: this.contentEditable.current!
            });
        }

        this.setState({ previousKey: e.key });
    }

    clearHtml = () => {
        this.setState({
            html: "k"
        })
    }

    //Do not call set state here. this will cause an infinite loop. Best practice is to keep the render() function a 
    //pure function
    render() {
        return (
            <>
                {"Render EditableBlock: this.state.html: " + this.state.html + "    "}
                <ContentEditable
                    className="p-1 w-800 bg-gray-100"
                    innerRef={this.contentEditable}
                    tagName={this.state.tag}
                    html={this.state.html}
                    onChange={this.onChangeHandler}
                    onKeyDown={this.onKeyDownHandler}
                />
            </>
        );
    }
}

export default EditableBlock