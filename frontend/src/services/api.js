import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";

export const getCurrentuser = async (dispatch) => {
  try {
    const result = await axios.get(`${serverUrl}/api/user/currentuser`, {
      withCredentials: true,
    });
    // console.log(result.data)
    dispatch(setUserData(result.data));
  } catch (error) {
    console.log(`get current user error : ${error}`);
  }
};

export const generateNotes = async (payload) => {
  try {
    const result = await axios.post(
      `${serverUrl}/api/notes/generate-notes`,
      payload,
      { withCredentials: true },
    );
    // console.log(result.data);
    return result.data;
  } catch (error) {
    console.log(`Generate notes error : ${error}`);
  }
};

export const downloadPdf = async (result) => {
  try {
    const response = await axios.post(
      `${serverUrl}/api/pdf/generate-pdf`,
      { result },
      { withCredentials: true, responseType:"blob" },
    );

    const blob = new Blob([response.data], {
      type: "application/pdf",
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ExamDostAI.pdf";
    link.click();
  } catch (error) {
    console.log(`Download PDF error ${error.message}`);
  }
};


export const verifyPayment = async (sessionId) => {
  try {
    const result = await axios.get(
      `${serverUrl}/api/credit/verify-payment`,
      {
        params: { session_id: sessionId },
        withCredentials: true,
      },
    );
    console.log(result.data)
    return result.data;
  } catch (error) {
    console.log(`Verify payment error : ${error}`);
  }
};
