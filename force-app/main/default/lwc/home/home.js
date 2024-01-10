import { LightningElement, wire } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent'
import getAccountsWithNoRelatedContacts from '@salesforce/apex/RelatedContactsController.getAccountsWithNoRelatedContacts';
import { publish, MessageContext } from "lightning/messageService";
import AccountData from "@salesforce/messageChannel/selectedAccountData__c";

export default class Home extends LightningElement {
    selectedAccount='';
    items=[]
    showModalPopup=false
    recordId=''
    objectApiName='Contact'

    get options() {
        return this.items
    }
    @wire(getAccountsWithNoRelatedContacts)
    wiredMyAccount(result){
        if(result.data){
            console.log(result.data)
            this.items=result.data.map(x=>(
                {label:x.Name, value: x.Id}
            ))
        }
    }
    @wire(MessageContext)
    messageContext;

    handleChange=(e)=>{
        this.selectedAccount=e.detail.value;
    }
    handleCreateNewContact(){
        this.showModalPopup=true;
    }
    popupCloseHandler(){
        this.showModalPopup=false;
    }
    handleDisplayAccountClick(){
        let payload={
            recordId:this.selectedAccount
        }
        publish(this.messageContext, AccountData, payload);
    }
}