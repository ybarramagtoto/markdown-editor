import React, { useEffect, useId, useState } from 'react'
import { uid } from 'uid';
import EditableBlock from './EditableBlock';
import Block from './models';

interface Props {

}

interface State {
    blocks: Block[];
}

const initialBlock = {
    id: uid(),
    html: "",
    tag: "p"
}

class EditablePage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { 
            blocks: [initialBlock] 
        };
    }

    updatePageHandler = (block: Block) => {
        const blocks = this.state.blocks;
        //console.log("update page handler : " + block.id + " " + block.tag + " " + block.html)
        const index = blocks.map((b) => b.id).indexOf(block.id);
        const updatedBlocks = [...blocks];
        updatedBlocks[index] = {
            ...updatedBlocks[index],
            tag: block.tag,
            html: block.html
        };

        this.setState({
            blocks: updatedBlocks
        });
    }

    addBlockHandler = (currentBlock: {id: string, ref: HTMLElement}) => {
        
        console.log(this.state.blocks);
        const newBlock = { id: uid(), html: "", tag: "p"};
        const blocks = this.state.blocks;
        const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
        const updatedBlocks = [...blocks];
    
        updatedBlocks.splice(index + 1, 0, newBlock);

        this.setState(
            {blocks: updatedBlocks}, 
            () => {
                console.log("addBlockHandler blocks:");
                const nextElement = currentBlock.ref.nextElementSibling as HTMLElement;
                if (nextElement) {
                    nextElement.focus();
                }
            }
        );

    }

    deleteBlockHandler = (currentBlock: {id: string, ref: HTMLElement}) => {
        const blocks = this.state.blocks;
        
        const element = currentBlock.ref
        const previousElement = currentBlock.ref.previousElementSibling as HTMLElement;
    
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(previousElement);
        range.collapse(false);
        selection?.removeAllRanges();
        selection?.addRange(range);
        previousElement.focus();

        
        const index = blocks.map((b)=> b.id).indexOf(currentBlock.id);
        const updatedBlocks = [...blocks];
        updatedBlocks.splice(index, 1);

        this.setState({blocks: updatedBlocks}, ()=>{
            
        });
    }

    render() {
        
        return (
            <div className="container mx-auto px-10">
                {this.state.blocks.map((block) => {
                    return (
                        <>
                        {"Render EditablePage:"} {block.id} {block.tag} {block.html} {"--------"}
                            <EditableBlock
                                id={block.id}
                                tag={block.tag}
                                html={block.html} 
                                updatePage={this.updatePageHandler}
                                addBlock={this.addBlockHandler}
                                deleteBlock={this.deleteBlockHandler}
                            />
                            
                        </>
                    );
                })}
            </div>
        );
    }
    
}

export default EditablePage