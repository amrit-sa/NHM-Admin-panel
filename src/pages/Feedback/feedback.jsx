import React from "react";
import './feedback.css'
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

import { useLocation } from "react-router-dom";

const Feedback = () => {


  const url = "https://api.upss.deepmindz.co/api/v1/add-feedback"


  const { search } = useLocation();
  const id = new URLSearchParams(search).get('id');
  const baseURL = `https://api.upss.deepmindz.co/api/v1/validate-feedback-api/${id}`;
  // console.log(id, 'iddd')
  const [active, setActive] = React.useState("");
  const [btnState, setBteState] = React.useState(false);

  const [show, setShow] = React.useState('')
  const [feedbackOne, setFeedbackOne] = React.useState('');
  const [yes, setYes] = React.useState('');
  const [showhide, setShowhide] = React.useState('');
  const [activeEmoji, setActiveEmoji] = React.useState(null);
  const [activeEmojit, setActiveEmojit] = React.useState(null);
  const [activeEmoji2, setActiveEmoji2] = React.useState(null);
  const [activeEmoji3, setActiveEmoji3] = React.useState(null);
  const [question, setQuestion] = React.useState()

  const [submitted, setSubmitted] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);

  const [submitbutton, setSumitbutton] = React.useState(false)
  const [post, setPost] = React.useState(null);
  const [data, setData] = React.useState(

    // questiontwo: "",
    // questionthird: "",
    // yes: "",
    // reasoninputtwo: "",
    // reasoninputthree: ""

  )


  const [qst, setQst] = React.useState('ques001')
  const [qstTwo, setQstTwo] = React.useState('ques002')
  const [qstThree, setQstThree] = React.useState('ques003')

  const [quesPayload, setQuesPayload] = React.useState([
    {
      "question_id": "",
      "answer": ''
    },
    {
      "question_id": "",
      "answer": '',
      "issue_categories": [],
      "positive_feedback": []
    },
    {
      "question_id": '',
      "answer": '',
      "issue_categories": [],
      "positive_feedback": []
    }
  ])
  //  this is option state here +ve  and -ve
  const [issue_categories, setIssue_categories] = React.useState()
  const [positive_feedback, setPositive_feedback] = React.useState()

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
      // console.log('wwwwww', response)
    });
  }, []);

  if (!post) return (
    <>
      <div className="content successfully">
        <div className="submitted">
          <img
            className="feedback-icon"
            src="/images/caution_fdb.svg"
            alt="feedback"
            width='60px'
            height='60px'
          />
          <h3 style={{color:"#ff4d4d"}}>Feedback already submitted</h3>
        </div>
      </div>
    </>
  );




  // Question 1st func
  const handlefeedbackOne = (answer, emoji_number, question_id) => {
    setYes(answer)
    setQst(question_id)
    const item1 = { question_id, answer }
    setData({ ...data, first_question: item1 })
    setBteState(btnState => !btnState)
    setActiveEmoji(emoji_number)

  }
  //testing for q 2
  const handlefeedback2ne = (answer, emoji_number, question_id) => {
    setYes(answer)
    setQst(question_id)
    const item1 = { question_id, answer }
    setData({ ...data, first_question2t: item1 })
    // setBteState(btnState => !btnState)
    setActiveEmojit(emoji_number)

  }

  //testing for q 3
  const handlefeedback3ne = (answer, emoji_number, question_id) => {
    setYes(answer)
    setQst(question_id)
    setSumitbutton(true);
    const item1 = { question_id, answer }
    setData({ ...data, first_question3t: item1 })
    // setBteState(btnState => !btnState)
    setActiveEmoji3(emoji_number)

  }






  // Question 2nd func
  const handlefeedbackTwo = (answer, emoji_number, question_id) => {



    // setQstTwo(...qstTwo , question_id)

    setFeedbackOne(answer)
    setActiveEmoji2(emoji_number)
    const item2 = { question_id, answer }
    setQstTwo(item2)

    // setData({ ...data, two_question: item2 });
    // console.log('aaaa',data)

  }
  // Question 3rd func
  const handlefeedbackThree = (answer, emoji_number, question_id) => {
    //setSumitbutton(true);
    // setQstThree(question_id)
    setShow(answer)
    setActiveEmoji3(emoji_number)
    const item3 = { question_id, answer }
    setQstThree(item3)
    // setData({ ...data,  third_question:item3  });
    // console.log(item3, 'wwwwww')

  }


  const handleChange_Q2_negative = (answer) => {
    answer.preventDefault();
    // setQstTwo(question_id)
    const item = answer.target.value;
    const arr2_negative = [Number(item)]
    // console.log('vvvv optinal q2', qstTwo)
    setShowhide(item.value)
    let ques2 = qstTwo
    ques2.issue_categories = arr2_negative
    setData({ ...data, ques2 });

    // setdataqst ({...item2, issue_categories:[issue_categories]})

  }
  const handleChange_Q2_positive = (answer) => {
    answer.preventDefault();
    // setQstTwo(question_id)
    const item = answer.target.value;
    const arr2_positive = [Number(item)]
    setShowhide(item.value)
    let ques2 = qstTwo
    ques2.positive_feedback = arr2_positive
    setData({ ...data, ques2 });

  }
  const handleChangeThree_negative = (answer) => {
    const item = answer.target.value;
    const arr3_negative = [Number(item)]
    let ques3 = qstThree
    ques3.issue_categories = arr3_negative
    setData({ ...data, ques3 });

  }

  const handleChangeThree_positive = (answer) => {

    const item = answer.target.value;
    const arr3_positive = [Number(item)]
    // console.log('vvvv optinal q3 v++++' , arr3_positive)
    let ques3 = qstThree
    ques3.issue_categories = arr3_positive
    setData({ ...data, ques3 });

  }


  const HandleSubmit = (e) => {

    console.log(data)
    // return;
    let quesPayload = [
      {
        "question_id": data.first_question.question_id,
        "answer": parseInt(data.first_question.answer)
      },
      {
        "question_id": data.first_question2t.question_id,
        "answer": parseInt(data.first_question2t.answer),
        // "issue_categories": data.ques2.issue_categories,
        // "positive_feedback": data.ques2.positive_feedback,
      },
      {
        "question_id": data.first_question3t.question_id,
        "answer": parseInt(data.first_question3t.answer),
        // "issue_categories": data.ques3.issue_categories,
        // "positive_feedback": data.ques3.positive_feedback,
      },
    ]


    e.preventDefault();
    setSubmitted(true);
    setCollapsed(!collapsed);
    let payload = {
      worker_id: (id),
      Question: quesPayload
    }
    axios.post(url, payload)
      .then(res => {
      })
      .catch(res => {
      })

  }

  // let toggleClassCheck = btnState ? ' active' : null;



  return (
    <div id="layout-wrapper">
      <div className="page-top">
        <img
          className="logo"
          src="/images/logo.svg"
          alt="logo"
        />
        <h2 className="header-title">Share your feedback</h2>
      </div>
      {!collapsed && (
        <>
          <div className="content feedback">
            <div className="user-details">
              Meeting with <code>{post?.data?.Name}</code>
              <span className="date" id="date">
                {post?.data?.Meeting_Date}
              </span>
            </div>
          </div>
          <div className="container feed-container">
            <div className="helping-content">
              {/* <h4>सहायक पर्यवेक्षण एप्लिकेशन</h4> */}
              {/* <h4>
                <b>फीडबैक की मुख्या विशेषताएं </b>
              </h4> */}
              {/* <p>फीडबैक से पहले परिचय</p> */}
              <p><b>
                आज आपकी मुख्य सेविका ने आपके क्षेत्र का दौरा किया और डीब्रीफिंग सत्र भी पूरा किया।
                कृपया नीचे दिए गए तीन प्रश्नों पर अपनी बहुमूल्य प्रतिक्रिया दें। यह प्रतिक्रिया आपकी
                मुख्य सेविका को सहयोगात्मक पर्यवेक्षण में सुधार करने में मदद करेगी। आपकी मुख्य
                सेविका के जाने के बाद ही आपको अपनी प्रतिक्रिया देनी है। आपकी प्रतिक्रिया पूर्णतः गुप्त
                रखी जायेगी।
              </b>
              </p>
              <ul className="first_ul">
                {/* <li>
                  आगे के स्लाइड्स में सहयोगात्मक पयिवेक्षण से संबंधित प्रश्न सभी
                  (मुख्यसेववका/ सी.डी.पी.ओ/ डी.पी.ओ) के ललए लागू होगा ।
                </li>
                <li>Milk</li> */}
              </ul>
            </div>

            <div className="feedback-q">
              {/* Question 1  */}

              <ul className="feedback-list">
                <li>
                  <span className="text">
                    आप अपनी मुख्य सेविका के फील्ड विजिट और डीब्रीफिंग सत्र का मूल्यांकन कैसे
                    करेंगे?
                  </span>
                  <div className="emoji">
                    <span className={`emoji-icon ${activeEmoji === 1 && 'active'}`}

                      onClick={() => handlefeedbackOne('1', 1, qst)}
                    >
                      <img src="/images/terrible.svg" alt="" />
                      <label>उपयोगी नहीं </label>
                    </span>
                    <span id="1" className={`emoji-icon ${activeEmoji === 2 && 'active'}`} onClick={() => handlefeedbackOne('2', 2, qst)}>
                      <img src="/images/not-good.svg" alt=" " />
                      <label>&nbsp;थोड़ा उपयोगी </label>
                    </span>
                    <span id="2" className={`emoji-icon ${activeEmoji === 3 && 'active'}`} onClick={() => handlefeedbackOne('3', 3, qst)}>
                      <img src="/images/ok.svg" alt=" " />
                      <label>औसत </label>
                    </span>
                    <span className={`emoji-icon ${activeEmoji === 4 && 'active'}`} onClick={() => handlefeedbackOne('4', 4, qst)}>
                      <img src="/images/good.svg" alt=" " />
                      <label>उपयोगी</label>
                    </span>
                    <span className={`emoji-icon ${activeEmoji === 5 && 'active'}`} onClick={() => handlefeedbackOne('5', 5, qst)}>
                      <img src="/images/very_good.svg" alt="" />
                      <label>बहुत उपयोगी </label>
                    </span>
                  </div>
                </li>
                {/* testing q2 */}

                <li>

                  <span className="text">
                    आपकी मुख्य सेविका का व्यवहार आपके प्रति कैसा था?
                  </span>
                  <div className="emoji">
                    <span className={`emoji-icon ${activeEmojit === 1 && 'active'}`}

                      onClick={() => handlefeedback2ne('1', 1, qstTwo)}
                    >
                      <img src="/images/terrible.svg" alt="" />
                      <label>बहुत बुरा </label>
                    </span>
                    <span id="1" className={`emoji-icon ${activeEmojit === 2 && 'active'}`} onClick={() => handlefeedback2ne('2', 2, qstTwo)}>
                      <img src="/images/not-good.svg" alt=" " />
                      <label>बुरा </label>
                    </span>
                    <span id="2" className={`emoji-icon ${activeEmojit === 3 && 'active'}`} onClick={() => handlefeedback2ne('3', 3, qstTwo)}>
                      <img src="/images/ok.svg" alt=" " />
                      <label>औसत </label>
                    </span>
                    <span className={`emoji-icon ${activeEmojit === 4 && 'active'}`} onClick={() => handlefeedback2ne('4', 4, qstTwo)}>
                      <img src="/images/good.svg" alt=" " />
                      <label>अच्छा</label>
                    </span>
                    <span className={`emoji-icon ${activeEmojit === 5 && 'active'}`} onClick={() => handlefeedback2ne('5', 5, qstTwo)}>
                      <img src="/images/very_good.svg" alt="" />
                      <label>बहुत अच्छा </label>
                    </span>
                  </div>
                </li>

                {/* testing q 3 */}

                <li>
                  <span className="text">
                    क्या आपकी मुख्य सेविका ने आपकी समस्याओं को सुना और समस्याओं के
                    समाधान में सहयोग प्रदान किया?
                  </span>
                  <div className="emoji">
                    <span className={`emoji-icon ${activeEmoji3 === 1 && 'active'}`}

                      onClick={() => handlefeedback3ne('1', 1, qstThree)}
                    ><img src="/images/terrible.svg" alt="" />
                      <label>पूर्ण असहमत </label>
                    </span>
                    <span id="1" className={`emoji-icon ${activeEmoji3 === 2 && 'active'}`} onClick={() => handlefeedback3ne('2', 2, qstThree)}>
                      <img src="/images/not-good.svg" alt=" " />
                      <label>&nbsp;असहमत</label>
                    </span>
                    <span id="2" className={`emoji-icon ${activeEmoji3 === 3 && 'active'}`} onClick={() => handlefeedback3ne('3', 3, qstThree)}>
                      <img src="/images/ok.svg" alt=" " />
                      <label> न सहमत न असहमत </label>
                    </span>
                    <span className={`emoji-icon ${activeEmoji3 === 4 && 'active'}`} onClick={() => handlefeedback3ne('4', 4, qstThree)}>
                      <img src="/images/good.svg" alt=" " />
                      <label>सहमत</label>
                    </span>
                    <span className={`emoji-icon ${activeEmoji3 === 5 && 'active'}`} onClick={() => handlefeedback3ne('5', 5, qstThree)}>
                      <img src="/images/very_good.svg" alt="" />
                      <label>पूर्ण सहमत </label>
                    </span>
                  </div>
                </li>






                {/* Question 2nd */}
                {/* <li> */}
                {/* <span className="text">
                    आपकी मुख्य सेविका का व्यवहार आपके प्रति कैसा था?
                  </span> */}
                {/* <div className="emoji">
                    <span
                      className={`emoji-icon ${activeEmoji2 === 6 && 'active'}`}
                      onClick={() => handlefeedbackTwo('1', 6, qstTwo)}>
                      <img src="/images/terrible.svg" alt="terrible" />
                      <label>बहुत बुरा </label>
                    </span>
                    <span className={`emoji-icon ${activeEmoji2 === 7 && 'active'}`} onClick={() => handlefeedbackTwo('2', 7, qstTwo)}>
                      <img src="/images/not-good.svg" alt="not good" />
                      <label>बुरा </label>
                    </span>
                    <span className={`emoji-icon ${activeEmoji2 === 8 && 'active'}`} onClick={() => handlefeedbackTwo('3', 8, qstTwo)}>
                      <img src="/images/ok.svg" alt="ok" />
                      <label>औसत </label>
                    </span>
                    <span className={`emoji-icon ${activeEmoji2 === 9 && 'active'}`} onClick={() => handlefeedbackTwo('4', 9, qstTwo)}>
                      <img src="/images/good.svg" alt="good" />
                      <label>अच्छा</label>
                    </span>
                    <span className={`emoji-icon ${activeEmoji2 === 10 && 'active'}`} onClick={() => handlefeedbackTwo('5', 10, qstTwo)}>
                      <img src="/images/very_good.svg" alt="very good" />
                      <label>बहुत अच्छा </label>
                    </span>
                  </div> */}
                {/* <div className="feedback-send"> */}

                {/* Select Used Terrible,Not Good,Ok  */}

                {/* {

                    (feedbackOne === '1' || feedbackOne === '2' || feedbackOne === '3') &&
                    <div className="feedback-send">
                      <select className="selectreason" id="reasonone" name="Negative Feedback" onChange={(answer) => handleChange_Q2_negative(answer, qstTwo)}>
                        <option>समस्या श्रेणी/Issue category:</option>
                        <option value="1">आधिकारिक और कमांडिग </option>
                        <option value="2">गैर -सहायक</option>
                        <option value="3">धैर्य से न सुनना </option>
                        <option value="4">सम्मान और मर्यादा पूर्वक बात न करना
                        </option>
                        <option value="5">अन्य </option>
                      </select>
                    </div>
                  }
                  {
                    (feedbackOne === '4' || feedbackOne === '5') &&
                    <div className="feedback-send">
                      <select className="selectreason" id="reasonone" name="Positive Feedback" onChange={(answer) => handleChange_Q2_positive(answer, qstTwo)}>
                        <option>सकािात्मक प्रततफिया/ Positive Feedback:</option>
                        <option value={1}>उचित मार्गदर्शन के साथ सहायक </option>
                        <option value={2}>धैर्य से सुनना</option>
                        <option value={3}>
                          सम्मान और मर्यादा पूर्वक व्यवहार किया गया
                        </option>
                        <option value={4}>अन्य</option>
                      </select>

               
                    </div>
                  } */}



                {/* </li> */}



                {/* Question 3rd */}
                {/* <li> */}
                {/* <span className="text">
                    क्या आपकी मुख्य सेविका ने आपकी समस्याओं को सुना और समस्याओं के
                    समाधान में सहयोग प्रदान किया?
                  </span> */}
                {/* <div className="emoji">
                    <span className={`emoji-icon ${activeEmoji3 === 11 && 'active'}`} onClick={() => handlefeedbackThree('1', 11, qstThree)}>
                      <img src="/images/terrible.svg" alt="terrrible" />
                      <label>पूर्ण असहमत </label>
                    </span>
                    <span className={`emoji-icon ${activeEmoji3 === 12 && 'active'}`} onClick={() => handlefeedbackThree('2', 12, qstThree)}>
                      <img src="/images/not-good.svg" alt="not good" />
                      <label>असहमत </label>
                    </span>
                    <span className={`emoji-icon ${activeEmoji3 === 13 && 'active'}`} onClick={() => handlefeedbackThree('3', 13, qstThree)}>
                      <img src="/images/ok.svg" alt="ok" />
                      <label> न सहमत न असहमत </label>
                    </span>
                    <span className={`emoji-icon ${activeEmoji3 === 14 && 'active'}`} onClick={() => handlefeedbackThree('4', 14, qstThree)}>
                      <img src="/images/good.svg" alt="good" />
                      <label>सहमत</label>
                    </span>
                    <span className={`emoji-icon ${activeEmoji3 === 15 && 'active'}`} onClick={() => handlefeedbackThree('5', 15, qstThree)}>
                      <img src="/images/very_good.svg" alt="very good" />
                      <label>पूर्ण सहमत </label>
                    </span>
                  </div> */}

                {/* {(show === '1' || show === '2' || show === '3') &&
                    <div className="feedback-send">
                      <select className="selectreason" id="reasonone" name="questionthird" onChange={(answer) => handleChangeThree_negative(answer)}>
                        <option>समस्या श्रेणी/Issue category:</option>
                        <option value="1">आधिकारिक और कमांडिग </option>
                        <option value="2">गैर -सहायक</option>
                        <option value="3">धैर्य से न सुनना </option>
                        <option value="4">

                          सम्मान और मर्यादा पूर्वक बात न करना
                        </option>
                        <option value="5">अन्य </option>
                      </select>

                    </div>
                  }
                  {(show === '4' || show === '5') &&

                    <div className="feedback-send">
                      <select className="selectreason" id="reasonone" name="questionthird" onChange={(answer) => handleChangeThree_positive(answer)}>
                        <option>सकािात्मक प्रततफिया/ Positive Feedback:</option>
                        <option value="1">उचित मार्गदर्शन के साथ सहायक </option>
                        <option value="2">धैर्य से सुनना</option>
                        <option value="3">

                          सम्मान और मर्यादा पूर्वक व्यवहार किया गया
                        </option>
                        <option value="5">अन्य</option>
                      </select>

            
                    </div>


                  } */}

                {/* </li> */}
              </ul>


              {submitbutton &&
                <button
                  name="submit"
                  className="submitinput"
                  type="submit"
                  disabled=""
                  onClick={HandleSubmit}
                >
                  Submit
                </button>}


            </div>
          </div>
        </>
      )}
      {submitted &&
        <div className="content successfully">
          <div className="submitted">
            <img
              className="feedback-icon"
              src="/images/feedback-icon.svg"
              alt="feedback"
            />
            <h3>Feedback submitted successfully</h3>
          </div>
        </div>
      }


    </div>
  );
}

export default Feedback;