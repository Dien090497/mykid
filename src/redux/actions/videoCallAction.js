export const incomingCall = payload => ({
  type: VideoCallActionList.incomingCall,
  payload,
});
export const rejectedCall = payload => ({
  type: VideoCallActionList.rejectedCall,
  payload,
});

export const endedCall = payload => ({
  type: VideoCallActionList.endedCall,
  payload,
});

export const reset = payload => ({
  type: VideoCallActionList.reset,
  payload,
});

export default {
  incomingCall,
  rejectedCall,
  endedCall,
  reset
};

export const VideoCallActionList = {
  incomingCall: 'INCOMING_CALL',
  rejectedCall: 'REJECTED_CALL',
  endedCall: 'ENDED_CALL',
  reset: 'RESET'
}
