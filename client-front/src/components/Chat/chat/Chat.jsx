import { PrettyChatWindow } from "react-chat-engine-pretty";
const Chat = (props) => {
  return (
    <div style={{ height: "100vh" }}>
      <PrettyChatWindow
        projectId="be50816c-5a58-4666-8203-68dd584dc0af"
        username={props.user.username}
        secret={props.user.secret}
        style={{ height: "100%" }}
      />
    </div>
  );
};
export default Chat;
