import './Sidebar.css';

function Sidebar() {
    return (
        <div className='sidebar'>
          <div className='channels-container'>
            <h3>Channels</h3>
            <div className='channel-container'>
                <p>Channel</p>
            </div>
            <button>Add Channel</button>
          </div>
          <div className='messages-container'>
            <h3>Direct Messages</h3>
            <div className='message-container'>
              <span>Avatar</span>
              <span>Name</span>
            </div>
          </div>
        </div>
      )
}

export default Sidebar