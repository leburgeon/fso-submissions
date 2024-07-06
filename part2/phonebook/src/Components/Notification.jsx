const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  };

const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
};

const Notification = ({notification}) => {
    if (notification === null){
        return null
    } 

    return (
        <div style={notification.isError? errorStyle : successStyle}>
            {notification.message}
        </div>
    )
}

export default Notification