import { Spinner } from "reactstrap";

const Loading = () => {
  return (
    <div className="text-center">
      <Spinner
        style={{ width: "3rem", height: "3rem" }}
        type="grow"
        color="primary"
      />
      <h4>Loading...</h4>
    </div>
  );
};

export default Loading;
