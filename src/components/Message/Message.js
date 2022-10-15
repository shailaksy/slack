import '../Message/Message.css'

const Message = () => {
    return (
        <div>
            <textarea
            placeholder="Message"
            rows="5" cols="50"
            className='message-text-area'>
            </textarea>
        </div>
    )
}

export default Message