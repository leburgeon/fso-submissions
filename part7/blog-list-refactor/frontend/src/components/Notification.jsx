const inline = {
  backgroundColor: "grey",
  padding: "10px",
  borderRadius: "5px",
  color: "white",
  textAlign: "center",
};

const Notification = ({ message }) => (
  <>
    <div style={inline}>{message}</div>
  </>
);

export default Notification;
