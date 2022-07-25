import * as React from "react";
import { useState, useEffect } from "react";
import commentsAction from "../redux/actions/commentsActions";
import { useDispatch } from "react-redux";
import "../styles/Comments.css";
import Delete from '../media/delete.svg'
import Edit from '../media/edit.svg'
import eventsActions from '../redux/actions/eventsActions';

function CommentsIn({ comments, eventId, events }) {
  const [reload, setReload] = useState(false)
  let oneEvent = events?.data?.response?.event
  let userComment = events?.data?.response?.event?.comments
  console.log(oneEvent)


  const [input, setInput] = useState("");
  const [modify, setModify] = useState();
  const dispatch = useDispatch();

  async function newComment(event) {
    const comment = {
      event: eventId,
      comment: input,
    };

    await dispatch(commentsAction.addComment(comment));
    document.querySelector("#nuevoComentario").textContent = "";
    setReload(!reload)
  }

  async function removeComment(id) {
    await dispatch(commentsAction.deleteComment(id));
    setReload(!reload)
  }

  async function changeComment(id) {
    const data = {
      comment: modify,
    };
    await dispatch(commentsAction.modifiComment(id, data));

  }
  async function getEvent() {
    await dispatch(eventsActions.getEventById(eventId));

  }
  useEffect(() => {
    getEvent()

    // eslint-disable-next-line
  }, [reload])

  return (
    <>
      {userComment?.map((item) => (
        <div className="div-comments w-full" >
          <div className="bodyComment flex flex-wrap justify-around">
            <div className="div-user-comment">
              <div className="div-image-comment flex space-x-2 items-center">
                <img className='rounded-full h-8 w-8' src={item?.user?.image} alt="userimage"></img>
                <span className="text-sm">{item?.user?.firstName}</span>
              </div>
            </div>
            <div
              className="div-text-comments my-2"
              contentEditable
              onInput={(event) => setModify(event.currentTarget.textContent)}>
              {item?.comment}
            </div>
            <div className="div-comment-small  ">

              <div className="div-comments-buttons">
                <div className="button-comments">
                  <button className="button mx-5">
                    <img id={item._id} onClick={() => changeComment(item._id)} src={Edit} alt="" className='h-4 w-4' />
                  </button>
                  <button className="button" >
                    <img id={item._id} onClick={() => removeComment(item._id)} src={Delete} alt="" className='h-4 w-4' />
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      ))
      }
      <div className=" mr-10 ml-10 container-text-area">
        <textarea value={input} onInput={(event) => setInput(event.target.value)} className="text-area w-full text-xs md:text-lg h-24  border rounded-xl overflow-hidden resize-none focus:border-blue-500 ring-1 ring-transparent focus:ring-blue-500 focus:outline-none text-black p-2 transition ease-in-out duration-300" placeholder="Your comment here. . . ."></textarea>
        <div className="flex justify-center md:justify-end ">
          <button onClick={newComment} id={oneEvent?._id} className="font-itineraries flex justify-center focus:outline-none  ml-0 md:ml-5 bg-indigo-700 dark:bg-indigo-600 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-3 md:px-6 py-2 text-sm ">Comment</button>
        </div>
      </div>
      {/* <div className="div-comments">
        <div className="div-new-comment">
          <textarea
            maxLength="140"
            id="nuevoComentario"
            cols="30"
            rows="10"
            placeholder="Please, let us your message here"
            onKeyUp={(event) => setInput(event.target.value)}
          ></textarea>


          <div className="button-comments-send">
            <button className="button" onClick={newComment}>
              SEND
            </button>
          </div>
        </div>
      </div> */}

    </>
  );
}

export default CommentsIn;
