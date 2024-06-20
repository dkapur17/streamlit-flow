import { Handle, Position } from 'reactflow';
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github.css';



const handlePosMap = {
    'top': Position.Top,
    'right': Position.Right,
    'bottom': Position.Bottom,
    'left': Position.Left,
}

const MarkdownInputNode = ({ data, sourcePosition }) => {
    return (
        <>
        <Handle type="source" position={handlePosMap[sourcePosition]} isConnectable />
            <div className="markdown-node">
                <Markdown rehypePlugins={[rehypeHighlight, rehypeRaw, rehypeKatex]} remarkPlugins={[remarkGfm, remarkMath]}>{data.content}</Markdown>
            </div>
        </>
    );
}

const MarkdownOutputNode = ({ data, targetPosition }) => {

    return (
    <>
        <Handle type="target" position={handlePosMap[targetPosition]} isConnectable />
        <div className="markdown-node">
                <Markdown rehypePlugins={[rehypeHighlight, rehypeRaw, rehypeKatex]} remarkPlugins={[remarkGfm, remarkMath]}>{data.content}</Markdown>
            </div>
    </>
    );
}

const MarkdownDefaultNode = ({ data, sourcePosition, targetPosition }) => {

    return (
    <>
        <Handle type="source" position={handlePosMap[sourcePosition]} />
        <div className="markdown-node">
            <Markdown rehypePlugins={[rehypeHighlight, rehypeRaw, rehypeKatex]} remarkPlugins={[remarkGfm, remarkMath]}>{data.content}</Markdown>
        </div>
        <Handle type="target" position={handlePosMap[targetPosition]} />
    </>
    );
}

export { MarkdownInputNode, MarkdownOutputNode, MarkdownDefaultNode };