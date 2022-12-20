### Starting the Project
In the project directory run: `yarn start`

### Known Issue
When adding a new block the rendering of the blocks is not correct. The newly added block's text should be blank, but it is incorrectly populated with the next blocks html.

I've added block info (id, tag, html) to be rendered onto the screen above each block. These are output in the correct order.

### Steps to Reproduce
1. Type in 'hello' in block 1
2. Press enter to create a new block. Click in the new block.
3. Type in 'world' in block 2
4. Put your cursor back to the end of block 1 at the end of 'hello'
5. Press enter

Expected Result: A new blank block should be created in between block 1 and block 2
Actual Result: A block is created between block 1 and block 2 but its text field contains block 2's text field.
