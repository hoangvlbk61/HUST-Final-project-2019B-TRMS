/** @format */

const ROOT_API = "";

const FACE_RCN_URL = "http://127.0.0.1:8001/user-recognition";
const FACE_ADD_URL = "http://127.0.0.1:8001/user-create";
const FACE_HEADER = {
	"X-CSRFToken":
		"d2Nky4gWsY5Bqyc3oJ356OX4rapGuFSB2aLViAqBoDErqF5jML9PWQFWM54LmFG0",
};
const RECORD_URL = {
	FETCH: `${ROOT_API}/record`,
	CREATE: `${ROOT_API}/record`,
	UPDATE: `${ROOT_API}/record`,
	DELETE: `${ROOT_API}/record`,
	DETAIL: `${ROOT_API}/record`,
};

export { RECORD_URL, FACE_RCN_URL, FACE_ADD_URL, FACE_HEADER };
