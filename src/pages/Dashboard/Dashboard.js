import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Message from '../../components/Message/Message'
//import Sidebar from '../../components/Sidebar/Sidebar'

const Dashboard = () => {
    let navigate = useNavigate()

    const mock_channel_list = [
        {
            id: 1,
            name: 'Channel 1',
            user_ids: [1,2,3]
        },
        {
            id: 2,
            name: 'Channel 2',
            user_ids: [3,4,5]
        },
        {
            id: 3,
            name: 'Channel 3',
            user_ids: [4,5,6]
        }
    ]

    const [channelName, setChannelName] = useState('')
    const [channelList, setChannelList] = useState([])
    const [isEditing, setIsEditing] = useState(-1)
    const [editChannelName, setEditChannelName] = useState('')

    localStorage.setItem('channels',JSON.stringify(channelList))

    const registeredChannelsList = JSON.parse(localStorage.getItem('channels'))

    useEffect(() => {
        if (localStorage.getItem('channels')) {
            const registeredChannels = JSON.parse(localStorage.getItem('channels'));
            setChannelList(registeredChannels)
        }
    },[])

    const handleAddChannel = (e) => {
        e.preventDefault()
        const channelObj = {
            id: new Date().getTime(),
            name: channelName,
            user_ids: []
        }
        setChannelList([
            ...channelList, channelObj
        ])
        localStorage.setItem('channels',JSON.stringify([...channelList, channelObj]))
        //navigate('/{channelObj.id}')
        // remove previous channel name in inout field   
    }

    const handleEdit = (id, editedChannelName) => {
        setIsEditing(id)
        setEditChannelName(editedChannelName)
    }

    const handleUpdate = (id) => {
        const updatedChannelList = channelList.map((channel) => {
            if(channel.id === id) {
                console.log('sup') 
                return {
                    ...channel,
                    channelName: editChannelName
                }
            }
            return channel
        })
        setChannelList(updatedChannelList)
        setIsEditing(-1)
    }

    const handleDeleteChannel = (id) => {
        setChannelList(
            channelList.filter((channel) => {
                return channel.id !== id
        })
        )
    }


    return(
        <div>
            <Header />

           
            <div className='sidebar'>
                <div className='channels-container'>
                    <h3>Channels</h3>
                <div className='channel-container'>
                    
                    <ul>
                        {channelList.map((channel) => {
                            return (
                            <li key={channel.id}>
                                <span>
                                    {isEditing===channel.id ? 
                                        <input 
                                            type='text' 
                                            value={editChannelName} 
                                            onChange={(e)=>{setEditChannelName(e.target.value)}} 
                                            onBlur={()=>{handleUpdate(channel.id)}} /> 
                                        : 
                                        channel.name }
                                </span>
                                    {isEditing===channel.id ? 
                                        (<button onClick={() => {handleUpdate(channel.id)}}>Update</button>) : 
                                        (<button onClick={() => {handleEdit(channel.id, channel.name)}}>Edit</button>) }
                                <button onClick={() => {handleDeleteChannel(channel.id)}}>
                                    Delete
                                </button>
                            </li>
                            )
                        })}
                    </ul>
                </div>
                <div>
                    <form onSubmit={handleAddChannel}>
                    <input type='text' 
                     placeholder='Channel Name'
                     value={channelName} 
                     onChange={(e) => {setChannelName(e.target.value)}} />
                    <button>
                        Create Channel
                    </button>
                    </form>
                </div>
                <div>
                    <button>Join Channel</button>
                </div>
                </div>

          <div className='messages-container'>
            <h3>Direct Messages</h3>
            <div className='message-container'>
              <span>Avatar</span>
              <span>Name</span>
            </div>
          </div>
       

            <div>
                <Message />
            </div> 
        </div>
    
        </div>
        
)}

export default Dashboard