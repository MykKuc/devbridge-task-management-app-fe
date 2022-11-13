import React from 'react';

import './Task.css';
import jsonData from './data.json';
import {useParams} from "react-router-dom";


const Task = () => {
  const params = useParams();
  console.log(params.id);

  const datas = jsonData && jsonData.find(e => e.id === Number(params.id))
  console.log(datas);

  return (

    <div className='d-flex justify-content-center rounded'>
      <div className='container-sm  p-0 rounded ' style={{
        height: ' 500px',
        width: '800px',
        backgroundColor: '#383838'
      }}>
        <div className='card-header rounded-top' style={{
            padding: '0', height: '20px', backgroundColor: '#2babd3', display: "flex", alignItems: "center",
          justifyContent: "center"
        }}>
          <label style={{color:'white'}}>{datas?.title}</label>

        </div>
        <div className='row'>
          <div className='col-lg-7 text-start ' style={{paddingLeft: '20px'}}>
            <label> Summary</label>
            <div className='seperation '/>
            <div className='overflow-auto '  style={{height: '100px'}}>
            <p className='text-start'> {datas?.summary}</p></div>
            <div>
              <label> Description</label>
              <div className='seperation'/>
              <div className='overflow-auto ' style={{height: '100px'}}>
                <p className='text-star overflow-auto'> {datas?.description} </p>
              </div>
            </div>
            <div>
              <label> Answer Options</label>
              <div className='seperation'/>
              <div className='overflow-auto ' style={{height: '100px'}}>
                <p className='text-start'>answer
                </p>
              </div>
            </div>
            <div>
              <label> Correct Answer</label>
              <div className=' seperation' />
              <div className='overflow-auto ' style={{height: '100px'}}>
                <p> some text
                </p>
              </div>
            </div>

          </div>
          <div className='col align-middle' style={{
            marginRight: '30px', display: "flex", alignItems: "center",
            justifyContent: "center"
          }}>

            <div className='row justify-content-center text-center' style={{width: '250px'}}>
              <p style={{textAlign:"center"}}>{datas?.votes}</p>
              <div className=' seperation'/>
              <div className='d-flex flex-row around justify-content-between'>
                <label>Task author</label>

                <p>Author</p>
              </div>
              <div className=' seperation'/>
              <div className='d-flex flex-row around justify-content-between'>
                <label>Date of creation</label>

                <p>{datas?.date}</p>
              </div>
              <div className=' seperation'/>
              <div className='d-flex flex-row around justify-content-between '>
                <label>Category</label>

                <p>{datas?.category}</p>
              </div>
              <div className=' seperation'/>
              <div className='d-flex flex-row around justify-content-between py-1 '>
              <button  type="button" className=' btn btn-primary rounded-pill ' style={{width:'100px'}}> Edit</button>
              <button  type="button" className=' btn btn-danger rounded-pill'  style={{width:'100px'}}> Delete</button>
            </div>
            </div>

          </div>
        </div>
      </div>

    </div>


  );
};

export default Task;
