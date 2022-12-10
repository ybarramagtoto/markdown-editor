import React, { useId, useState } from 'react'
import { uid } from 'uid';
import EditableBlock from './EditableBlock';
import Block from './models';


interface Props {
    blocks: Block[];
}

const initialBlock = {
    id: uid(),
    html: "",
    tag: "p"
}

class EditablePage extends React.Component<{}, Props> {
    constructor(props: Props) {
        super(props);
        this.state = { blocks: [initialBlock] };
    }

    updatePageHandler = (block: Block) => {
        this.state.blocks.map((b) => b.id === block.id ? b = {id: block.id, html: block.html, tag: block.tag} : b);
    }

    addBlockHandler = (currentBlock: Block) => {
        const newBlock = { id: uid(), html: "", tag: ""};
        const blocks = this.state.blocks;
        const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
        const updatedBlocks = [...blocks]; //called a spread operator
        updatedBlocks.splice(index + 1, 0, newBlock);
        this.setState({blocks: updatedBlocks});
    }

    render() {
        return (
            <div className="grid grid-cols-1 bg-gray-200">
                {this.state.blocks.map((block, key) => {
                    return (
                        <EditableBlock
                            key={key}
                            id={block.id}
                            tag={block.tag}
                            html="this is an editable content block right ok" 
                            updatePage={this.updatePageHandler}
                            addBlock={this.addBlockHandler}
                            // deleteBlock={this.deleteBlockHandler}
                        />
                    );
                })}

                
            </div>
        );
    }
    
}

export default EditablePage