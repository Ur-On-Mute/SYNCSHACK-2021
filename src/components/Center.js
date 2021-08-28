function Center(props) {
  return (
    <div style={{width: "100%", height: `${props.height}`}}>
      <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        {props.children}
      </div>
    </div>
  );
}

export default Center;
