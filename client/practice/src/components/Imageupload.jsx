import { useEffect, useRef, useState } from "react"
import axios from "axios"

const Imageupload = () => {
    let formdatas = useRef()

    let [getdata, setdata] =  useState([])

    // let handlefile = (e) =>{
    //     console.log(e.target.files[0])
    //     setfile(e.target.files[0])
    // }
    //!handleupload
    let handleupload = async (e) =>{
        e.preventDefault()
        try {
            //! no we have to send the file to backend
        //! we cannot send it directly we have to convert it in formdata()
        // let inputdata = {
        //   name:formdatas.current[0].value,
        //   place:formdatas.current[1].value
        // }
        // console.log(body)
        

        let imgfile = formdatas.current[2].files[0]
        // console.log(file)
        

        let formdata = new FormData()
        formdata.append('file',imgfile)
        formdata.append('name',formdatas.current[0].value)
        formdata.append('place',formdatas.current[1].value)

        
        for(let [key,value] of formdata.entries()){ 
            console.log(key,value)
        }

        await axios.post(`http://localhost:5000`,formdata,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(()=>{
        let fetchedimg = async () =>{

            let res =  await axios.get(`http://localhost:5000`)
            // console.log(res.data.payload)
            setdata(res.data.payload)
        }
        fetchedimg()
    },[getdata])

  return (
    <>
    <form action="" onSubmit={handleupload} ref={formdatas}>
      <input type="text"  placeholder="enter name"/>
      <input type="text"  placeholder="place" />
    <input type="file" />
    <button onClick={handleupload}>upload</button>
    </form>

    <br />
    {
      getdata.map((elem) =>{
        return(
          <>
          <img src={elem.imgurl} alt="" width='200px'/>
          <p>{elem.name}=={elem.place}</p>
          </>
        )
      })
    }
    </>
  )
}

export default Imageupload