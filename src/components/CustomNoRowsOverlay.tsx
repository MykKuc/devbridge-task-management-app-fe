function CustomNoRowsOverlay(props: { message: string }) {
  return <div className="no-rows-overlay">{props.message}</div>;
}

CustomNoRowsOverlay.defaultProps = {
  message: 'No rows yet!',
};

export default CustomNoRowsOverlay;
