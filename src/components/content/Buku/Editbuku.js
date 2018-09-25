import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap'
import axios from 'axios'
import apiconfig from '../../../configs/api.config.json'

class EditCompany extends React.Component {
    constructor (props) {
        super(props)
        // let userdata=""
        // if(localStorage.getItem(apiconfig.LS.TOKEN)!= null){
         let   userdata =JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA))
       // }        
       
        super(props)
        this.state = {
            formdata: {
                kode_buku: '',
                nama_buku: '',
                kode_penerbit:'',
                kode_pengarang:'',
                kode_type_buku: '',
                update_by:userdata.username
            }
        }
        this.submitHandler = this.submitHandler.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps)
        this.setState({
            formdata : newProps.company
        })
    }

    changeHandler(e) {
        let tmp = this.state.formdata
        tmp[e.target.name]=e.target.value
        this.setState({
            formdata:tmp
        })
    }

    submitHandler() {
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.COMPANY,
            method: "put",
            headers:{
                "Authorization": token,
                "Content-Type" : "application/json"
            },
            data: this.state.formdata
           
        }
        debugger
        axios(option)
        .then((response) => { 
            // console.log(this.state.formdata)
            if(response.data.code === 200) {
                alert('Success')
                this.props.history.push('/dashboard')
            } else {
                alert(response.data.message)
            }
        })
        .catch((error) => {
            console.log(error);            
        })
    }

    render(){
        // console.log(this.state.formdata)
        return(
            <Modal isOpen={this.props.edit} className={this.props.className}>
                <ModalHeader> Edit Company</ModalHeader>
                <ModalBody >
                <form class="form-inline">
                    <div class ="input-group mb-3 input-group-sm">
                        <label for="text"> Kode Buku : </label>
                        <input type="text" class="form-control" readOnly
                        name="kode_buku" 
                        value={this.state.formdata.kode_buku} 
                        onChange={this.changeHandler} />
                        <label for="text"> Nama Buku : </label>
                        <input type="text" class="form-control" 
                        name="nama_buku" 
                        value={this.state.formdata.nama_buku} 
                        onChange={this.changeHandler} />
                    </div>
                
                    <div class ="input-group mb-3 input-group-sm"> 
                    <label for="text"> Kode Penerbit : </label>
                        <input type="text" class="form-control"
                        name="kode_penerbit" 
                        value={this.state.formdata.kode_penerbit} 
                        onChange={this.changeHandler}/>
                    <label for="text"> Kode Pengarang : </label>
                        <input type="text" class="form-control"
                        name="kode_pengarang" 
                        value={this.state.formdata.kode_pengarang} 
                        onChange={this.changeHandler}/>
                    </div>
                    
                    <div class ="input-group mb-3 input-group-sm">
                    <label for="text"> Kode Type Buku : </label>
                        <input type="text" class="form-control"
                        name="kode_type_buku" 
                        value={this.state.formdata.kode_type_buku} 
                        onChange={this.changeHandler}/>
                   </div>
                   
                </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick ={this.submitHandler}>Save</Button>
                    <Button color="warning" onClick={this.props.closeModalHandler}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default EditCompany