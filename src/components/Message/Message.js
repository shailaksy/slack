import { useState } from 'react';
import '../Message/Message.css'

const Message = () => {

    const [receiverId, setReceiverId] = useState('');
    const [receiverClass, setReceiverClass] = useState('')
    const [messageBody, setMessageBody] = useState('')


    const sendMessage = async (e) => {
        e.preventDefault();
        
        const message = {
            receiver_id: receiverId,
            receiver_class: receiverClass,
            body: messageBody
        }

        await fetch("http://206.189.91.54/api/v1/messages", {
            method: 'POST',
            body: JSON.stringify(message),
            headers: {
                'access-token': localStorage.getItem('access-token'),
                client: localStorage.getItem('client'),
                expiry: localStorage.getItem('expiry'),
                uid: localStorage.getItem('uid'),
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            return response.json()
        })
    }

        
    /* useEffect(() => {
        sendMessage();
     },[]) */

    return (
        <div>
            <form> 
                <textarea
                value={messageBody}
                onChange={(e) => {setMessageBody(e.target.value)}}
                placeholder="Message"
                rows="5" cols="30"
                className='message-text-area'>
                </textarea>
                <button
                className='send-message-button' 
                type='submit'
                onClick={sendMessage}>
                    Send
                </button>
            </form>
        </div>
    )
}

export default Message