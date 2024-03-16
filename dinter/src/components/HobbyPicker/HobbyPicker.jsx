import { useState } from "react"
import { Form } from 'react-bootstrap'
import axios from 'axios'
import Lottie from 'react-lottie'
import * as hobbyAnim from '../../utils/lottie/hobby_anim.json'
import { HobbyTag } from "../ProfileSetting"
import { ButtonWeb } from "../../pages/ProfileScreen"

export const HobbyPicker = ({ style, className, onCancel, onSave, defaultHobby, visible }) => {
  const [hobby, setHobby] = useState();
  const [chosenHobby, setChosenHobby] = useState(defaultHobby ?? []);

  const getHobbiesByKeyWord = (keyword) => {
    if (keyword != '') {
      axios.get("http://localhost:3008/api/v1/hobby/" + keyword).then(response => {
        setHobby(response.data.data)
        console.log(response.data.data)
      })
    } else {
      setHobby()
    }
  }

  const addChosenHobby = (h) => {
    if (chosenHobby.length < 5) {
      // Check if the hobby is already in chosenHobby
      const isHobbyAlreadyChosen = chosenHobby.some((chosen) => chosen._id === h._id);

      if (!isHobbyAlreadyChosen) {
        setChosenHobby([...chosenHobby, h]);
      }
    }
  }

  function onRemove(hobbyToRemove) {
    const updatedChosenHobby = chosenHobby.filter((hobby) => hobby._id !== hobbyToRemove._id);
    setChosenHobby(updatedChosenHobby);
  }

  return (
    <div style={{
      display: visible ? 'flex' : 'none',
      background: '#fff',
      borderWidth: '1px solid black',
      borderRadius: '5px', ...style
    }} className={className + " justify-content-center flex-column"}>
      <div className="d-flex justify-content-center">
        <h3>Hobby picker</h3>
      </div>
      <div style={{ background: 'white' }}>
        <div className="d-flex flex-column">
          <div className="d-flex align-items-center m-2">
            <svg style={{marginRight: '5px'}} height="30px" width="30px" version="1.1" id="Layer_1" viewBox="0 0 512 512" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle style={{fill:'#fe9d9a'}} cx="351.019" cy="160.98" r="152.722"></circle> <circle style={{fill:'#ECE7EA'}} cx="351.019" cy="160.98" r="120.02"></circle> <path style={{fill:'#ff9494'}} d="M182.651,377.405L62.285,497.769c-12.535,12.535-26.135,4.615-39.402-8.652 C9.616,475.85,1.696,462.25,14.231,449.715l120.364-120.364l38.74,9.315L182.651,377.405z"></path> <path style={{fill:'#C2B8B9'}} d="M194.008,366.598l-14.661,14.661l-48.055-48.055l14.661-14.661 c12.535-12.535,33.461-11.941,46.729,1.326C205.95,333.136,206.543,354.062,194.008,366.598z"></path> <path d="M351.021,0c-88.764,0-160.978,72.214-160.978,160.978s72.214,160.978,160.978,160.978S512,249.742,512,160.978 S439.785,0,351.021,0z M351.021,305.441c-79.657,0-144.462-64.805-144.462-144.462S271.366,16.516,351.021,16.516 s144.462,64.805,144.462,144.462S430.678,305.441,351.021,305.441z"></path> <path d="M283.908,93.866c-3.225,3.225-3.224,8.454,0,11.678c1.613,1.612,3.726,2.418,5.839,2.418s4.227-0.806,5.84-2.419 c14.806-14.806,34.493-22.961,55.435-22.961c20.941,0,40.627,8.154,55.434,22.961c3.224,3.226,8.453,3.225,11.678,0.001 c3.225-3.225,3.225-8.454,0-11.678c-17.925-17.928-41.759-27.8-67.112-27.8C325.669,66.066,301.834,75.939,283.908,93.866z"></path> <path d="M221.703,278.617l-31.759,31.759c-16.405-10.958-38.848-9.207-53.318,5.262L9.289,442.976 c-10.458,10.458-10.216,21.144-8.171,28.267c2.136,7.444,7.199,14.979,15.93,23.71c8.732,8.731,16.265,13.792,23.71,15.93 c2.264,0.651,4.887,1.118,7.75,1.118c6.142,0,13.383-2.155,20.517-9.289l111.81-111.81c0.003-0.003,0.007-0.007,0.011-0.01 c0.004-0.003,0.007-0.007,0.01-0.011l15.507-15.507c7.979-7.979,12.372-18.585,12.372-29.867c0-8.478-2.481-16.574-7.1-23.461 l31.749-31.749c3.225-3.226,3.225-8.454,0-11.679C230.157,275.394,224.928,275.394,221.703,278.617z M57.346,491.031 c-5.278,5.278-11.833,9.026-28.619-7.758c-16.784-16.783-13.036-23.34-7.758-28.617l105.979-105.981l36.377,36.377L57.346,491.031z M184.682,363.694l-9.678,9.678l-36.377-36.376l9.678-9.678c10.029-10.029,26.348-10.029,36.378,0 c4.858,4.858,7.534,11.317,7.534,18.188C192.216,352.377,189.541,358.836,184.682,363.694z"></path> <path d="M471.042,169.317c-4.519-0.622-8.685,2.536-9.308,7.055c-7.562,54.94-55.158,96.369-110.712,96.369 c-61.626,0-111.762-50.136-111.762-111.762S289.395,49.216,351.021,49.216c55.555,0,103.151,41.431,110.712,96.37 c0.622,4.519,4.792,7.683,9.308,7.055c4.519-0.621,7.677-4.789,7.056-9.306c-4.187-30.42-19.259-58.389-42.44-78.755 c-23.398-20.559-53.456-31.88-84.636-31.88c-70.733,0-128.279,57.546-128.279,128.279s57.546,128.279,128.279,128.279 c31.18,0,61.236-11.321,84.635-31.879c23.18-20.367,38.252-48.335,42.44-78.755C478.718,174.104,475.56,169.938,471.042,169.317z"></path> </g></svg>
            <Form.Control
              type="text"
              aria-describedby="passwordHelpBlock"
              placeholder="Start with some words to update your hobby"
              onChange={(e) => getHobbiesByKeyWord(e.target.value)}
            />
          </div>
        </div>
        <div style={{ minHeight: '100px' }} className="d-flex row">
          {
            hobby && hobby?.length > 0 ?
              <div className='d-flex flex-row align-content-start flex-wrap'>
                {
                  hobby?.map(h =>
                    <button onClick={() => addChosenHobby(h)}><HobbyTag key={h._id} editable={false} title={h.hobbyName} /></button>
                  )
                }
              </div> : <></>
          }
          <Lottie options={
            {
              loop: true,
              autoplay: true,
              animationData: hobbyAnim,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
              }
            }
          }
            isClickToPauseDisabled="false"
            height={200}
            width={200} />
        </div>
        <div>
          <b style={{ marginLeft: '5px' }}>Saved hobbies ({chosenHobby.length ?? 0}/5)</b>
          <div className='d-flex flex-row align-content-start flex-wrap'>
            {
              chosenHobby?.map(h =>
                <HobbyTag style={{ background: 'linear-gradient(90deg, rgba(208,109,186,1) 26%, rgba(255,28,78,1) 59%, rgba(241,139,209,1) 100%)' }} onRemove={() => onRemove(h)} key={h._id} editable={true} title={h.hobbyName} />
              )
            }
          </div>
        </div>
        <div style={{ position: 'absolute', right: 0, marginRight: '5px' }} className="save-options btn-group btn-group-sm mt-3">
          <ButtonWeb variant="secondary" onClick={onCancel} title={"Cancel"}></ButtonWeb>
          <ButtonWeb variant="primary" onClick={() => { onSave(chosenHobby); onCancel() }} title={"Save"} />
        </div>
      </div>
    </div>
  )
}