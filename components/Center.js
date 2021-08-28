function Center(props) {
  return (
    <div style={{width: "100%"}}>
      <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        {props.children}
      </div>
    </div>
  );
}

export default Center;
