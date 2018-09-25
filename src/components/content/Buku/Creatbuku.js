import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'

class CreateCompany extends React.Component{
    constructor (props){
        super(props)
        // let number=this.props.company
        // console.log(number)
        //let userdata=JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA))
        // let userdata=""
       
        // if(localStorage.getItem(apiconfig.LS.TOKEN)!=null){
         let userdata =JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA))
        //}
        this.state={
            formdata:{
                kode_buku:'',
                nama_buku:'',
                kode_pengarang:'',
                kode_penerbit:'',
                kode_type_buku:'',
                created_by:userdata.username
            }
        }
        // let number=this.state.company.length
        this.submitHandler=this.submitHandler.bind(this)
        this.changeHandler=this.changeHandler.bind(this)
    }
    changeHandler(e){
        let tmp=this.state.formdata
        tmp[e.target.name]=e.target.value
        this.setState({
            formdata:tmp
        })
    }
    submitHandler(){
       
        let token=localStorage.getItem(apiconfig.LS.TOKEN)
        let option={
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.COMPANY,
            method: "post",
            headers:{
                "Authorization": token,
                "Content-Type" : "application/json"
            },
            data: this.state.formdata
        }
        axios(option)
        .then((response)=>{
            if(response.data.code===200){
                alert('Success')
                 //console.log(response)
                this.props.history.push('/dashboard')
            } else {
                alert(response.data.message)
            }
        })
        .catch((error)=>{
            console.log(error);            
        })
    }
    render(){
        return(
            
            <Modal isOpen={this.props.show} className={this.props.className}>
                <ModalHeader> Add Buku</ModalHeader>
                <ModalBody >
                <form class="form-inline">
                <div class ="input-group mb-3 input-group-sm">
                    <label for="text">Kode Buku</label>
                    <input type="text" class="form-control" placeholder="Kode Buku" 
                    name="kode_buku" value={this.state.formdata.kode_buku} onChange={this.changeHandler} />
                    <label for="text">Nama Buku</label>
                    <input type="text" class="form-control" placeholder="Nama Buku" 
                    name="nama_buku" value={this.state.formdata.nama_buku} onChange={this.changeHandler} required/>
                     </div>
                    </form>
                    <form class="form-inline">
                    <div class ="input-group mb-3 input-group-sm">
                    <label for="text">Kode Pengarang</label>
                    <input type="text" class="form-control" placeholder="Kode Pengarang" 
                    name="kode_pengarang" value={this.state.formdata.kode_pengarang} onChange={this.changeHandler} />
                    <label for="text">Kode Penerbit</label>
                    <input type="text" class="form-control" placeholder="Kode Penerbit" 
                    name="kode_penerbit" value={this.state.formdata.kode_penerbit} onChange={this.changeHandler} required/>
                   </div>
                   <form class="form-inline">
                    <div class ="input-group mb-3 input-group-sm">
                    <label for="text">Kode Type Buku</label>
                    <input type="text" class="form-control" placeholder="Kode Type Buku" 
                    name="kode_type_buku" value={this.state.formdata.kode_type_buku} onChange={this.changeHandler} required/>
                    </div>
                    </form>
                </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick ={this.submitHandler}>Save</Button>
                    <Button color="warning" onClick={this.props.closeHandler}>Cancel</Button>
                </ModalFooter>
        </Modal>
        )
    }
}
export default CreateCompany