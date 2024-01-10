import getRelatedContacts from '@salesforce/apex/RelatedContactsController.getRelatedContacts';
import { LightningElement,wire } from 'lwc';
import { subscribe, unsubscribe, MessageContext } from "lightning/messageService";
import AccountData from "@salesforce/messageChannel/selectedAccountData__c";
const COLUMNS=[
    {label:'Name',fieldName:'Name'},
    {label:'Account Name',fieldName:'AccountId'},
    {label:'Phone',fieldName:'Phone'},
    {label:'Email',fieldName:'Email'},
]
export default class DataTable extends LightningElement {
    contacts=[]
    columns=COLUMNS
    accountId=''
    subscription

    @wire(getRelatedContacts, { accountId: '$accountId' })
    wiredData({ error, data }) {
      if (data) {
        console.log(data)
        this.contacts=data
      } else if (error) {
         console.error('Error:', error);
      }
    }
    @wire(MessageContext)
    messageContext;

    connectedCallback(){
        this.subscription=subscribe(this.messageContext,AccountData,payload=>this.LMSHandler(payload))
    }
    LMSHandler(payload){
        this.accountId=payload.recordId;
    }
    disconnectedCallback(){
        unsubscribe(this.subscription)
    }
    get noAccountSelected(){
        return this.accountId==''
    }
    get noRecordsFound(){
        return this.contacts.length==0;
    }
}