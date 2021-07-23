function Message({ msg, type }) {
  if (type === "error") {
    return <p className="alert alert-danger col-sm-6 mx-auto">{msg}</p>;
  }
  if (type === "success") {
    return <p className="alert alert-success col-sm-6 mx-auto">{msg}</p>;
  }
}
export default Message;
