import { VideoCallActionList } from "../actions/videoCallAction";

export const VideoCallState = {
  init: 'INIT',
  ready: 'READY',
  streaming: 'STREAMING',
  rejected: 'REJECTED',
  ended: 'ENDED',
  reset: 'RESET',
}

const initData = {
  connectionState: VideoCallState.init,
  connectionData: null,
};

const videoCallReducer = (state = initData, { type, payload }) => {
  switch (type) {
    case VideoCallActionList.incomingCall:
      return {
        ...state,
        connectionState: VideoCallState.init,
        connectionData: payload,
      };
    case VideoCallActionList.rejectedCall:
      return {
        ...state,
        connectionState: VideoCallState.rejected,
        connectionData: payload,
      }
    case VideoCallActionList.endedCall:
      return {
        ...state,
        connectionState: VideoCallState.ended,
        connectionData: payload,
      }
    case VideoCallActionList.reset:
      return {
        ...state,
        connectionState: VideoCallState.reset,
        connectionData: null,
      }
    default:
      return state;
  }
};
export default videoCallReducer;
