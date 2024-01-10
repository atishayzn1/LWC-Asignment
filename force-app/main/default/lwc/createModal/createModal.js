import { LightningElement,api } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent'

export default class CreateModal extends LightningElement {
    @api selectedAccount;
    recordId=''
    objectApiName='Contact'

    popupCloseHandler(){
        this.dispatchEvent(new CustomEvent('closepopup'))
    }
    onSubmitHandler=(e)=>{
        e.preventDefault();
        const fields={...e.detail.fields}
        fields.accountId=this.selectedAccount;
        this.refs.leaveRequestForm.submit(fields)
    }
    showToast(message,title='success', variant='success'){
        const event=new ShowToastEvent({
            title,
            message,
            variant
        })
        this.dispatchEvent(event)
    }
    successHandler(){
        this.popupCloseHandler();
        this.showToast("Data saved successfully")
    }
}